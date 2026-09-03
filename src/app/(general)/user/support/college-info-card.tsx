
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export function CollegeInfoCard() {
    return (
        <div className="w-full flex justify-center items-center py-10 ">
            <div
                className="
          w-full
          bg-white/85 backdrop-blur-xl rounded-xl
          p-3 sm:p-4 md:p-5
        "
            >
                {/* LOGO + TITLES */}
                <div className="border border-custom-secondary-500 py-3 sm:py-4 px-3 sm:px-4 rounded-lg">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <Image
                            src="/logo.svg"
                            alt="GS Logo"
                            width={65}
                            height={65}
                            className="drop-shadow-md sm:w-20 sm:h-20 md:w-[90px] md:h-[90px]"
                        />

                        <div>
                            <p className="font-semibold text-base sm:text-xl md:text-2xl leading-tight">
                                ಗ್ರೋಶಾರ್ಪ್ ದೇವಸ್ಥಾನ
                            </p>
                            <p className="font-bold text-base sm:text-xl md:text-2xl mt-1">
                                Growsharp Temple
                            </p>
                        </div>
                    </div>
                </div>

                {/* ADDRESS BOX */}
                <div className="border border-custom-secondary-500 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 mt-3 flex gap-2 sm:gap-3 items-start">
                    <MapPin className="text-custom-secondary-500 mt-1" size={24} />
                    <p className="text-xs sm:text-sm leading-snug">
                        Banashankari 3rd Stage, Bengaluru, Karnataka 560085

                    </p>
                </div>

                {/* CONTACT GRID */}
                {/* <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="border border-custom-secondary-500 rounded-lg p-2 sm:p-3 flex gap-2 sm:gap-3">
                        <Phone className="text-custom-secondary-500" size={22} />
                        <p className="text-xs sm:text-sm leading-tight">
                            91084 07851
                        </p>
                    </div>

                    <div className="border border-custom-secondary-500 rounded-lg p-2 sm:p-3 flex gap-2 sm:gap-3">
                        <Mail className="text-custom-secondary-500" size={22} />
                        <p className="text-xs sm:text-sm leading-tight">
                            support@growsharptech.com
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
