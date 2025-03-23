import { convertDateToString, convertStringToDate } from "@/lib/helpers";
import { getDayBlockersByEventUserId } from "@/lib/server/fetch/dayBlocker";
import {
  getEventUsersByEventId,
} from "@/lib/server/fetch/eventUser";
import { Event } from "@/types/event";
import { eachDayOfInterval } from "date-fns";

type ReccomendationProps = {
  event: Event;
};

type Availability = {
  date: string;
  available: string[];
  maybe: string[];
  unavailable: string[];
};

type BestTimeForMeet = {
  startDate: string;
  endDate: string;
  rank: number;
  duration: number;
};

function calculateBestTimeForMeet(
  availabilityData: Availability[],
  minDurationInDays: number = 1,
  maxDurationInDays: number = 5,
  weightOfAvailable: number = 1,
  weightOfMaybe: number = 0.5,
  weightOfUnavailable: number = 0
): BestTimeForMeet[] {
  const scores: { [date: string]: number } = {};

  const parseDate = (date: string): Date => {
    const [day, month, year] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Step 1: Calculate score for each day
  for (const { date, available, maybe, unavailable } of availabilityData) {
    scores[date] =
      available.length * weightOfAvailable +
      maybe.length * weightOfMaybe +
      unavailable.length * weightOfUnavailable;
  }

  // Helper to calculate date range
  const addDays = (date: string, days: number): string => {
    const result = parseDate(date);
    result.setDate(result.getDate() + days);
    return formatDate(result);
  };

  const bestTimes: BestTimeForMeet[] = [];
  const dates = Object.keys(scores).sort(
    (a, b) => parseDate(a).getTime() - parseDate(b).getTime()
  );

  // Step 2: Find the best time slots
  for (
    let duration = minDurationInDays!;
    duration <= maxDurationInDays!;
    duration++
  ) {
    const durationBestTimes: BestTimeForMeet[] = [];

    for (let i = 0; i <= dates.length - duration; i++) {
      const startDate = dates[i];
      const endDate = addDays(startDate, duration - 1);

      let totalScore = 0;
      for (let j = 0; j < duration; j++) {
        const currentDate = addDays(startDate, j);
        totalScore += scores[currentDate] || 0;
      }
      totalScore = totalScore / duration * 100;

      durationBestTimes.push({
        startDate,
        endDate,
        rank: totalScore,
        duration,
      });
    }

    // Keep the top 5 for the current duration
    durationBestTimes.sort((a, b) => b.rank - a.rank);
    bestTimes.push(...durationBestTimes.slice(0, 5));
  }

  // Step 3: Sort final results by rank (higher score is better)
  return bestTimes.sort((a, b) => b.rank - a.rank);
}

const Recommendation = async ({ event }: ReccomendationProps) => {
  const { id, earliestPossibleDate, latestPossibleDate } = event;
  const eventUsers = await getEventUsersByEventId(id);
  const blockers = (
    await Promise.all(
      eventUsers.map((user) => getDayBlockersByEventUserId(user.id))
    )
  ).flat();

  const dateRange = eachDayOfInterval({
    start: convertStringToDate(earliestPossibleDate),
    end: convertStringToDate(latestPossibleDate),
  });

  const availability: Availability[] = dateRange.map((date) => {
    const dayBlockers = blockers.filter(
      (b) => b.date === convertDateToString(date)
    );

    const maybe = dayBlockers
      .filter((b) => b.type === "50")
      .map((b) => eventUsers.find((u) => u.id === b.eventUserId)?.userEmail)
      .filter(Boolean) as string[];

    const unavailable = dayBlockers
      .filter((b) => b.type === "100")
      .map((b) => eventUsers.find((u) => u.id === b.eventUserId)?.userEmail)
      .filter(Boolean) as string[];

    const blockedUserIds = new Set(dayBlockers.map((b) => b.eventUserId));

    const available = eventUsers
      .filter((user) => !blockedUserIds.has(user.id))
      .map((user) => user.userEmail);

    return {
      date: convertDateToString(date),
      available,
      maybe,
      unavailable,
    };
  });
  const bestTimes = calculateBestTimeForMeet(availability, Number(event.minDuration) ?? 1, Number(event.maxDuration) ?? Infinity,);

  const groupedByDuration: { [duration: number]: BestTimeForMeet[] } = {};

  bestTimes.forEach((time) => {
    if (!groupedByDuration[time.duration]) {
      groupedByDuration[time.duration] = [];
    }
    groupedByDuration[time.duration].push(time);
  });
  return (
    <div>
      <h2>Best Times for Meeting</h2>
      {Object.entries(groupedByDuration).map(([duration, times]) => (
        <div key={duration}>
          <h3>Duration: {duration} days</h3>
          <ul>
            {times.map((time, index) => (
              <li key={index}>
                From {time.startDate} to {time.endDate} with rating {" "}
                {time.rank} %
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
