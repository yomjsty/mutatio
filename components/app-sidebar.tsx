"use client"

import * as React from "react"
import {
  IconExclamationCircle,
  // IconChartBar,
  IconFileText,
  IconHelp,
  IconHome2,
  // IconKey,
  IconSettings,
} from "@tabler/icons-react"

// import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { BarChart3Icon } from "lucide-react"

interface User {
  id: string
  name: string | null
  email: string
  image: string | null
}

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconHome2,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: IconFileText,
    },
    // {
    //   title: "API Keys",
    //   url: "/dashboard/api-keys",
    //   url: "#",
    //   icon: IconKey,
    // },
    // {
    //   title: "Analytics",
    //   url: "/dashboard/analytics",
    //   url: "#",
    //   icon: IconChartBar,
    // },
  ],
  navSecondary: [
    {
      title: "Changelogs (Example)",
      url: "/changelogs",
      icon: IconExclamationCircle,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
  ],
  recentProjects: [
    {
      name: "Changelog Mutatio",
      url: "#",
      icon: IconFileText,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <BarChart3Icon className="h-6 w-6 text-primary" />
                <span className="text-base font-semibold">Mutatio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.recentProjects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
