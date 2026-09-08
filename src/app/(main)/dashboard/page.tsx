import { Page } from "@/components/layout/page";
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getSession } from "@/features/auth/get-session";
import { Dashboard } from "@/features/dashboard/components/dashboard";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');
    return (
        <Page.Root>
            <Page.Header title="Dashboard" />
            <Page.Main className="max-w-7xl space-y-4">
                <Dashboard />
            </Page.Main>
        </Page.Root>
    );
}