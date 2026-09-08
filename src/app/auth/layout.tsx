import { GeneralFooter } from "@/components/layout/GeneralFooter";
import Image from "next/image";
import { Suspense } from 'react'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="min-h-screen w-full flex flex-col relative gap-10 lg:gap-0">
      <div className="absolute inset-0 h-full w-full z-0 bg-linear-to-b from-custom-primary-500 via-custom-primary-400 to-custom-primary-500">

      </div>

      <Suspense fallback={<>...</>}>
        {children}
      </Suspense>
      <GeneralFooter />
    </div>
  );
}
