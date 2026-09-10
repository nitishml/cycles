"use client"
import { DataError, QueryLoading } from "@/components/query-loaders"
import { format } from "date-fns"
import { DiamondPlus, SquareMinus, SquarePlus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { TaskLedgerDashboard } from "../task-ledger/components/dashboard"
import { RoutineLedgerDashboard } from "../routine-ledger/components/dashboard"

export const CyclesDashboard = () => {
    const [date, setDate] = useState<Date>(new Date())


    // const result = countByTaskList(data.today, data.taskList);


    // console.log(data.result)
    return (
        <div className="w-full space-y-8">

            <Field className="w-[300px] mx-auto">
                <FieldLabel htmlFor="date-picker-simple">Choose Date</FieldLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker-simple"
                            className="justify-start font-normal"
                        >
                            {date ? format(date, "PPP") : <span>Set Starting Date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-[300px] w-full p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            defaultMonth={date}
                            captionLayout="dropdown"
                            required
                            className="w-full"
                        />
                    </PopoverContent>
                </Popover>
            </Field>

            <div className="w-full flex flex-col md:flex-row items-start justify-center gap-8">
                <TaskLedgerDashboard date={date} />
                <RoutineLedgerDashboard date={date} />

            </div>

        </div>
    )
}



