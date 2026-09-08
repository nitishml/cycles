import { redirect } from "next/navigation";
import { Metadata } from "next";
import { MobileLoginCard } from "@/features/auth/components/MobileLoginCard";
import Image from "next/image";
import { Briefcase, Globe, Mail, MapPin, Phone } from "lucide-react";
import { getSession } from "@/features/auth/get-session";

export const metadata: Metadata = {
    title: "Login",
    description: "Login page",
};

export default async function StaffLoginPage() {
    const session = await getSession();
    if (session) return redirect("/")

    return (
        <main className="w-full flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-20">
            {/* LEFT SIDE */}
            <section className=" order-2 lg:order-1 bg-muted border backdrop-blur-xl rounded-xl p-3 sm:p-4 md:p-5">
                {/* LOGO + TITLES */}
                <div className="border border-custom-accent-400 py-3 sm:py-4 px-3 sm:px-4 rounded-lg">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={120}
                            height={120}
                            className="drop-shadow-md sm:w-20 sm:h-20 md:w-22.5 md:h-22.5 object-cover"
                        />
                        <div>
                            <p className="font-semibold text-base sm:text-xl md:text-2xl leading-tight">
                                ನಿತೀಶ್ ಮಕಂ ಲೋಕೇಶ್ ಶೆಟ್ಟಿ
                            </p>
                            <p className="font-bold text-base sm:text-xl md:text-2xl mt-1">
                                Nitish Makam Lokesh Setty
                            </p>
                        </div>
                    </div>
                </div>

                {/* ADDRESS BOX */}
                <div className="border border-custom-secondary-400 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 mt-3 flex gap-2 sm:gap-3 items-start">
                    <Briefcase className="text-custom-secondary-400 " size={24} />
                    <p className="text-xs sm:text-sm">
                        Managing Director
                    </p>
                </div>

                {/* CONTACT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                    <div className="border border-custom-secondary-400 rounded-lg p-2 sm:p-3 flex gap-2 sm:gap-3 items-center justify-start">
                        <Phone className="text-custom-secondary-400" size={22} />
                        <p className="text-xs sm:text-sm leading-tight">
                            72594 33667
                        </p>
                    </div>

                    <div className="border border-custom-secondary-400 rounded-lg p-2 sm:p-3 flex gap-2 sm:gap-3 items-center justify-start">
                        <Mail className="text-custom-secondary-400" size={22} />
                        <p className="text-xs sm:text-sm leading-tight">
                            nitishml25@gmail.com
                        </p>

                    </div>
                </div>
            </section>
            {/* Right SIDE */}
            <section className="order-1 lg:order-2">
                <MobileLoginCard />
            </section>
        </main>
    );
}

