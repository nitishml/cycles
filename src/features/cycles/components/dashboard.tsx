"use client"
import { DataError, QueryLoading } from "@/components/query-loaders"
import { useGetDailyCycle } from "../hooks/use-get-daily-cycle"
import { format } from "date-fns"
import { DiamondPlus, SquareMinus, SquarePlus } from "lucide-react"
import { useAddLedgerEntry } from "../hooks/use-add-ledger-entry"
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

export const CyclesDashboard = () => {
    const [date, setDate] = useState<Date>(new Date())

    const query = useGetDailyCycle({
        day: format(date, "yyyy-MM-dd")
    })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    // const result = countByTaskList(data.today, data.taskList);


    console.log(data.result)
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

            <div className="flex flex-col items-center justify-center gap-4">
                {data.result.map((i) => (
                    <NewTask
                        key={i.taskId}
                        title={i.taskTitle}
                        taskId={i.taskId}
                        date={format(date, "yyyy-MM-dd")}
                        count={i.count}
                    />
                ))}
            </div>


        </div>
    )
}

function NewTask({
    title,
    taskId,
    date,
    count,
}: {
    title: string;
    taskId: string;
    date: string;
    count: number;
}) {
    const mutation = useAddLedgerEntry()

    function onSubmit() {
        mutation.mutate({
            taskId: taskId,
            day: date,
            // count: 1
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Task Details Updated")

                    // better approach if its ok to show edit form after submitting

                    // this removes all cache and history
                    // window.location.reload()
                }
                else {
                    toast.error(data.message || "Please try again")
                }
            },
            onError: (data) => {
                toast.error(data.message || "Please try again")
            }

        })
    }
    return (
        <div className="w-full max-w-sm flex items-center justify-between border rounded-sm px-4 py-2">
            {title}


            <div className="flex items-center justify-end gap-4">
                <Button onClick={onSubmit}>
                    <SquarePlus />
                </Button>
                {count}
            </div>


        </div>
    )
}


