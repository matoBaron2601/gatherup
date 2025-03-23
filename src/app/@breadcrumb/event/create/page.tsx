import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import db from "@/db";
import { eq } from "drizzle-orm";
import { events } from "@/db/schema";
import type { Event } from "@/types/event";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

const BreadcrumbEventPage = async ({ params }: EventPageProps) => {
  const resolvedParams = await params;

  const result = await db
    .select()
    .from(events)
    .where(eq(events.id, resolvedParams.id));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Event</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Create</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbEventPage;
