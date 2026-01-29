import * as React from "react";
import Link from "next/link";
import { userroutes } from "@/routes/userroutes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminroutes } from "@/routes/adminroutes";
import { Routes } from "@/tyPe/rotutes";
import { ROLE } from "@/constants/role";

export function AppSidebar({user, ...props }: {user?: {role: string} } & React.ComponentProps<typeof Sidebar>) {
  let routes: Routes[] = []

  console.log("User in sidebar:", user);
  console.log("User role:", user?.role);

  switch (user?.role) {
    case ROLE.ADMIN:
      console.log("Loading admin routes");
      routes = adminroutes
      break;
    case ROLE.USER:
      console.log("Loading user routes");
      routes = userroutes
      break;
    default:
      console.log("No role match, using user routes as default");
      routes = userroutes // Default to user routes if no role matches
      break;
  }

  console.log("Routes to display:", routes);


  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <h2 className="text-lg font-semibold">Blog Dashboard</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {routes.length === 0 ? (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            No routes available
          </div>
        ) : (
          routes.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild>
                        <Link href={subItem.url}>{subItem.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
