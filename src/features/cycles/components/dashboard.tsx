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

            <Field className="max-w-96 w-full mx-auto">
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
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            defaultMonth={date}
                            captionLayout="dropdown"
                            required
                        />
                    </PopoverContent>
                </Popover>
            </Field>

            <div className="w-full grid grid-cols-1 md:grid-cols-2">
                <RoutineLedgerDashboard date={date} />
                <TaskLedgerDashboard date={date} />
            </div>

        </div>
    )
}



