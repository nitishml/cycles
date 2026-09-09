"use client"
import { DataError, QueryLoading } from "@/components/query-loaders"
import { useGetDailyCycle } from "../hooks/use-get-daily-cycle"
import { format } from "date-fns"
import { SquarePlus } from "lucide-react"
import { useAddLedgerEntry } from "../hooks/use-add-ledger-entry"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useState } from "react"
import { AddLedgerEntryForm } from "./add-ledger-entry-form"
import { InPageHeader } from "@/components/layout/in-page-header"

type Props = {
    date: Date;
}

export const TaskLedgerDashboard = ({ date }: Props) => {

    const query = useGetDailyCycle({
        day: format(date, "yyyy-MM-dd")
    })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    // const result = countByTaskList(data.today, data.taskList);


    // console.log(data.result)
    return (
        <div className="w-full space-y-8">
            <InPageHeader label="Task Ledger" />
            <div className="flex flex-col items-center justify-center gap-4">
                {data.result.map((i) => (

                    <div key={i.taskId} className="w-full max-w-sm flex items-center justify-between border rounded-sm px-4 py-2">
                        {i.taskTitle}

                        <div className="flex items-center justify-end gap-4">
                            <AddLedgerEntryForm
                                key={i.taskId}
                                title={i.taskTitle}
                                taskId={i.taskId}
                                date={date}
                                count={i.count}
                            />
                            {i.count}
                        </div>

                    </div>
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
    date: Date;
    count: number;
}) {
    const mutation = useAddLedgerEntry()

    function onSubmit() {
        mutation.mutate({
            taskId: taskId,
            day: format(date, "yyyy-MM-dd"),
            completedAt: date,
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


