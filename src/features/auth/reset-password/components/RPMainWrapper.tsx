'use client'
import { DataError, QueryLoading } from '@/components/query-loaders'
import { useSearchParams } from 'next/navigation'

import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { RefreshCwIcon } from "lucide-react"
import { useState } from 'react';
import { ResetPasswordForm } from './ResetPasswordForm';
import { useRPVerifyOTP } from '../hooks/useVerifyOtp';

type Props = {

}
export const RPMainWrapper = ({ }: Props) => {
    const searchParams = useSearchParams()
    const mutation = useRPVerifyOTP()
    const [isLoading, setLoading] = useState(false);
    const [value, setValue] = useState<undefined | string>(undefined)
    const [verified, setVerified] = useState(false)
    const [newToken, setNewToken] = useState<undefined | string>(undefined)

    const identifier = searchParams.get('identifier')
    const id = searchParams.get('id')

    if (!identifier || !id) return <DataError />

    if (isLoading) return <QueryLoading />

    const onSubmit = async () => {
        if (value === undefined) return

        setLoading(true)
        mutation.mutate(
            {
                userId: id,
                identifier,
                value
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
                        setLoading(false);
                        toast.error("Error", {
                            description: "Please Try Again.",
                        });
                    } else {
                        toast.success("OTP Verified", {
                            description: "Please set you new password",
                        });
                        setLoading(false);
                        setVerified(true);
                        setNewToken(data.data?.token || "token")
                    }
                },
            }
        );
    };
    return (
        <div className="relative w-full h-full flex-1 flex items-center justify-center pt-10 md:pt-5 pb-5">
            <Toaster
                position="top-center"
                richColors
                closeButton
            />
            {verified ? (
                <ResetPasswordForm token={newToken} userId={id} />
            ) : (
                <div className="w-[90%] sm:w-[340px] md:w-[380px]">
                    <Card className="mx-auto w-full max-w-md bg-muted backdrop-blur-xl shadow-2xl border-2 border-[#fdbe33] rounded-xl ">
                        <CardHeader>
                            <CardTitle>Verify Ownership</CardTitle>
                            <CardDescription>
                                Enter the OTP we sent to your whatsapp number:{" "}
                                <span className="font-medium">{identifier}</span>.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Field >
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="otp-verification">
                                        OTP
                                    </FieldLabel>
                                    <Button variant="outline" size="sm">
                                        <RefreshCwIcon />
                                        Resend Code
                                    </Button>
                                </div>
                                <InputOTP
                                    maxLength={6}
                                    id="otp-verification"
                                    value={value}
                                    onChange={(value) => setValue(value)}
                                    required
                                >
                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator className="mx-2" />
                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </Field>
                        </CardContent>
                        <CardFooter>
                            <Field>
                                <Button type="submit" className="w-full" disabled={isLoading} onClick={onSubmit}>
                                    Verify
                                </Button>

                            </Field>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}