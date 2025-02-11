import { eq } from "drizzle-orm";
import { eachDayOfInterval, format, isSameDay } from "date-fns";

import { dayBlockers, users } from "@/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db";
import { Event } from "@/types/event";
import {
  getEventUsersByEventId,
  getUsersByEventId,
} from "@/lib/server/fetch/eventUser";
import { convertStringToDate } from "@/lib/helpers";
import { DayBlocker } from "@/types/dayBlocker";

type AttendanceProps = {
  event: Event;
};

type AttendanceData = {
  name: string;
  blockers: DayBlocker[];
};

const Attendance = async ({ event }: AttendanceProps) => {
  const eventUsers = await getEventUsersByEventId(event.id);

  const attendanceData: AttendanceData[] = await db.transaction(async (trx) => {
    return await Promise.all(
      eventUsers.map(async (eventUser) => {
        const blockers = await trx
          .select()
          .from(dayBlockers)
          .where(eq(dayBlockers.eventUserId, eventUser.id));

        const user = await trx
          .select({
            name: users.name,
          })
          .from(users)
          .where(eq(users.email, eventUser.userEmail))
          .limit(1);

        return { name: user[0]?.name || "Unknown", blockers };
      })
    );
  });

  const dates = eachDayOfInterval({
    start: convertStringToDate(event.earliestPossibleDate),
    end: convertStringToDate(event.latestPossibleDate),
  });

  return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-primary sm:text-xl">
            Attendance List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table
              style={{ tableLayout: "fixed", width: "auto" }}
              className="border-collapse border border-gray-300"
            >
              <TableHeader className="sticky top-0">
                <TableRow>
                  <TableCell className="font-bold border border-gray-300">
                    Date
                  </TableCell>
                  {attendanceData.map((data, index) => (
                    <TableCell
                      key={index}
                      className="font-bold max-w-[120px] break-words whitespace-normal border border-gray-300"
                    >
                      {data.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dates.map((date, index) => (
                  <TableRow key={index} className="border border-gray-300">
                    <TableCell
                      className={cn(
                        "border border-gray-300",
                        index % 2 === 0 ? "bg-yellow-50" : "bg-white"
                      )}
                    >
                      {format(date, "dd.MM.yyyy")}
                    </TableCell>
                    {attendanceData.map((data, index) => {
                      const blocker = data.blockers.find((b) =>
                        isSameDay(convertStringToDate(b.date), date)
                      );
                      return (
                        <TableCell
                          key={index}
                          className={cn("border border-gray-300", {
                            "bg-green-400": !blocker,
                            "bg-red-400": blocker?.type === "100",
                            "bg-orange-400": blocker?.type === "50",
                          })}
                        ></TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
  );
};

export default Attendance;
