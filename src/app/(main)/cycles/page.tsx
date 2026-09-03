import { Page } from "@/components/layout/page";
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getSession } from "@/features/auth/get-session";
import { ViewCalendar } from "@/features/calendar/components/view-calendar";

export const metadata: Metadata = {
    title: "Cycles",
    description: "Cycles",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');
    return (
        <Page.Root>
            <Page.Header title="Cycles" />
            <Page.Main className="max-w-7xl space-y-4">
                {/* <ViewCalendar /> */}
            </Page.Main>
        </Page.Root>
    );
}