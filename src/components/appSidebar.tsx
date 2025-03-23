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
  {
    title: "Create event",
    url: "/event/create",
    icon: Plus,
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
            <SidebarMenu className="mt-12">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-color4 hover:text-color1 text-color5 font-bold"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-color5 hover:bg-color-4">
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
