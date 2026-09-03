"use client"

import {
    BadgeCheck,
    Bell,
    CreditCard,
    Loader,
    LogOut,
    Settings,
    Sparkles,
    TriangleAlert,
    UserRoundCog,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { InstallPWADropdownButton } from "@/components/layout/install-pwa-button"
import { useGetMe } from "../hooks/use-get-me"

type Props = {
    // role: typeof roleEnum.enumValues[number];
}

export function UserMenu({ }: Props) {

    const query = useGetMe()
    const isLoading = query.isLoading || query.isPending || query.isFetching

    if (isLoading) return (
        <div className="w-full flex items-center justify-center">
            <Loader className="animate-spin size-10" />
        </div>
    )

    if (!query.data || !query.data.data) return (
        <div className="w-full flex items-center justify-center">
            <TriangleAlert className="animate-pulse size-10" />
        </div>
    )
    const data = query.data.data

    const initial = data.name.charAt(0).toUpperCase() + (data.name.split(" ")[1] ? data.name.split(" ")[1].charAt(0).toUpperCase() : "")
    const displayName = data.name.slice(0, 25)
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Avatar className="size-10 rounded-lg cursor-pointer">
                    <AvatarFallback className="rounded-lg bg-custom-secondary-500  text-custom-primary-500 ">
                        {initial}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-max min-w-56 rounded-lg border border-custom-secondary-500"
                side={"bottom"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left">
                        <Avatar className="h-8 w-8  rounded-lg">
                            <AvatarFallback className=" bg-custom-secondary-500  text-custom-primary-500 rounded-lg">
                                {initial}
                            </AvatarFallback>
                        </Avatar>

                        <div className="grid grid-cols-1 flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold text-base">
                                {displayName}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-custom-secondary-500" />

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={'/'}>
                            <Sparkles className="" />
                            AI Chatbot
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="" />

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={'/user/account'}>
                            <UserRoundCog className="" />
                            Account
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={'/user/settings'}>
                            <Settings className="" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={'/user/notifications'}>
                            <Bell className="" />
                            Notifications
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="" />

                {/* <DropdownMenuItem>
                    <InstallPWADropdownButton />
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
