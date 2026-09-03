"use client"

import { DataError, QueryLoading } from "@/components/query-loaders";
import { TaskListTable } from "./task-list-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useGetTasks } from "../hooks/use-get-tasks";


export function TasksDashboard() {
    const query = useGetTasks()

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    return (

        <div className="w-full space-y-4">
            {/* <TeacherStatistics data={data.teachers} /> */}
            <Button className="" size={'lg'} asChild>
                <Link href="/tasks/create">
                    <PlusCircle /> Create New
                </Link>
            </Button>
            <TaskListTable tasks={data.tasks} />
        </div>


    );
}