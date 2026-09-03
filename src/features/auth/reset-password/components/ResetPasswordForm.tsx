"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { PasswordInput } from "@/components/ui/password-input";
import { resetPasswordSchema } from "../types";
import { useResetPassword } from "../hooks/useResetPassword";
import { PasswordStrengthInput } from "../../components/password-input";

type Props = {
    token: string | undefined;
    userId: string;
}
export const ResetPasswordForm = ({ token, userId }: Props) => {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter()
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema) as any,
    })
    const mutation = useResetPassword()

    if (!token) return (
        <div className="mt-10 grid grid-cols-1 gap-6">
            <div className="w-full flex flex-col items-center justify-center py-20 space-y-3">
                <Skeleton className="h-[125px] w-[300px] rounded-xl" />
                <div className="space-y-2 flex flex-col items-center justify-center">
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-8 w-[300px]" />
                </div>
            </div>
        </div>
    )

    function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        if (!token) return
        setLoading(true)
        mutation.mutate(
            {
                newPassword: values.newPassword,
                token,
                userId: userId
            },
            {
                onError: (data) => {
                    setLoading(false);
                    toast.error("Error", {
                        description: "Please Try Again.",
                    });
                },
                onSuccess: (data) => {
                    if (!data.success) {
                        toast.error("Error", {
                            description: "Please Try Again.",
                        });
                        setLoading(false);
                    } else {
                        toast.success("Password Reset Success", {
                            description: "Please login with your new password",
                        });
                        router.push("/auth/login");
                        router.refresh()
                    }
                },
            }
        );
    };


    return (
        <Card className="mx-auto w-full max-w-md bg-muted backdrop-blur-xl shadow-2xl border-2 border-[#fdbe33] rounded-xl ">
            <CardHeader>
                <CardTitle>Set New Password</CardTitle>

            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
                    <FieldGroup className="">


                        <div className="w-full grid grid-cols-1 gap-2">
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
            </CardContent>

        </Card>
    );
}