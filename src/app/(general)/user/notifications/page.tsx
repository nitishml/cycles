
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import NotificationPreferences from "@/features/user/components/notifications-table";
import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Notifications",
    description: "User Notifications page",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect("/auth/login")

    return (
        <Page.Root>
            <Page.Main className="max-w-7xl">
                <NotificationPreferences />
                <Separator className="w-full h-2 bg-foreground mt-6 mb-4" />

            </Page.Main>
        </Page.Root>
    );
}

