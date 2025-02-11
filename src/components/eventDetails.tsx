"use client";

import { Calendar, ClipboardList, User2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Event } from "@/types/event";
import type { User } from "@/types/user";
import StatusBadge from "./statusBadge";
import type React from "react";
import InfoItem from "./infoItem";

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
          { label: "Possible from", value: event.earliestPossibleDate },
          { label: "Possible to", value: event.latestPossibleDate },
        ]
      : event.status === "confirmed"
      ? [
          { label: "Confirmed start", value: event.startDate },
          { label: "Confirmed end", value: event.endDate },
        ]
      : [];

  return (
    <Card className="h-full">
      <CardContent className="h-full flex items-center justify-between py-6">
        <div className="flex gap-16">
          {commonInfo.map((item, index) => (
            <InfoItem
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
          {dateInfo.length > 0 && (
            <div className="flex gap-16">
              {dateInfo.map((item, index) => (
                <InfoItem
                  key={index}
                  icon={<Calendar className="h-6 w-6 flex-shrink-0" />}
                  label={item.label}
                  value={item.value ?? ''}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <StatusBadge status={event.status} />
        </div>
      </CardContent>
    </Card>
  );
};
