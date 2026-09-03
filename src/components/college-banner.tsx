import { format } from "date-fns"
import Image from "next/image"

export const CollegeBanner = () => {
    return (
        <div className="w-full hidden md:flex items-center justify-between lg:mb-4">
            <div className="flex items-center justify-start  gap-4 ">
                <Image
                    src="/logo.svg"
                    alt="College Logo"
                    width={65}
                    height={65}
                    className="drop-shadow-md w-10 h-10 lg:w-[90px] lg:h-[90px]"
                />
                <div className="">
                    {/* <p className="font-semibold text-base  lg:text-2xl leading-tight">
                        ಎಸ್.ಎಲ್.ಎನ್. ಕಲಾ ಮತ್ತು ವಾಣಿಜ್ಯ ಮಹಾವಿದ್ಯಾಲಯ
                    </p> */}
                    <p className="font-bold text-base  lg:text-2xl mt-1">
                        Darshan and Seva Management System
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end justify-start">

                <p className="font-semibold text-base leading-tight">
                </p>
                <p className="font-medium text-base mt-1">
                    {format(new Date(), "EEEE | do MMMM")}
                </p>
            </div>
        </div>
    )
}