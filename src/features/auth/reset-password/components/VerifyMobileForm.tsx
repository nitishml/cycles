"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useRPVerifyMobile } from "../hooks/useVerifyMobile";

export function VerifyMobileForm() {
  const [mobile, setMobile] = useState("");
  const mutation = useRPVerifyMobile()
  const router = useRouter()
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true)
    mutation.mutate(
      { mobile },
      {
        onError: (data) => {
          setLoading(false);
          toast.error("Error", {
            description: "Please Try Again.",
          });
        },
        onSuccess: (data) => {
          //console.log("data: ", data)
          if (!data.success) {
            if (data.errorType === "NO USER") {
              toast.success("Success", {
                description: "If an active account exists, an OTP has been sent to the WhatsApp contact along with the reset link.",
              });
            }
            else {
              toast.error("Error", {
                description: "Please Try Again",
              });
            }


            setLoading(false);
          } else {
            toast.success("OTP has been sent", {
              description: "Please check your registered whatsapp contact",
            });
            router.push(`/auth/reset-password/otp?identifier=${data.data?.identifier}&id=${data.data?.id}`);
          }
        },
      }
    );
  };

  if (isLoading) return (
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

  return (
    <div className="relative w-full h-full flex-1 flex items-center justify-center pt-10 md:pt-5 pb-5">
      <Toaster
        position="top-center"
        richColors
        closeButton
      />
      <div className="w-[90%] sm:w-[340px] md:w-[380px]">
        <Card className="bg-muted backdrop-blur-xl shadow-2xl border border-[#fdbe33] rounded-xl p-5 md:p-6">

          <CardHeader className="space-y-2 px-1 sm:px-2">
            <div className="flex items-center justify-center">
              <CardTitle className="text-xl md:text-2xl font-semibold text-center">
                Need to reset your password?
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">

            <form onSubmit={onSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-1">
                <Label className="text-sm sm:text-base">Enter contact number</Label>
                <div className="relative">
                  <Input
                    placeholder="Registered Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="peer pe-10 text-sm sm:text-base"
                  />
                  <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <Button
                variant="filledSecondary"
                className="w-full py-2 sm:py-3 text-sm sm:text-base"
                disabled={isLoading}>
                Submit
              </Button>
            </form>

          </CardContent>

        </Card>
      </div>
    </div>
  );
}
