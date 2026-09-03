"use client"
import { DataError, QueryLoading } from "@/components/query-loaders"
import { useGetDailyCycle } from "../hooks/use-get-daily-cycle"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { DiamondPlus, SquareMinus, SquarePlus } from "lucide-react"

export const CyclesDashboard = () => {
    const d = new Date()
    const query = useGetDailyCycle({
        day: format(d, "yyyy-MM-dd")
    })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    const remainingTasks = data.taskList.filter(
        (task) => !data.today.some((t) => t.taskId === task.id)
    );
    return (
        <div className="w-full space-y-8">
            <div className="flex flex-col items-center justify-center gap-4">
                {data.today.map((i) => (
                    <ExistingTask key={i.id} title={i.taskTitle} ledgerId={i.id} count={i.count} />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                {remainingTasks.map((i) => (
                    <NewTask key={i.id} title={i.title} taskId={i.id} />
                ))}
            </div>
        </div>
    )
}

function NewTask({
    title,
    taskId,
}: {
    title: string;
    taskId: string;
}) {
    return (
        <div className="w-full max-w-sm flex items-center justify-center border rounded-sm">
            {title}
            <Button>
                <DiamondPlus />
            </Button>
        </div>
    )
}

function ExistingTask({
    title,
    ledgerId,
    count,
}: {
    title: string;
    ledgerId: string;
    count: number;
}) {
    return (
        <div className="w-full max-w-sm flex items-center justify-center border rounded-sm">
            {title}
            <Button>
                <SquarePlus />
            </Button>
            {count}
            <Button>
                <SquareMinus />
            </Button>

        </div>
    )
}