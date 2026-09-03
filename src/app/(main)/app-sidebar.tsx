"use client"

import * as React from "react"
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
    useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { SidebarModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileSidebar } from "./mobile-layout"
import { usePathname } from "next/navigation"

import { BriefcaseBusiness, CalendarDays, Home, LifeBuoy, Logs, RefreshCcwDot } from "lucide-react"

const employeeRoutes = [
    {
        title: "Dashboard",
        url: `/dashboard`,
        icon: Home
    },
    {
        title: "Tasks",
        url: `/tasks`,
        icon: BriefcaseBusiness
    },
    {
        title: "Cycles",
        url: `/cycles`,
        icon: RefreshCcwDot
    },
    {
        title: "Calendar",
        url: `/calendar`,
        icon: CalendarDays
    },
    {
        title: "Logs",
        url: `/staff/logs`,
        icon: Logs
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const isMobile = useIsMobile()
    const { setOpen } = useSidebar()

    const route = usePathname().split("/").slice(0, 3).join("/")
    if (isMobile) return (
        <MobileSidebar />
    )
    else return (
        <Sidebar variant="inset" collapsible="icon" {...props} className="text-white ">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className=" flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Image
                                    src={'/logo.svg'}
                                    height={24}
                                    width={24}
                                    alt="logo"
                                />
                            </div>
                            <div className="flex-1 text-left">
                                <span className="truncate font-bold  text-2xl leading-tight">
                                    Cycles
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="">
                    <SidebarMenu>
                        {employeeRoutes.map((item, idx) => (
                            <SidebarMenuItem key={idx} >
                                <SidebarMenuButton tooltip={item.title} isActive={item.url === route} asChild>
                                    <Link href={item.url} onClick={() => setOpen(false)}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}

                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup >
                    <SidebarGroupContent>
                        <SidebarMenu>


                            <SidebarMenuItem >
                                <SidebarMenuButton asChild>
                                    <a href={"/user/support"}>
                                        <LifeBuoy />
                                        <span>{"Support"}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem >
                                <SidebarModeToggle />
                            </SidebarMenuItem>
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )

}