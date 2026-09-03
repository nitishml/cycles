"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { Bell, Calendar, CircleUser, LayoutGrid, LifeBuoy, ListTodo, Loader, Logs, ReceiptText, School, Settings, Sparkles, SquarePen, Ticket, TriangleAlert, UserRoundCog, UsersRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BiDonateBlood } from "react-icons/bi"
import { FaChalkboardTeacher } from "react-icons/fa"
import { GiTeacher } from "react-icons/gi"
import { HiOutlineAcademicCap } from "react-icons/hi"
import { MdTempleBuddhist } from "react-icons/md"

const mobileRoutes = [
    //first row
    {
        title: "Account",
        url: `/user/account`,
        icon: UserRoundCog
    },
    {
        title: "Settings",
        url: `/user/settings`,
        icon: Settings
    },
    //second row
    {
        title: "Notifications",
        url: `/user/notifications`,
        icon: Bell
    },
    {
        title: "Support",
        url: `/user/support`,
        icon: LifeBuoy
    },
    //third row
    {
        title: "Seva Bookings",
        url: `/staff/seva/tickets`,
        icon: Ticket
    },
    {
        title: "Darshan Bookings",
        url: `/staff/darshan`,
        icon: MdTempleBuddhist
    },

    //fourth row
    {
        title: "Seva",
        url: `/staff/seva`,
        icon: BiDonateBlood
    },
    {
        title: "Devotees",
        url: `/staff/devotees`,
        icon: UsersRound
    },

    {
        title: "Logs",
        url: `/staff/logs`,
        icon: Logs
    },
]

const mobileFooterRoutes = [

    {
        title: "Dashboard",
        url: `/staff`,
        icon: LayoutGrid
    },
    {
        title: "Check In",
        url: `/staff/check-in`,
        icon: ReceiptText
    },
    {
        title: "Chat",
        url: `/staff`,
        icon: Sparkles
    }
]

export const MobileSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const route = usePathname().split("/").slice(0, 4).join("/")
    const { setOpenMobile } = useSidebar()
    const displayName = "Admin Office"
    const initial = "AO"
    return (
        <Sidebar {...props}>
            <SidebarHeader className="px-4">
                <div className="w-full flex items-center justify-between ">
                    <div className="flex items-center justify-start gap-2">
                        <div className=" flex  items-start justify-center rounded-lg">
                            <Image
                                src={'/logo.svg'}
                                height={40}
                                width={40}
                                alt="logo"
                            />
                        </div>
                        <span className="font-bold text-base ">
                            GS-TMS
                        </span>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <div className="shrink"><ModeToggle /></div>

                        <SidebarTrigger />
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="pt-2 px-4">
                <div className="flex items-center justify-between gap-2  py-3 px-2 border border-white rounded-md">
                    <div className="flex-1 flex items-center justify-start gap-2">
                        <Avatar className="size-10 rounded-lg bg-custom-primary-500">
                            <AvatarFallback className="rounded-lg text-custom-secondary-300 font-extrabold bg-custom-primary-500">
                                {initial}
                            </AvatarFallback>
                        </Avatar>


                        <div className="grid grid-cols-1 flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold text-base">
                                {displayName}
                            </span>
                        </div>
                    </div>

                </div>
                <SidebarGroup >
                    <SidebarMenu className="w-full grid grid-cols-2 gap-2 pt-6">
                        {mobileRoutes.map((item, idx) => (
                            <SidebarMenuItem key={idx}>
                                <SidebarMenuButton
                                    className="flex overflow-clip flex-col items-center justify-center gap-2 h-20 border border-white rounded-md min-w-0 px-2"
                                    tooltip={item.title}
                                    isActive={item.url === route}
                                    asChild
                                >
                                    <Link href={item.url} onClick={() => setOpenMobile(false)}>
                                        <item.icon className="shrink-0" />
                                        <p className="text-center truncate block w-full px-2">{item.title}</p>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}

                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter className="px-4 pb-4">

                <div className="w-full flex flex-col gap-4  pt-2">
                    {/* <div className="w-full flex items-center justify-start gap-2">
                        <Button variant={'default'} size={'icon'} asChild>
                            <a href={"https://wa.me"}><SiWhatsapp /></a>
                        </Button>
                        <ModeToggle />
                    </div> */}

                    <div className="text-center">
                        <p className="font-semibold text-base sm:text-xl md:text-2xl leading-tight">
                            ಗ್ರೋಶಾರ್ಪ್ ದೇವಸ್ಥಾನ
                        </p>
                        <p className="font-bold text-base sm:text-xl md:text-2xl mt-1">
                            Growsharp Temple
                        </p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}


export function MobileFooter() {
    return (
        <div className='w-full  bg-muted z-50 h-[60px] fixed bottom-0 md:hidden flex items-center justify-evenly border-t border-foreground pt-3'>
            {mobileFooterRoutes.map((item, idx) => (
                <Button key={idx} variant={'mobileFooter'} asChild>
                    <Link href={item.url}>
                        <item.icon className="size-5" />
                        {item.title}
                    </Link>
                </Button>
            ))}

        </div>
    )
}