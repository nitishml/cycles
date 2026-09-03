import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { AddSevaForm } from "@/features/seva/components/add-seva-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Create New Seva",
    description: "Create New Seva Page | Staff | TMS",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Create New Seva" role="STAFF" />
            <Page.Main className=" max-w-7xl pb-20 ">
                <AddSevaForm staffRole="STAFF" />
            </Page.Main>
        </Page.Root>

    );
}