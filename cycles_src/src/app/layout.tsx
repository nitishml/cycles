import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./components/Navbar";
import Image from "next/image";
import avatar from "../../public/img/Simba_Avatar.png";

export const metadata: Metadata = {
  title: "Cycles Management",
  description: "Automation of periodic tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-tr overflow-x-hidden min-w-screen from-zinc-950 via-stone-900 to-neutral-950 flex min-h-screen flex-col items-center justify-between">
        <main className="p-4 py-24 gap-6 w-full lg:w-[55%]">
          <section className="w-full flex gap-4 justify-start mb-6 p-2">
            <div>
              <Image
                src={avatar}
                alt="avatar"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full shadow-lg grayscale hover:grayscale-0 duration-300"
              />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <h2 className="mb-0 text-zinc-100 font-bold">Nitish</h2>
              <p className="mb-0 text-zinc-400 font-semibold leading-none">
                Designer • Developer • Debugger
              </p>
            </div>
          </section>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
