"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { convertStringFromDefaultToDotNotation } from "@/lib/helpers"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  date: { from: string | undefined; to: string | undefined }
  onDateChange: (dateRange: { from: string; to: string } | undefined) => void
}

export default function DatePickerWithRange({
  date,
  onDateChange,
  className,
}: DatePickerWithRangeProps) {
  const parsedDate: DateRange = {
    from: date.from ? parse(date.from, "dd-MM-yyyy", new Date()) : undefined,
    to: date.to ? parse(date.to, "dd-MM-yyyy", new Date()) : undefined,
  }

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    if (selectedDate?.from || selectedDate?.to) {
      onDateChange({
        from: selectedDate.from ? format(selectedDate.from, "dd-MM-yyyy") : "",
        to: selectedDate.to ? format(selectedDate.to, "dd-MM-yyyy") : "",
      })
    } else {
      onDateChange(undefined)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {convertStringFromDefaultToDotNotation(date.from)} - {convertStringFromDefaultToDotNotation(date.to)}
                </>
              ) : (
                convertStringFromDefaultToDotNotation(date.from)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={parsedDate.from}
            selected={parsedDate}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
