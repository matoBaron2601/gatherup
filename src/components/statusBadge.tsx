import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { EventStatus } from "@/types/event";

type StatusBadgeProps = {
  status: EventStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: EventStatus) => {
    switch (status) {
      case "opened":
        return {
          icon: Clock,
          variant: "secondary" as const,
          label: "Opened",
        };
      case "confirmed":
        return {
          icon: CheckCircle,
          variant: "default" as const,
          label: "Confirmed",
        };
      case "cancelled":
        return {
          icon: XCircle,
          variant: "destructive" as const,
          label: "Cancelled",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className="gap-1">
      <config.icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
