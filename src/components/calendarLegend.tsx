import { Card, CardContent } from "@/components/ui/card";

const CalendarLegend = () => (
  <Card className="w-full">
    <CardContent className="!p-0">
      <div className="flex items-center justify-center space-x-12 p-2 sm:px-16">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded bg-green-400" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded bg-orange-400" />
          <span className="text-sm">Maybe</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded bg-red-400" />
          <span className="text-sm">Unavailable</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CalendarLegend;
