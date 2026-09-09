"use client"

import { DataError, QueryLoading } from "@/components/query-loaders";
import { RoutineListTable } from "./routine-list-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useGetRoutines } from "../hooks/use-get-routines";


export function RoutinesDashboard() {
    const query = useGetRoutines()

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    return (

        <div className="w-full space-y-4">
            {/* <TeacherStatistics data={data.teachers} /> */}
            <Button className="" size={'lg'} asChild>
                <Link href="/routines/create">
                    <PlusCircle /> Create New
                </Link>
            </Button>
            <RoutineListTable routines={data.routines} />
        </div>


    );
}