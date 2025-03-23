"use client";

import { Calendar, ClipboardList, User2 } from "lucide-react";
import type { Event } from "@/types/event";
import type { User } from "@/types/user";
import type React from "react";
import InfoItem from "./infoItem";
import { convertStringFromDefaultToDotNotation } from "@/lib/helpers";

type EventDetailsProps = {
  event: Event;
  isCreator: boolean;
  creator: User;
};

export const EventDetails = ({ event, creator }: EventDetailsProps) => {
  const commonInfo = [
    {
      icon: <ClipboardList className="h-6 w-6 flex-shrink-0" />,
      label: "Name",
      value: event.name,
    },
    {
      icon: <ClipboardList className="h-6 w-6 flex-shrink-0" />,
      label: "Status",
      value: event.status[0].toUpperCase() + event.status.slice(1),
    },
    {
      icon: <User2 className="h-6 w-6 flex-shrink-0" />,
      label: "Created by",
      value: creator.name ?? creator.email,
    },
  ];

  const dateInfo =
    event.status === "opened"
      ? [
          {
            label: "Possible from",
            value: convertStringFromDefaultToDotNotation(
              event.earliestPossibleDate
            ),
          },
          {
            label: "Possible to",
            value: convertStringFromDefaultToDotNotation(
              event.latestPossibleDate
            ),
          },
        ]
      : event.status === "confirmed"
      ? [
          {
            label: "Confirmed start",
            value: convertStringFromDefaultToDotNotation(event.startDate ?? ""),
          },
          {
            label: "Confirmed end",
            value: convertStringFromDefaultToDotNotation(event.endDate ?? ""),
          },
        ]
      : [];

  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:gap-16 w-full px-12 py-4">
      {commonInfo
        .filter((item) => item.label !== "Name")
        .map((item, index) => (
          <InfoItem
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
          />
        ))}
      {dateInfo.length > 0 &&
        dateInfo.map((item, index) => (
          <InfoItem
            key={index}
            icon={<Calendar className="h-6 w-6 flex-shrink-0" />}
            label={item.label}
            value={item.value ?? ""}
          />
        ))}
    </div>
  );
};
