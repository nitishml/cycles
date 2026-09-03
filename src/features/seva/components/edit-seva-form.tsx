"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DevTool } from "@hookform/devtools";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { editSevaFormSchema, SevaListItem } from "../types";
import { InPageHeader } from "@/components/layout/in-page-header";
import { useEditSeva } from "../hooks/use-edit-seva";

type Props = {
    seva: SevaListItem;
    staffRole: "STAFF" | "DIRECTOR";
}
export const EditSevaForm = ({ seva, staffRole }: Props) => {
    const redirectRouter = staffRole === "STAFF" ? "staff" : "director"

    const mutation = useEditSeva()
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof editSevaFormSchema>>({
        resolver: zodResolver(editSevaFormSchema) as any,
        defaultValues: {
            title: seva.title,
            description: seva.description,
            schedule: seva.schedule || "",
        }
    })

    function onSubmit(values: z.infer<typeof editSevaFormSchema>) {
        console.log("values:", values)
        setLoading(true)
        mutation.mutate({
            ...values,
            id: seva.id,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Seva Details Updated")

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
            <InPageHeader label="Edit Seva Details" />
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
                                        placeholder="Enter Seva Description"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </div>
                    <div className="w-full grid grid-cols-1  gap-2">
                        <Controller
                            name="schedule"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="schedule">
                                        Schedule
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="schedule"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
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