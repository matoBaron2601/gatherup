"use client";

import { Trash2, Plus, CalendarIcon, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePickerWithRange from "./date-picker-with-range";
import {
  createPersonalBlockerFormSchema,
  CreatePersonalBlockerFormValues,
} from "@/lib/server/schemas/personalBlocker";
import { createPersonalBlocker, deletePersonalBlocker } from "@/lib/server/actions/personalBlocker";
import { PersonalBlocker } from "@/types/personalBlocker";

type DateBlockerFormProps = {
  dateBlockers: PersonalBlocker[];
  userEmail: string;
};

const DateBlockerForm = ({ dateBlockers, userEmail }: DateBlockerFormProps) => {
  const form = useForm<CreatePersonalBlockerFormValues>({
    resolver: zodResolver(createPersonalBlockerFormSchema),
    defaultValues: {
      from: "",
      to: "",
      reason: "",
    },
    mode: "onChange",
  });

  const handleDelete = (id: string) => {
    const handleDeletePersonalBlocker = async () => {
      await deletePersonalBlocker(id);
    };
    toast.promise(handleDeletePersonalBlocker(), {
      loading: "Deleting personal blocker...",
      success: "Personal blocker deleted",
      error: "Failed to delete personal blocker",
    });
  };

  const onSubmit = async (data: CreatePersonalBlockerFormValues) => {
    const handleCreatePersonalBlocker = async () => {
        await createPersonalBlocker({...data, userEmail});
    };
    toast.promise(handleCreatePersonalBlocker(), {
      loading: "Adding personal blocker...",
      success: "Personal blocker added",
      error: "Failed to add personal blocker",
    });
  };

  return (
    <div className="container mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Table>
            <TableBody>
              {dateBlockers.map((dateBlocker) => (
                <TableRow key={dateBlocker.id}>
                  <TableCell>
                    {dateBlocker.from} - {dateBlocker.to}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {dateBlocker.reason}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="hover:bg-red-100 hover:text-red-500"
                      size="icon"
                      type="button"
                      onClick={() => handleDelete(dateBlocker.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="hover:bg-transparent">
                <TableCell>
                  <DatePickerWithRange
                    date={{
                      from: form.watch("from"),
                      to: form.watch("to"),
                    }}
                    onDateChange={(dateRange) => {
                      if (dateRange?.from)
                        form.setValue("from", dateRange.from);
                      if (dateRange?.to) form.setValue("to", dateRange.to);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormControl>
                          <Input placeholder="Note" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </Form>
    </div>
  );
};
export default DateBlockerForm;
