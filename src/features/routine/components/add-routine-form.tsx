"use client"
import {
    useState,
} from "react"
import {
    toast
} from "sonner"
import {
    Controller,
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"

import {
    Button
} from "@/components/ui/button"

import {
    Input
} from "@/components/ui/input"
import { QueryLoading } from "@/components/query-loaders"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { InPageHeader } from "@/components/layout/in-page-header"
import { addRoutineFormSchema } from "../types"
import { useAddRoutine } from "../hooks/use-add-routine"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { routineFrequenceEnum } from "@/db/schema"


export function AddRoutineForm() {

    const mutation = useAddRoutine()
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof addRoutineFormSchema>>({
        resolver: zodResolver(addRoutineFormSchema) as any,
        defaultValues: {
            frequency: "DAILY"
        }
    })

    function onSubmit(values: z.infer<typeof addRoutineFormSchema>) {
        //console.log("values:", values)
        setLoading(true)
        mutation.mutate({
            title: values.title,
            description: values.description,
            frequency: values.frequency,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Routine Created")
                    router.push(`/routines/manage/${data.data.id}`)
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
    if (isLoading || mutation.isPending) return <QueryLoading />;
    return (
        <div className="w-full flex-1 flex flex-col gap-8 items-start justify-center">
            <InPageHeader label="Add Routine Form" />
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
                                        placeholder="Enter Routine Description"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
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

                                            {routineFrequenceEnum.enumValues.map((i) => (
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

            {/* <DevTool control={form.control} /> */}
        </div>
    )
}

