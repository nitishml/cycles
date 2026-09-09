"use client"

import { DataDisplay, SoftDataDisplay } from "@/components/data-display-boxes";
import { DataError, QueryLoading } from "@/components/query-loaders";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaEdit } from "react-icons/fa";
import { CheckCircle, Ticket, XCircle } from "lucide-react";
import { TiCancel } from "react-icons/ti";

import Link from "next/link";
import { useGetRoutine } from "../hooks/use-get-routine";
import { EditRoutineForm } from "./edit-routine-form";
import { DeactivateRoutineCard } from "./deactivate-routine-card";
import { cn } from "@/lib/utils";
import { ActivateRoutineCard } from "./activate-routine-card";

type Props = {
    routineId: string
}
export const ViewRoutineDetails = ({ routineId }: Props) => {
    const [showEdit, setShowEdit] = useState(false)
    const query = useGetRoutine({
        routineId
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
                <Link className="w-full group" href={`/routines/manage/${routineId}/cycles`}>
                    <Card className=' rounded-2xl bg-muted p-2 overflow-hidden group-hover:black relative z-10 flex flex-col h-full gap-0 py-6 cursor-pointer'>
                        <CardHeader>
                            <CardTitle className='font-semibold tracking-wide text-center group-hover:scale-125 transition-transform duration-300 ease-in-out text-xl text-wrap h-min'>
                                {"Cycles"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className=' text-muted-foreground tracking-wide leading-relaxed flex items-center justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out '>
                            <Ticket className='size-8' />
                        </CardContent>
                    </Card>
                </Link>
                {data.isActive ? (<DeactivateRoutineCard routineId={routineId} />) : (<ActivateRoutineCard routineId={routineId} />)}
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2  ">
                {showEdit ? (
                    <EditRoutineForm routine={data} />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
                        <div className="w-full flex items-center justify-between gap-10">
                            <div className='flex flex-col items-center justify-center'>
                                <div className={cn('h-7 w-30  text-white rounded-md rounded-b-none text-center text-sm py-1',
                                    data.isActive ? "bg-blue-700" : "bg-rose-700"
                                )}>
                                    {"Active?"}
                                </div>
                                <div className={cn('h-10 w-30 text-white rounded-md rounded-t-none flex items-center justify-center', data.isActive ? "bg-blue-500" : "bg-rose-500"

                                )}>
                                    {data.isActive ? (<CheckCircle />) : (<XCircle />)}
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <div className='flex flex-col items-center justify-center'>
                                    <div className={cn('h-7 w-24  text-white rounded-md rounded-b-none text-center text-sm py-1',
                                        data.isPinned ? "bg-blue-700" : "bg-blue-700"
                                    )}>
                                        {"Pinned?"}
                                    </div>
                                    <div className={cn('h-10 w-24 text-white rounded-md rounded-t-none flex items-center justify-center', data.isPinned ? "bg-blue-500" : "bg-rose-700"

                                    )}>
                                        {data.isPinned ? (<CheckCircle />) : (<XCircle />)}
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <div className={cn('h-7 w-24  text-white rounded-md rounded-b-none text-center text-sm py-1',
                                        data.isOneTime ? "bg-blue-700" : "bg-blue-700"
                                    )}>
                                        {"One Time?"}
                                    </div>
                                    <div className={cn('h-10 w-24 text-white rounded-md rounded-t-none flex items-center justify-center', data.isOneTime ? "bg-blue-500" : "bg-rose-700"

                                    )}>
                                        {data.isOneTime ? (<CheckCircle />) : (<XCircle />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between gap-6 ">
                            <DataDisplay title="Title" value={data.title} />
                            {/* <DataDisplay title="Schedule" value={data.schedule} classNames="max-w-100" /> */}
                        </div>
                        <SoftDataDisplay title="Description" value={data.description} />
                        <SoftDataDisplay title="Frequency" value={data.frequency} />
                    </div>
                )}


            </div>
        </div>
    );
}