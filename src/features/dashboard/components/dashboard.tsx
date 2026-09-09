"use client"
import { DataError, QueryLoading } from "@/components/query-loaders"
import { format } from "date-fns"
import { useGetDailyLedger } from "../hooks/use-get-daily-ledger"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const Dashboard = () => {
    const date = format(new Date(), "yyyy-MM-dd")
    const query = useGetDailyLedger({
        day: date
    })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    // const result = countByTaskList(data.today, data.taskList);


    // console.log("Result: ", data)
    return (
        <div className="w-full space-y-8">

            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-full flex items-center justify-between p-4 border shadow rounded-md">
                    <div className="flex flex-col items-start justify-start gap-4">
                        <h1 className="font-semibold text-xl">Life Cycles Manager</h1>
                        <span>{format(new Date(), "EEEE, do MMMM yyyy")}</span>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-start justify-center gap-4">
                    <div className="flex-1 border rounded-md shadow w-full">
                        <Table className="w-full">
                            <TableCaption>Today's Task Ledger</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Time</TableHead>
                                    <TableHead>Task</TableHead>
                                    {/* <TableHead>Frequency</TableHead> */}

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.tasks.map((i) => (
                                    <TableRow
                                        key={i.id}
                                        className="">
                                        <TableCell className="font-medium">{format(i.completedAt, "hh:mm aa")}</TableCell>
                                        <TableCell>{i.title}</TableCell>
                                        {/* <TableCell>{i.frequency}</TableCell> */}
                                    </TableRow>
                                ))}
                                {/* <TableRow>
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="md:max-w-sm  border rounded-md shadow w-full">
                        <Table className="w-full">
                            <TableCaption>Today's Routine Ledger</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Time</TableHead>
                                    <TableHead>Routine</TableHead>
                                    {/* <TableHead>Frequency</TableHead> */}

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.routines.map((i) => (
                                    <TableRow
                                        key={i.id}
                                        className="">
                                        <TableCell className="font-medium">{format(i.completedAt, "hh:mm aa")}</TableCell>
                                        <TableCell>{i.title}</TableCell>
                                        {/* <TableCell>{i.frequency}</TableCell> */}
                                    </TableRow>
                                ))}
                                {/* <TableRow>
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </div>
        </div>
    )
}



