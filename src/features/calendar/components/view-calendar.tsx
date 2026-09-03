"use client"

import { useState } from "react";
import { CalendarClock, CalendarIcon, ChartNoAxesGantt, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatMonth } from "@/lib/utils";
import {
    addMonths,
    subMonths
} from 'date-fns';
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataError, QueryLoading } from "@/components/query-loaders";
import Link from "next/link";
import { MonthViewUI } from "./month-view";
import { useGetMonthlyCalendar } from "../hooks/use-get-monthly";

export const ViewCalendar = () => {
    const [date, setDate] = useState(new Date());

    const query = useGetMonthlyCalendar({
        month: date.getMonth(),
        year: date.getFullYear(),
    })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />

    const data = query.data.data

    const navigateDate = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setDate(subMonths(date, 1));
        } else {
            setDate(addMonths(date, 1));
        }
    };

    return (
        <div className="w-full space-y-2">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-6">
                <Button variant='default' size={'lg'} className="order-1 md:order-1 h-14 w-[200px]" asChild>
                    <Link href={"#"}>
                        <CalendarClock />
                        Weekly Timetable
                    </Link>
                </Button>
                <div className='order-3 md:order-2 flex h-14 items-center justify-center gap-2  p-2 px-4 bg-foreground text-background rounded-md'>
                    <Button variant='outline' size='icon' onClick={() => navigateDate('prev')}>
                        <ChevronLeft className='h-4 w-4 text-foreground stroke-3' />
                    </Button>

                    <div className="px-2 flex items-center justify-center gap-2">
                        <CalendarIcon className='size-5' />
                        {formatMonth(date)}
                    </div>
                    <Button variant='outline' size='icon' onClick={() => navigateDate('next')}>
                        <ChevronRight className='h-4 w-4 text-foreground stroke-3' />
                    </Button>
                </div>
                <Button variant='default' size={'lg'} className="order-2 md:order-3 h-14 w-[200px]" asChild>
                    <Link href="#">
                        <ChartNoAxesGantt />
                        Event Calendar
                    </Link>
                </Button>
            </div>
            <div className='flex flex-col h-full'>
                <div className='grid grid-cols-7 border-b'>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className='px-2 py-4 text-sm font-medium text-muted-foreground'>
                            {day}
                        </div>
                    ))}
                </div>
                <ScrollArea className='flex-1'>
                    <MonthViewUI events={data.events} date={date} />
                </ScrollArea>
            </div>
        </div>
    );
}