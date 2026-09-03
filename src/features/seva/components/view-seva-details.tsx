"use client"

import { DataDisplay, SoftDataDisplay } from "@/components/data-display-boxes";
import { useGetSeva } from "../hooks/use-get-seva";
import { DataError, QueryLoading } from "@/components/query-loaders";
import { useState } from "react";
import { EditSevaForm } from "./edit-seva-form";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaEdit } from "react-icons/fa";
import { Ticket, Trash } from "lucide-react";
import { TiCancel } from "react-icons/ti";

import Link from "next/link";

type Props = {
    sevaId: string
}
export const ViewSevaDetails = ({ sevaId }: Props) => {
    const [showEdit, setShowEdit] = useState(false)
    const query = useGetSeva({
        sevaId
    })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    return (
        <div className="w-full space-y-8">
            <div className="w-full min-h-32 h-full grid gap-10 grid-cols-3 mx-auto">
                <Card
                    className='w-full group rounded-2xl bg-muted p-2 overflow-hidden group-hover:black relative z-10 flex flex-col h-full gap-0 py-6 cursor-pointer'
                    onClick={() => setShowEdit(!showEdit)}>
                    <CardHeader>
                        <CardTitle className='font-semibold tracking-wide text-center group-hover:scale-125 transition-transform duration-300 ease-in-out text-xl text-wrap h-min'>
                            {showEdit ? "Cancel Edit" : "Edit Details"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className=' text-muted-foreground tracking-wide leading-relaxed flex items-center justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out '>
                        {showEdit ? <TiCancel className='size-8' /> : (<FaEdit className='size-8' />)}
                    </CardContent>
                </Card>
                <Link className="w-full group" href={`/staff/seva/manage/${sevaId}/bookings`}>
                    <Card className=' rounded-2xl bg-muted p-2 overflow-hidden group-hover:black relative z-10 flex flex-col h-full gap-0 py-6 cursor-pointer'>
                        <CardHeader>
                            <CardTitle className='font-semibold tracking-wide text-center group-hover:scale-125 transition-transform duration-300 ease-in-out text-xl text-wrap h-min'>
                                {"Bookings"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className=' text-muted-foreground tracking-wide leading-relaxed flex items-center justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out '>
                            <Ticket className='size-8' />
                        </CardContent>
                    </Card>
                </Link>
                <Card className='w-full group rounded-2xl bg-muted p-2 overflow-hidden group-hover:black relative z-10 flex flex-col h-full gap-0 py-6 cursor-pointer'>
                    <CardHeader>
                        <CardTitle className='font-semibold tracking-wide text-center group-hover:scale-125 transition-transform duration-300 ease-in-out text-xl text-wrap h-min'>
                            {"Delete Seva"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className=' text-muted-foreground tracking-wide leading-relaxed flex items-center justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out '>
                        <Trash className='size-8' />
                    </CardContent>
                </Card>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2  ">
                {showEdit ? (
                    <EditSevaForm staffRole="STAFF" seva={data} />
                ) : (<div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
                    <div className="w-full flex items-center justify-between gap-6 ">
                        <DataDisplay title="Title" value={data.title} />
                        <DataDisplay title="Schedule" value={data.schedule} classNames="max-w-100" />
                    </div>
                    <SoftDataDisplay title="Description" value={data.description} />
                </div>)}


            </div>
        </div>
    );
}