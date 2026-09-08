import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { ProfileDataStaff } from "@/features/user/components/profile-data";

export const metadata: Metadata = {
    title: "Account",
    description: "User Account page",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect("/auth/login")
    return (
        <Page.Root>
            <Page.Main className="max-w-7xl space-y-8">
                <ProfileDataStaff />
                <div className="w-full flex items-center justify-center"><LogoutButton /></div>
                <Separator className="w-full h-2 bg-foreground mt-6 mb-4" />
            </Page.Main>
        </Page.Root>
    );
}
