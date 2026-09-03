import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { SevaDashboard } from "@/features/seva/components/dashboard";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Seva",
    description: "Seva Dashboard | Staff | TMS",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Seva" role="STAFF" />
            <Page.Main className=" max-w-7xl pb-20 ">
                <SevaDashboard staffRole="STAFF" />
            </Page.Main>
        </Page.Root>

    );
}