import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/get-session";
import { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { CollegeInfoCard } from "./college-info-card";

export const metadata: Metadata = {
    title: "Support",
    description: "User Support page",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect("/auth/login")

    return (
        <Page.Root>
            <Page.Main className="max-w-7xl">
                <CollegeInfoCard />
                <Separator className="w-full h-2 bg-foreground mb-4" />
                <div className='flex flex-col items-center justify-center  gap-4 my-4'>
                    <h3 className='font-semibold text-lg'>Still have questions?</h3>
                    <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-4'>
                        <Link href={'https://wa.me/+918123338735'}>
                            <div className='bg-muted p-4 w-full rounded-lg flex items-center justify-center gap-2 flex-col'>
                                <Phone />
                                <h3 className='font-semibold text-lg'>+918123338735</h3>
                                We are always happy to help!
                            </div>
                        </Link>

                        <Link href='mailto:support@growsharptech.com'>
                            <div className='bg-muted p-4 w-full rounded-lg flex items-center justify-center gap-2 flex-col'>
                                <Mail />
                                <h3 className='font-semibold text-lg'>support@growsharptech.com</h3>
                                Best way to get answer faster!
                            </div>
                        </Link>
                    </div>
                </div>
                <Separator className="w-full h-2 bg-foreground mt-6 mb-4" />
            </Page.Main>
        </Page.Root>
    );
}

