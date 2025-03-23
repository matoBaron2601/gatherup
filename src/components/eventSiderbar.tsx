"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mode } from "./eventCalendar";

export type EventSideBarProps = {
  activeMode: Mode;
  onModeClick: (mode: Mode) => void;
  onSubmit?: () => void;
  onIntegrateWithDateBlockers?: () => void;
};

const EventSideBar = ({
  activeMode,
  onModeClick,
  onSubmit,
}: EventSideBarProps) => {
  const modes: { label: string; mode: Mode; color: string }[] = [
    { label: "Available", mode: "0", color: "bg-green-500 bg-green-300 hover:bg-green-300" },
    { label: "Maybe", mode: "50", color: "bg-orange-500 bg-orange-300 hover:bg-orange-300" },
    { label: "Unavailable", mode: "100", color: "bg-red-500 bg-red-300 hover:bg-red-300" },
  ];

  return (
    <div className="w-full">
      <span className="text-lg font-bold text-color1">Select mode</span>
      <Separator />
      <div className="flex flex-col gap-2">
        {modes.map(({ label, mode, color }) => (
          <Button
            key={mode}
            variant={activeMode === mode ? "default" : "outline"}
            className={`justify-start bg-color3 hover:bg-color4 ${activeMode === mode ? color : ""}`}
            onClick={() => onModeClick(mode)}
          >
            <div
              className={`mr-2 h-4 w-4 rounded-full ${
                color.split(" ")[0]
              }`}
            />
            <span className={`font-bold ${activeMode === mode ? 'text-color1 ' : 'text-color5'} `}>{label}</span>
          </Button>
        ))}
      </div>
      <Separator className="my-4 bg-color3 h-0.5" />

      <Button
        className="w-full h-12 bg-color2 font-bold text-color5 hover:bg-color4"
        onClick={onSubmit}
      >
        Submit calendar
      </Button>
    </div>
  );
};

export default EventSideBar;
