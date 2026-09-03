import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/get-session";
import { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { ChangePasswordForm } from "@/features/user/components/change-password-form";
import { MultiFactorAuth } from "@/features/user/components/multi-factor-auth";
import { Separator } from "@/components/ui/separator";
import { UserDeviceList } from "@/features/user/components/user-device-list";

export const metadata: Metadata = {
    title: "Settings",
    description: "User Settings page",
};

export default async function AppPage() {
    const session = await getSession();

    if (!session)
        return redirect("/auth/login")

    return (
        <Page.Root>
            <Page.Main className="max-w-7xl px-8">
                <ChangePasswordForm />
                <Separator className="w-full h-2 bg-foreground mt-6 mb-4" />
                <MultiFactorAuth />
                <Separator className="w-full h-2 bg-foreground mb-4" />
                <UserDeviceList />
                <Separator className="w-full h-2 bg-foreground mt-6 mb-4" />
            </Page.Main>
        </Page.Root>
    );
}
