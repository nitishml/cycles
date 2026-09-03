'use client'

import { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'
import { FaWindows, FaApple, FaAndroid, FaLinux } from 'react-icons/fa'
import { SiUbuntu } from 'react-icons/si'
import { Monitor, Smartphone, Tablet, MapPin, Trash, Loader2 } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
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
import { toast } from 'sonner'
import { useRevokeSession } from '../hooks/use-revoke-session'

interface SessionCardProps {
    sessionId: string;
    userAgent: string;
    ipAddress: string;
    createdAt: Date
}

const SessionDeviceRow = ({ sessionId, userAgent, ipAddress, createdAt }: SessionCardProps) => {
    const [deviceInfo, setDeviceInfo] = useState<any>(null)
    const [location, setLocation] = useState<string | null>(null)
    const [isLoading, setLoading] = useState(false)

    const mutation = useRevokeSession()
    const handleRevoke = () => {
        setLoading(true)
        mutation.mutate({
            sessionId
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Session Removed")
                    // router.push(`/teacher/attendance/lecture/${data.data.id}/core/verify`)
                }
                else {
                    toast.error(data.message || "Please try again")
                    setLoading(false)
                }
            },
            onError: (data) => {
                toast.error(data.message || "Please try again")
                setLoading(false)
            }

        })
    }
    useEffect(() => {
        // Parse user agent
        const parser = UAParser(userAgent)

        const browser = parser.browser.name || 'Unknown Browser'
        const os = parser.os.name || 'Unknown OS'
        const deviceType = parser.device.type || 'desktop'
        const deviceModel = parser.device.model || ''

        const isMobile = parser.device.is("mobile")

        let OSIcon: any = Monitor
        if (os.includes('Windows')) OSIcon = FaWindows
        else if (os.includes('Mac OS') || os.includes('iOS')) OSIcon = FaApple
        else if (os.includes('Android')) OSIcon = FaAndroid
        else if (os.includes('Ubuntu')) OSIcon = SiUbuntu
        else if (os.includes('Linux')) OSIcon = FaLinux

        let DeviceIcon = Monitor
        if (deviceType === 'mobile') DeviceIcon = Smartphone
        else if (deviceType === 'tablet') DeviceIcon = Tablet

        let device = deviceType === 'desktop' ? os : deviceModel || deviceType

        setDeviceInfo({ browser, os, device, OSIcon, DeviceIcon, deviceType, isMobile })

        // Fetch location from IP
        // const fetchLocation = async () => {
        //     try {
        //         const response = await fetch(`http://ip-api.com/json/${ipAddress}`)
        //         const data = await response.json()

        //         if (data.status === 'success') {
        //             setLocation(`${data.city}, ${data.country}`)
        //         }
        //     } catch (error) {
        //         console.error('Error fetching location:', error)
        //     }
        // }

        // fetchLocation()
    }, [userAgent, ipAddress])

    if (!deviceInfo) return null

    const { browser, device, OSIcon, DeviceIcon, isMobile, deviceType } = deviceInfo

    return (
        <TableRow>
            <TableCell className="flex items-center justify-start gap-2">
                <DeviceIcon className="size-6" />
                <OSIcon className="size-6 text-muted-foreground" /></TableCell>
            {/* <TableCell>{browser} on {device} {deviceType} {isMobile ? "Yes" : "no"}</TableCell> */}
            <TableCell>{isMobile ? device : browser + " on " + device}</TableCell>
            {/* <TableCell>{location && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-3" />
                    {location}
                </span>
            )}</TableCell> */}
            <TableCell>{format(createdAt, "dd/MM/yyyy HH:mm a")}</TableCell>
            <TableCell className="text-right">

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={'destructive'}>
                            <Trash />
                            Logout Session
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent >
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                            <AlertDialogDescription>
                                You will have to login again on this device/browser
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <div className="w-full flex flex-col md:flex-row gap-2 items-center justify-between">

                                <Button onClick={handleRevoke} disabled={isLoading || mutation.isPending} className="w-[200px]">
                                    {mutation.isPending ? <Loader2 className="animate-spin" /> : "Confirm"}
                                </Button>
                                <AlertDialogCancel disabled={isLoading || mutation.isPending} className="w-[125px]" >
                                    {mutation.isPending ? <Loader2 className="animate-spin" /> : "Cancel"}
                                </AlertDialogCancel>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </TableRow>
    )
}

export { SessionDeviceRow }




