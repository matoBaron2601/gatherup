import * as React from "react";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { convertStringFromDefaultToDotNotation } from "@/lib/helpers";
import { useState } from "react";

interface DatePickerProps {
  initialDate?: string;
  onChange?: (date: string) => void;
}

export function DatePicker({ initialDate, onChange }: DatePickerProps) {
  const [date, setDate] = useState(initialDate ?? "");
  const [open, setOpen] = useState(false);

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "dd-MM-yyyy");
      setDate(formattedDate);
      onChange?.(formattedDate);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="h-12 text-base w-full bg-color2 text-color5 font-bold border-none hover:bg-color2 hover:text-color5"
      >
        <Button
          variant="outline"
          className="flex w-full h-12 justify-between text-left items-center"
          onClick={() => setOpen(!open)}
        >
          {date ? (
            <span className="font-bold text-color5">
              {convertStringFromDefaultToDotNotation(date)}
            </span>
          ) : (
            <span className="text-color5 opacity-50">Pick a date</span>
          )}
          <CalendarIcon className="mr-2 h-4 w-4 text-color5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-color5 border border-color4">
        <Calendar
          mode="single"
          selected={date ? parse(date, "dd-MM-yyyy", new Date()) : undefined}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
