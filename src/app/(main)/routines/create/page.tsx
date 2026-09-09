import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { AddRoutineForm } from "@/features/routine/components/add-routine-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Create New Routine",
    description: "Create New Routine Page",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Create New Routine" />
            <Page.Main className=" max-w-7xl pb-20 ">
                <AddRoutineForm />
            </Page.Main>
        </Page.Root>

    );
}