import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import "./globals.css";
import NavMenu from "./components/NavMenu";
import SessionProvider from "@/providers/SessionProvider";
import AppSidebar from "@/components/appSidebar";
import { Sidebar } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ModalProvider } from "@/hooks/useCreateEventModal";
import { CreateEventModal } from "@/components/createEventModal";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GatherUp",
};

const RootLayout = async ({
  children,
  breadcrumb,
}: Readonly<{
  children: React.ReactNode;
  breadcrumb: React.ReactNode;
}>) => {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <SidebarProvider>
            <ModalProvider>
              <AppSidebar />
              <CreateEventModal />
              <main className="w-full">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    {breadcrumb}
                  </div>
                </header>
                <div className="px-2 lg:px-20 w-full">{children}</div>
                <Toaster richColors/>
              </main>
            </ModalProvider>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
