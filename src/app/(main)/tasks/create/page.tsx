import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { AddTaskForm } from "@/features/tasks/components/add-task-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Create New Task",
    description: "Create New Task Page",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Create New Task" />
            <Page.Main className=" max-w-7xl pb-20 ">
                <AddTaskForm />
            </Page.Main>
        </Page.Root>

    );
}