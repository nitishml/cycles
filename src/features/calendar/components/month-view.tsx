"use client"

import { useMemo } from "react";
import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import { cn } from "@/lib/utils";
import { DailyEvent } from "../types";

type Props = {
    events: DailyEvent[];
    date: Date;
}

export const MonthViewUI = ({ events, date }: Props) => {
    const eventsMap = useMemo(() => {
        const map = new Map();
        events.forEach(event => {
            const key = format(new Date(event.day), 'yyyy-MM-dd');
            map.set(key, event);
        });
        return map;
    }, [events]);

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(date)),
        end: endOfWeek(endOfMonth(date)),
    })
    const today = new Date()
    //console.log('events: ', events)
    return (
        <div className='grid grid-cols-7 h-full'>
            {days.map((day, dayIdx) => {
                const dayKey = format(day, 'yyyy-MM-dd');
                const dayEvent = eventsMap.get(dayKey);
                //console.log("day event", dayEvent)
                //console.log("day key", dayKey)

                const dayEvents: {
                    id: string;
                    title: string;
                    isHandled: boolean;
                }[] = dayEvent?.events || []

                const isToday = isSameDay(day, today)
                return (
                    <div
                        key={day.toString()}
                        className={cn(
                            'min-h-[120px] p-2 border relative',
                            !isSameMonth(day, date) && 'bg-muted/50',
                            // isHoliday && 'bg-rose-300'
                        )}
                    >
                        <time
                            dateTime={format(day, 'yyyy-MM-dd')}
                            className={cn(
                                'ml-auto text-sm flex items-center justify-between gap-2',
                                !isSameMonth(day, date) && 'text-muted-foreground'
                            )}
                        >
                            <p className={cn(isToday && " border-2 rounded-full p-1 border-foreground text-background bg-foreground")}>
                                {format(day, 'd')}
                            </p>
                            {dayEvents && (
                                dayEvents.map((i) => (
                                    <div
                                        key={i.id}
                                        className='hidden md:block text-sm text-foreground self-end'>
                                        {i.title}
                                    </div>
                                ))
                            )}

                        </time>
                    </div>
                );
            })}
        </div>
    );
}