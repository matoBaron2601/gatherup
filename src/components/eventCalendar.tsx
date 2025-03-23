"use client";
import { toast } from "sonner";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  CalendarDayBlocker,
  DayBlockerType,
} from "@/types/dayBlocker";
import { useEffect, useState } from "react";
import {
  addDays,
  eachDayOfInterval,
  isSameDay,
  parse,
  subDays,
} from "date-fns";
import { convertDateToString, convertStringToDate } from "@/lib/helpers";
import EventSideBar from "./eventSiderbar";
import { replaceDayBlockers } from "@/lib/server/actions/dayBlocker";

export type Mode = DayBlockerType | "0";

type EventCalendarProps = {
  eventId: string;
  userEmail: string;
  eventUserId: string;
  isCreator: boolean;
  dayBlockers: CalendarDayBlocker[];
  range: { start: string; end: string };
};

const TODAY = new Date();

const getCellClassName = (date: Date, blockers: CalendarDayBlocker[]) => {
  const blocker = blockers.find((b) =>
    isSameDay(parse(b.date, "dd-MM-yyyy", new Date()), date)
  );

  if (isSameDay(date, TODAY)) {
    switch (blocker?.type) {
      case "100":
        return "today-red-class";
      case "50":
        return "today-orange-class";
      default:
        return "today-green-class";
    }
  }

  if (blocker) {
    return blocker.type === "100" ? "bg-red-400" : "bg-orange-400";
  }

  return "bg-green-400";
};

const EventCalendar = ({
  eventId,
  eventUserId,
  dayBlockers,
  range,
}: EventCalendarProps) => {
  const [blockers, setBlockers] = useState<CalendarDayBlocker[]>(dayBlockers);
  const [activeMode, setActiveMode] = useState<Mode>("100");
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "1":
          setActiveMode("0");
          break;
        case "2":
          setActiveMode("50");
          break;
        case "3":
          setActiveMode("100");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const handleSubmit = async () => {
    const handleReplaceEvens = async () => {
      const res = await replaceDayBlockers({
        eventUserId: eventUserId,
        data: blockers,
        eventId,
      });
      if (res?.serverError) {
        throw new Error(res.serverError);
      }
    };
    toast.promise(handleReplaceEvens(), {
      loading: "Submitting your blockers...",
      success: "Submitted",
      error: "Failed to submit your blockers",
    });
  };
  const updateBlockers = (days: Date[]) => {
    setBlockers((prev) => {
      const updatedBlockers = prev.filter(
        (blocker) =>
          !days.some((day) => isSameDay(convertStringToDate(blocker.date), day))
      );

      if (activeMode === "100" || activeMode === "50") {
        const type: "100" | "50" = activeMode;

        const newBlockers = days.map((day) => ({
          date: convertDateToString(day),
          type,
        }));

        return [...updatedBlockers, ...newBlockers];
      }

      return updatedBlockers;
    });
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-start gap-8 px-4 py-4">
      <div className="flex flex-col gap-2">
        <FullCalendar
          longPressDelay={0}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable
          selectable
          showNonCurrentDates={false}
          validRange={{
            start: convertStringToDate(range.start),
            end: addDays(convertStringToDate(range.end), 1),
          }}
          headerToolbar={{
            left: "title",
            center: "",
            right: "prev,next",
          }}
          dayCellContent={(info) => (
            <p className="text-xs sm:text-base md:text-lg">
              {info.dayNumberText}
            </p>
          )}
          height="auto"
          fixedWeekCount={false}
          firstDay={1}
          dayCellClassNames={(info) => getCellClassName(info.date, blockers)}
          select={(info) => {
            const { start, end, view } = info;
            view.calendar.unselect();
            const days = eachDayOfInterval({ start, end: subDays(end, 1) });
            updateBlockers(days);
          }}
        />
      </div>
      <div className="lg:min-w-[25%]">
        <EventSideBar
          activeMode={activeMode}
          onModeClick={setActiveMode}
          onSubmit={handleSubmit}
          onIntegrateWithDateBlockers={() => console.log("Integrate")}
        />
      </div>
    </div>
  );
};

export default EventCalendar;
