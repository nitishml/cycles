"use client";

import Link from "next/link";

const footerLinks = [
    // { label: "About Us", href: "/about" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Cookie Policy", href: "/legal/cookie-policy" },
];

export function GeneralFooter() {
    return (
        <footer className=" w-full z-10">
            <div className="w-full bg-muted/70 p-6 pb-4 ">
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm mb-4">
                    {footerLinks.map((link, index) => (
                        <div key={link.href} className="flex items-center gap-2 sm:gap-4">
                            <Link href={link.href} className="hover:underline underline-offset-4">
                                {link.label}
                            </Link>
                            {index < footerLinks.length - 1 && (
                                <span className="text-black/40">|</span>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-xs md:text-sm text-center">
                    © 2026 Growsharp Technologies Private Limited. All rights reserved.
                </p>
            </div>
        </footer>
    );
}