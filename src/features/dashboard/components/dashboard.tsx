"use client"
import { DataError, QueryLoading } from "@/components/query-loaders"
import { format, formatDistance } from "date-fns"
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
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Ellipsis } from "lucide-react"
import Link from "next/link"

export const Dashboard = () => {
    const [date, setDate] = useState<Date>(new Date())
    const query = useGetDailyLedger({
        day: format(date, "yyyy-MM-dd")
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
                <div className="w-full flex flex-col md:flex-row items-start justify-center gap-4">
                    <div className="flex-1 border rounded-md shadow w-full">
                        <Table className="w-full">
                            <TableCaption>Today's Open Tasks</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task</TableHead>
                                    <TableHead className="w-[100px]">Deadline</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.tasks.map((i) => (
                                    <TableRow
                                        key={i.id}
                                        className="">
                                        <TableCell>{i.title}</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col items-end justify-end">
                                                <p>{format(i.deadline, "hh:mm aa | dd/MM")}</p>
                                                <p>{formatDistance(i.deadline, date, { addSuffix: true })}</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}

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
                                    <TableHead className="w-[25px]">...</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.routines.map((i) => (
                                    <TableRow
                                        key={i.id}
                                        className="">
                                        <TableCell className="font-medium">{format(i.completedAt, "hh:mm aa")}</TableCell>
                                        <TableCell>{i.title}</TableCell>
                                        <TableCell><Link href={`/cycles/routine/manage/${i.id}`}><Ellipsis /></Link></TableCell>
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



