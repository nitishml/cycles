"use client"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetUserSessions } from "../hooks/use-get-sessions";
import { DataError, QueryLoading } from "@/components/query-loaders";
import { SessionDeviceRow } from "./session-device-row";

export const UserDeviceList = () => {
    const query = useGetUserSessions()

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    return (
        <div className="w-full space-y-8">
            <h1 className="text-2xl font-semibold">Logged in Devices</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">PLATFORM</TableHead>
                        <TableHead>DEVICE</TableHead>
                        {/* <TableHead>LOCATION</TableHead> */}
                        <TableHead>ADDED ON</TableHead>
                        {/* <TableHead className="text-right"></TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {data.map((item) => (
                        <SessionDeviceRow key={item.id} sessionId={item.id} userAgent={item.userAgent || ""} createdAt={item.createdAt} ipAddress={item.ipAddress || ""} />
                    ))}
                </TableBody>
            </Table>


        </div>

    )
}