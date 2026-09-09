"use client"
import { DataError, QueryLoading } from "@/components/query-loaders"
import { useGetDailyCycle } from "../hooks/use-get-daily-cycle"
import { format } from "date-fns"
import { Dispatch, SetStateAction } from "react"
import { AddLedgerEntryForm } from "./add-ledger-entry-form"
import { InPageHeader } from "@/components/layout/in-page-header"

type Props = {
    date: Date;
}

export const RoutineLedgerDashboard = ({ date }: Props) => {

    const query = useGetDailyCycle({
        day: format(date, "yyyy-MM-dd")
    })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    // const result = countByRoutineList(data.today, data.routineList);


    // console.log(data.result)
    return (
        <div className="md:max-w-sm w-full space-y-8">
            <InPageHeader label="Routine Ledger" />


            <div className="flex flex-col items-center justify-center gap-4">
                {data.result.map((i) => (

                    <div key={i.routineId} className="w-full max-w-sm flex items-center justify-between border rounded-sm px-4 py-2">
                        {i.routineTitle}

                        <div className="flex items-center justify-end gap-4">
                            <AddLedgerEntryForm
                                key={i.routineId}
                                title={i.routineTitle}
                                routineId={i.routineId}
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


