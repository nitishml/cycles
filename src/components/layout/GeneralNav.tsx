"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { Bell, Home, LifeBuoy, Settings, UserRoundCog } from "lucide-react"
import { usePathname } from "next/navigation"

export const GeneralNav = () => {
    const route = usePathname().split("/").slice(2, 3).join("/")
    //console.log("route: ", route)
    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-5 py-2 max-w-7xl mx-auto gap-2 px-4">
            <Button variant={'secondary'} asChild>
                <Link href={'/'}>
                    <Home />
                    Home
                </Link>
            </Button>
            <Button variant={route === "account" ? 'default' : 'secondary'} asChild>
                <Link href={'/user/account'}>
                    <UserRoundCog />
                    Account
                </Link>
            </Button>
            <Button variant={route === "settings" ? 'default' : 'secondary'} asChild>
                <Link href={'/user/settings'}>
                    <Settings />
                    Settings
                </Link>
            </Button>
            <Button variant={route === "notifications" ? 'default' : 'secondary'} asChild>
                <Link href={'/user/notifications'}>
                    <Bell />
                    Notifications
                </Link>
            </Button>
            <Button variant={route === "support" ? 'default' : 'secondary'} asChild>
                <Link href={'/user/support'}>
                    <LifeBuoy />
                    Support
                </Link>
            </Button>
        </div>
    )
}