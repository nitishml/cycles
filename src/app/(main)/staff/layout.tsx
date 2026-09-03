import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import { UnauthorizedPage } from "@/components/unauthorized-page";
import { StaffSidebar } from "./staff-sidebar";
import { MobileFooter } from "./mobile-layout";
import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/get-session";
import { validateRole } from "@/features/auth/role-guard";

export default async function StaffLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    const session = await getSession();
    if (!session) return redirect("/auth/login")

    // const { authorized } = await validateRole(["STAFF"]);
    // if (!authorized) return <UnauthorizedPage />;

    return (
        <SidebarProvider defaultOpen={defaultOpen} className="min-h-screen w-full h-full ">
            <StaffSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
            <MobileFooter />
        </SidebarProvider>
    );
}

