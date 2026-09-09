"use client"
import { DataError, QueryLoading } from "@/components/query-loaders"
import { useGetDailyCycle } from "../hooks/use-get-daily-cycle"
import { format, formatDistance } from "date-fns"
import { InPageHeader } from "@/components/layout/in-page-header"
import { CompleteTaskForm } from "./complete-task-form"

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
    const open = data.result.filter((i) => i.status === "OPEN")

    const completed = data.result.filter((i) => i.status === "COMPLETE")
    return (
        <div className="flex-1 space-y-8">
            <InPageHeader label="Task Ledger" />
            <div className="flex flex-col items-center justify-center gap-4 border-2 border-cyan-500 rounded-md p-4">
                {open.map((i) => (

                    <div key={i.taskId} className="w-full flex items-center justify-between border border-foreground rounded-sm px-4 py-2">
                        {i.title}

                        <div className="flex items-center justify-end gap-4">
                            <CompleteTaskForm
                                id={i.id}
                                title={i.title}
                                description={i.description}
                                deadline={i.deadline}
                            />
                            <div className="flex flex-col items-end justify-end">
                                <p>{format(i.deadline, "hh:mm aa | dd/MM")}</p>
                                <p>{formatDistance(i.deadline, date, { addSuffix: true })}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-4 border-2 border-emerald-500 rounded-md p-4 ">
                {completed.map((i) => (

                    <div key={i.taskId} className="w-full flex items-center justify-between border border-muted-foreground rounded-sm px-4 py-2">
                        {i.title}

                        {i.completedAt && (
                            <div className="flex flex-col items-end justify-end">
                                <p>{format(i.deadline, "hh:mm aa | dd/MM")}</p>
                                <p>{formatDistance(i.deadline, date, { addSuffix: true })}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}



