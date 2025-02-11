"use client";

import { useSession } from "next-auth/react";
import { Home, User, Plus } from "lucide-react";
import { type ComponentProps } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./navUser";
import { useModal } from "@/hooks/useCreateEventModal";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Personal Blockers",
    url: "/account/blockers",
    icon: User,
  },
];
const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const { data: session } = useSession({ required: true });
  const { openModal } = useModal();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem key={"create-event"}>
                <SidebarMenuButton asChild>
                  <button onClick={openModal}>
                    <Plus />
                    Create event
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
