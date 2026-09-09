import { Page } from "@/components/layout/page";
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getSession } from "@/features/auth/get-session";
import { RoutinesDashboard } from "@/features/routine/components/dashboard";

export const metadata: Metadata = {
    title: "Routines",
    description: "Routines",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');
    return (
        <Page.Root>
            <Page.Header title="Routines" />
            <Page.Main className="max-w-7xl space-y-4">
                <RoutinesDashboard />
            </Page.Main>
        </Page.Root>
    );
}