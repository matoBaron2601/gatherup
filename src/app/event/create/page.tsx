"use client";

import { Button } from "@/components/ui/button";
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
  type CreateEventFormValues,
} from "@/zod/forms/createEventFormSchema";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { DatePicker } from "@/components/ui/date-picker";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createEventWithUser } from "@/lib/server/actions/event";

export default function CreateEventPage() {
  const router = useRouter();
  const session = useSession();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/create-event");
  }

  const user = session.data?.user;
  const userEmail = user?.email ?? "";

  const [earliestDate, setEarliestDate] = useState<string>("");
  const [latestDate, setLatestDate] = useState<string>("");

  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      earliestPossibleDate: "",
      latestPossibleDate: "",
    },
  });

  useEffect(() => {
    form.setValue("earliestPossibleDate", earliestDate);
  }, [earliestDate, form]);

  useEffect(() => {
    form.setValue("latestPossibleDate", latestDate);
  }, [latestDate, form]);

  const onSubmit = async (values: CreateEventFormValues) => {
    const handleSubmit = async () => {
      await createEventWithUser({ ...values, userEmail });
    };

    toast.promise(handleSubmit(), {
      loading: "Creating new event...",
      success: "Event created successfully",
      error: "Failed to create event",
    });
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="flex w-full justify-center text-2xl font-bold text-color1 mb-4">
        Create Event
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-color1 font-bold">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className="h-12 text-base w-full bg-color2 text-color5 font-bold border-none placeholder:text-color5 placeholder:opacity-50"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-color1 font-bold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      className="h-12 text-base w-full bg-color2 text-color5 font-bold border-none placeholder:text-color5 placeholder:opacity-50"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem className="flex flex-col">
            <div className="flex flex-col gap-1.5">
              <FormLabel className="text-color1 font-bold">
                Earliest Possible Date
              </FormLabel>
              <DatePicker onChange={setEarliestDate} />
            </div>

            <FormMessage>
              {form.formState.errors.earliestPossibleDate?.message}
            </FormMessage>
          </FormItem>
          <FormItem className="flex flex-col">
            <FormLabel className="text-color1 font-bold">
              Latest Possible Date
            </FormLabel>
            <DatePicker onChange={setLatestDate} />
            <FormMessage>
              {form.formState.errors.latestPossibleDate?.message}
            </FormMessage>
          </FormItem>
          <div className="flex justify-center">
            <Button type="submit" className="w-full h-12 bg-color3 font-bold text-color5 hover:bg-color3 lg:w-[50%]">Create event</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
