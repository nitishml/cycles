import { CollegeBanner } from "@/components/college-banner";
import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
    title: "Dashboard",
    description: "Staff home dashboard",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Dashboard" role="STAFF" />
            <Page.Main className=" max-w-7xl pb-20 space-y-4">
                <CollegeBanner />
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {/* <ProfileCard role="ADMIN-OFFICE" />
                    <NoticeBoard /> */}
                </div>


            </Page.Main>
        </Page.Root>

    );
}