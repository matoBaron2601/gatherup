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
import { Toaster } from "@/components/ui/sonner";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],>
// });

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
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <SidebarProvider>
            <ModalProvider>
              <AppSidebar />
              <main className="w-full bg-color1">
                <header className="fixed w-full flex h-16 shrink-0 items-center gap-2 bg-color1">
                  <div className="flex items-center gap-2 ml-3">
                    <SidebarTrigger className="text-color5 hover:bg-color4" />
                    <Separator orientation="vertical" className="mr-2 h-4 bg-color5" />
                    {breadcrumb}
                  </div>
                </header>
                <div className="mt-16 bg-color5 rounded-3xl h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] overflow-y-auto md:mr-4 md:scrollbar-auto scrollbar-hidden"> {children} </div>
                <Toaster richColors />
              </main>
            </ModalProvider>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
