import db from "@/db";
import { users } from "@/db/schema";
import { Event } from "@/types/event";
import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Calendar, ClipboardList, User } from "lucide-react";
import { convertStringFromDefaultToDotNotation, convertStringToDate } from "@/lib/helpers";
import StatusBadge from "./statusBadge";
import { AdminAction } from "./adminAction";
import InfoItem from "./infoItem";
import { Item } from "@radix-ui/react-dropdown-menu";
export type EventCardProps = {
  event: Event;
  isCreator?: boolean;
};

const EventCard = async ({ event, isCreator }: EventCardProps) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, event.creatorEmail));

  const dateInfo =
    event.status === "opened"
      ? [
          { label: "Possible from", value: convertStringFromDefaultToDotNotation(event.earliestPossibleDate) },
          { label: "Possible to", value: convertStringFromDefaultToDotNotation(event.latestPossibleDate) },
        ]
      : event.status === "confirmed"
      ? [
          { label: "Start", value: convertStringFromDefaultToDotNotation(event.startDate ?? '') },
          { label: "End", value: convertStringFromDefaultToDotNotation(event.endDate ?? '') },
        ]
      : [];
  return (
    <Card className="relative shadow-md hover:shadow-2xl border-[1px] bg-color4">
      {isCreator && (
        <div className="absolute top-0 right-0 p-2">
          <AdminAction event={event} variant="dots" />
        </div>
      )}
      <Link href={`/event/${event.id}`} className="">
          <div className="flex flex-col justify-start gap-4 p-4 h-full">
            <h2 className="font-bold text-color1">{event.name}</h2>
            <StatusBadge status={event.status} />
              {dateInfo.length > 0 && (
                <div className="flex justify-between pr-2">
                  {dateInfo.map((item, index) => (
                    <InfoItem
                      key={index}
                      icon={<Calendar className="h-6 w-6 flex-shrink-0" />}
                      label={item.label}
                      value={item.value ?? ""}
                    />
                  ))}
                </div>
              )}
          </div>
      </Link>
    </Card>
  );
};

export default EventCard;
