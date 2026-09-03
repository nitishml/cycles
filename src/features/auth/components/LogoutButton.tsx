"use client"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut } from "lucide-react"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useState } from "react"
import { useLogout } from "../hooks/use-logout";


export const LogoutButton = () => {
    const [isLoading, setLoading] = useState(false)

    const mutation = useLogout();

    const handleLogout = () => {
        setLoading(true)
        mutation.mutate(
            undefined,
        );
    };
    return (
        <div className="w-full flex items-center justify-center max-w-40">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        className="cursor-pointer  flex  items-center justify-center gap-2 w-[300px] h-14"
                    >
                        <LogOut />
                        Logout
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will have to enter your details again to access your data
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className="w-full flex flex-col md:flex-row gap-2 items-center justify-between">

                            <Button onClick={handleLogout} disabled={isLoading || mutation.isPending} className="w-[200px]">
                                {mutation.isPending ? <Loader2 className="animate-spin" /> : "Confirm"}
                            </Button>
                            <AlertDialogCancel disabled={isLoading || mutation.isPending} className="w-[125px]" >
                                {mutation.isPending ? <Loader2 className="animate-spin" /> : "Cancel"}
                            </AlertDialogCancel>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}