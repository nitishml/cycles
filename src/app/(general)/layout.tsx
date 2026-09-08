
import { GeneralFooter } from "@/components/layout/GeneralFooter";
import { GeneralNav } from "@/components/layout/GeneralNav";
// import { getSession } from "@/features/auth/get-session";
import { redirect } from "next/navigation";

export default async function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getSession();
  // if (!session) return redirect("/auth/login")
  return (
    <div className="min-h-screen w-full h-full flex flex-col">
      <GeneralNav />
      <div className="flex-1">
        {children}
      </div>
      <GeneralFooter />
    </div>
  );
}


