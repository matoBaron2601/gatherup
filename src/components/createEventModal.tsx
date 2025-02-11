"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useCreateEventModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import createEventFormSchema, {
  CreateEventFormValues,
} from "@/zod/forms/createEventFormSchema";
import { createEvent } from "@/actions/server/event";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DatePickerWithRange from "./date-picker-with-range";

export function CreateEventModal() {
  const session = useSession();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const user = session.data?.user;
  const userEmail = user?.email ?? "";
  const { isOpen, closeModal } = useModal();

  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      name: "",
      description: "test",
      earliestPossibleDate: "",
      latestPossibleDate: "",
    },
  });

  const onSubmit = async (values: CreateEventFormValues) => {
    await createEvent({ ...values, userEmail });
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Create Event"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Create Event</Button>
        </div>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    className="h-12 text-base w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    className="h-12 text-base w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="earliestPossibleDate"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>Date Range</FormLabel>
                <DatePickerWithRange
                  date={{
                    from: form.watch("earliestPossibleDate"),
                    to: form.watch("latestPossibleDate"),
                  }}
                  onDateChange={(dateRange) => {
                    if (dateRange?.from)
                      form.setValue("earliestPossibleDate", dateRange.from);
                    if (dateRange?.to)
                      form.setValue("latestPossibleDate", dateRange.to);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
}
