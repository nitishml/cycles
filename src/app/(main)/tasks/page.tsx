import { Page } from "@/components/layout/page";
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getSession } from "@/features/auth/get-session";
import { TasksDashboard } from "@/features/tasks/components/dashboard";

export const metadata: Metadata = {
    title: "Tasks",
    description: "Tasks",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');
    return (
        <Page.Root>
            <Page.Header title="Tasks" />
            <Page.Main className="max-w-7xl space-y-4">
                <TasksDashboard />
            </Page.Main>
        </Page.Root>
    );
}