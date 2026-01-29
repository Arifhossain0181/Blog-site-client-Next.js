import { AppSidebar } from "@/components/layout/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"
import { userService } from "@/services/user.service"
import { redirect } from "next/navigation"
import { ROLE } from "@/constants/role"

export default async function DashboardLayout({
  children,
  admin,
  user
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  // Check authentication
  const { data: session, error } = await userService.getSession();
  
  // If no session, redirect to login
  if (error || !session) {
    redirect('/login?redirect=/dashboard');
  }
  
  // Get user info from session
  const {data: sessionData} = await userService.getSession()
  console.log("datas", sessionData)
  const userinfo = sessionData?.user;
  console.log("userinfo:", userinfo)

  // Determine what content to show
  let content: React.ReactNode;
  if (children) {
    content = children;
  } else if (userinfo?.role === ROLE.ADMIN) {
    content = admin;
  } else {
    content = user;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userinfo}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
         
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
            {content}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
