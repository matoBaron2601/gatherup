import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import type { EventStatus } from "@/types/event"

type StatusBadgeProps = {
  status: EventStatus
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: EventStatus) => {
    switch (status) {
      case "opened":
        return {
          icon: Clock,
          className: "bg-blue-200 text-blue-800",
          label: "Opened",
        }
      case "confirmed":
        return {
          icon: CheckCircle,
          className: "bg-green-200 text-green-800",
          label: "Confirmed",
        }
      case "cancelled":
        return {
          icon: XCircle,
          className: "bg-red-200 text-red-800",
          label: "Cancelled",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant="outline" className={`gap-1 ${config.className}`}>
      <config.icon className="w-3 h-3" />
      {config.label}
    </Badge>
  )
}

export default StatusBadge

