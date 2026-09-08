"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DevTool } from "@hookform/devtools";
import { editTaskFormSchema, TaskDetailsDTO } from "../types";
import { InPageHeader } from "@/components/layout/in-page-header";
import { useEditTask } from "../hooks/use-edit-task";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { taskFrequenceEnum } from "@/db/schema";

type Props = {
    task: TaskDetailsDTO;
}
export const EditTaskForm = ({ task }: Props) => {

    const mutation = useEditTask()
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof editTaskFormSchema>>({
        resolver: zodResolver(editTaskFormSchema) as any,
        defaultValues: {
            title: task.title,
            description: task.description,
            isPinned: task.isPinned,
            isOneTime: task.isOneTime,
            frequency: task.frequency,
        }
    })

    function onSubmit(values: z.infer<typeof editTaskFormSchema>) {
        console.log("values:", values)
        setLoading(true)
        mutation.mutate({
            ...values,
            id: task.id,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Task Details Updated")

                    // better approach if its ok to show edit form after submitting
                    router.refresh()

                    // this removes all cache and history
                    // window.location.reload()
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
        <div className="w-full flex-1 flex flex-col gap-8 items-start justify-center">
            <InPageHeader label="Edit Task Details" />
            <form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-6xl  w-full mx-auto">
                <FieldGroup>
                    <div className="w-full grid grid-cols-1  gap-2">
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="title">
                                        Title*
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="title"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="w-full grid grid-cols-1 gap-2">

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="description">
                                        Description*
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="description"
                                        placeholder="Enter Task Description"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </div>
                    <div className="w-full grid grid-cols-2  gap-2">
                        <Controller
                            name="isPinned"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <FieldSet data-invalid={fieldState.invalid}>

                                        <FieldGroup data-slot="checkbox-group">
                                            <Field orientation="horizontal">
                                                <Checkbox
                                                    id="isPinned"
                                                    name={field.name}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                <FieldLabel
                                                    htmlFor="isPinned"
                                                    className="font-normal"
                                                >
                                                    Pinned?
                                                </FieldLabel>

                                            </Field>
                                            <FieldDescription>
                                                keep the task at the top of the list
                                            </FieldDescription>
                                        </FieldGroup>
                                    </FieldSet>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </div>
                            )}
                        />
                        <Controller
                            name="isOneTime"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <FieldSet data-invalid={fieldState.invalid}>

                                        <FieldGroup data-slot="checkbox-group">
                                            <Field orientation="horizontal">
                                                <Checkbox
                                                    id="isOneTime"
                                                    name={field.name}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                <FieldLabel
                                                    htmlFor="isOneTime"
                                                    className="font-normal"
                                                >
                                                    One Time?
                                                </FieldLabel>
                                            </Field>
                                            <FieldDescription>
                                                Non recurring task
                                            </FieldDescription>
                                        </FieldGroup>
                                    </FieldSet>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </div>
                            )}
                        />
                    </div>
                    <div className="w-full grid grid-cols-1 gap-2 max-w-sm">
                        <Controller
                            name="frequency"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor="form-rhf-select-language">
                                            Frequency
                                        </FieldLabel>

                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </FieldContent>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id="form-rhf-select-language"
                                            aria-invalid={fieldState.invalid}
                                            className="min-w-[120px]"
                                        >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">

                                            {taskFrequenceEnum.enumValues.map((i) => (
                                                <SelectItem key={i} value={i}>{i}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        />


                    </div>
                    <Button
                        size={'lg'}
                        type="submit"
                        variant={'default'}
                        className="mx-auto max-w-sm w-full"
                        disabled={isLoading}
                    >
                        SUBMIT
                    </Button>
                </FieldGroup>
            </form>

            <DevTool control={form.control} />
        </div>
    );
}