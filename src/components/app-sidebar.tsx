import * as React from "react";
import Link from "next/link";
import { userroutes } from "@/routes/userroutes";
import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminroutes } from "@/routes/adminroutes";
import { Routes } from "@/tyPe/rotutes";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Write Blog",
          url: "/dashboard/Writeblog",
        },
        {
          title: "Admin Dashboard",
          url: "/admin-dashboar",
        },
        {
          title: "User Dashboard",
          url: "/user-dashboard",
        },
      ],
    },
    
    
    
  ],
};

export function AppSidebar({user, ...props }: {user: {role: string} } & React.ComponentProps<typeof Sidebar>) {
  let routes: Routes[] = []

  switch (user.role) {
    case "admin":
      routes =adminroutes
      break;
    case "user":
      routes =userroutes
      break;
    default:
      routes =[]
      break;

  }


  return (
    <Sidebar {...props}>
      
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
