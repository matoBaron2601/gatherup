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

  const result = await db.select().from(events).where(eq(events.id, resolvedParams.id));
  const event: Event = result[0];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Event</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{event?.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbEventPage;
