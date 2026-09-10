import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { BadgePlus, CalendarIcon, CircleCheckBig, Clock, } from "lucide-react";
import { completeTaskFormSchema } from "../types";
import { Textarea } from "@/components/ui/textarea";
import { useCompleteTask } from "../hooks/use-complete-task";
import { SoftDataDisplay } from "@/components/data-display-boxes";

type Props = {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    remarks?: string | null;
}
export const CompleteTaskForm = ({
    id,
    title,
    description,
    deadline,
    remarks
}: Props) => {
    const mutation = useCompleteTask()
    // const removeMutatiion = useRemoveTransaction()

    const [isLoading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof completeTaskFormSchema>>({
        resolver: zodResolver(completeTaskFormSchema) as any,
        defaultValues: {
            completedAt: new Date()
        }
    })

    function onSubmit(values: z.infer<typeof completeTaskFormSchema>) {
        setLoading(true)

        // console.log("at form submit", values)
        mutation.mutate({
            id,
            completedAt: values.completedAt,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Transaction Added to Account")
                    // router.push(`/${redirectRouter}/management-finance/receipts/manage/${data.data.txnId}?std=${studentId}`)
                }
                else {
                    toast.error(data.message || "Please try again")
                    setLoading(false)
                }
            },
            onError: (data) => {
                toast.error(data.message || "Please try again")
                setLoading(false)
            }

        })
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="view_item" className="" size={'lg'}>
                        <CircleCheckBig />
                    </Button>
                </DialogTrigger>
                <DialogContent className=" ">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                        <SoftDataDisplay title="remarks" value={remarks} />
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="  w-full mx-auto" id="audit-tx-form">
                        <FieldGroup className=" bg-muted p-4 md:p-8 rounded-md border border-b-2 border-muted-foreground flex flex-col items-center justify-center gap-8">

                            <div className="w-full">
                                <Controller
                                    name="completedAt"
                                    control={form.control}
                                    render={({ field, fieldState }) => {
                                        // derive the time string ("HH:mm") from the current field value
                                        const timeValue = field.value ? format(field.value, "HH:mm") : "00:00";

                                        const handleDateSelect = (selected: Date | undefined) => {
                                            if (!selected) {
                                                field.onChange(undefined);
                                                return;
                                            }
                                            // preserve whatever time was already set (or default to current time)
                                            const base = field.value ?? new Date();
                                            selected.setHours(base.getHours(), base.getMinutes(), 0, 0);
                                            field.onChange(selected);
                                        };

                                        const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                            const [hours, minutes] = e.target.value.split(":").map(Number);
                                            const base = field.value ? new Date(field.value) : new Date();
                                            base.setHours(hours, minutes, 0, 0);
                                            field.onChange(base);
                                        };

                                        return (
                                            <Field data-invalid={fieldState.invalid} className="flex flex-col">
                                                <FieldLabel htmlFor="dob">Completed At</FieldLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            id="dob"
                                                            type="button"
                                                            variant="outline"
                                                            aria-invalid={fieldState.invalid}
                                                            className={cn(
                                                                "w-full h-14 pl-3 border-[#dcdcdc] rounded-xl text-left text-foreground font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP p")
                                                            ) : (
                                                                <span>Pick a date & time</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0" align="center">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={handleDateSelect}
                                                            captionLayout="dropdown"
                                                        />
                                                        <div className="border-t p-3 flex items-center gap-2">
                                                            <Clock className="h-4 w-4 opacity-50" />
                                                            <Input
                                                                type="time"
                                                                value={timeValue}
                                                                onChange={handleTimeChange}
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        );
                                    }}
                                />
                            </div>
                            {/* <FieldGroup className="flex-row">
                                <Field>
                                    <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger>
                                            <Button variant="outline" id="date-picker-optional" className=" justify-between font-normal">
                                                {date ? format(date, "PPP") : "Select date"}
                                                <ChevronDownIcon data-icon="inline-end" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    field.onChange()
                                                    setOpen(false)
                                                }}
                                                captionLayout="dropdown"
                                                defaultMonth={date}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </Field>
                                <Field className="w-32">
                                    <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
                                    <Input
                                        type="time"
                                        id="time-picker-optional"
                                        step="1"
                                        defaultValue={format(date, "hh:mm aa")}
                                        className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </Field>
                            </FieldGroup> */}
                            <div className="w-full ">
                                <Controller
                                    name="remarks"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="remarks">
                                                Remarks
                                            </FieldLabel>
                                            <Textarea
                                                {...field}
                                                id="remarks"
                                                placeholder="Enter Remarks (optional)"
                                                aria-invalid={fieldState.invalid}
                                            />

                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                            </div>


                        </FieldGroup>
                    </form>
                    <DialogFooter>
                        <div className="w-full flex flex-col items-center justify-center gap-2">

                            <Button
                                size={'lg'}
                                type="submit"
                                variant={'default'}
                                className=" max-w-sm w-full h-14"
                                disabled={isLoading}
                                form="audit-tx-form"
                            >
                                SUBMIT
                            </Button>
                            <DialogClose asChild>
                                <Button
                                    size={'lg'}
                                    variant={'outline'}
                                    className=" max-w-[200px] w-full h-10"
                                    disabled={isLoading}
                                >
                                    Close
                                </Button>

                            </DialogClose>
                        </div>
                    </DialogFooter>
                </DialogContent>

            </Dialog>

        </div>
    );
}