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
    cn
} from "@/lib/utils"
import {
    Button
} from "@/components/ui/button"


import { QueryLoading } from "@/components/query-loaders"

import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field"
import { changePasswordSchema } from "../types"
import { useChangePassword } from "../hooks/use-change-password"
import { PasswordInput } from "@/components/ui/password-input"
import { PasswordStrengthInput } from "@/features/auth/components/password-input"

export function ChangePasswordForm() {

    const [isLoading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema) as any,
    })
    const mutation = useChangePassword()

    function onSubmit(values: z.infer<typeof changePasswordSchema>) {
        //console.log("values:", values)
        setLoading(true)
        mutation.mutate({
            newPassword: values.newPassword,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Password Changed")
                    setLoading(false)
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
    if (isLoading) return <QueryLoading />;
    return (
        <div className="w-full flex-1 flex flex-col gap-8 items-start justify-center">
            <h1 className="text-2xl font-semibold">Change password</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
                <FieldGroup className="">

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Controller
                            name="newPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="newPassword">
                                        New Password
                                    </FieldLabel>
                                    <PasswordStrengthInput
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm Password
                                    </FieldLabel>
                                    <PasswordInput
                                        {...field}
                                        id="confirmPassword"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Re-enter new password"
                                        className="pe-9 h-14 text-base text-foreground rounded-xl"
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
                        variant={'filledSecondary'}
                        className=" max-w-sm w-full"
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


