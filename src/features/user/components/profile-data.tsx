"use client"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { DataError, QueryLoading } from "@/components/query-loaders";
import { DataDisplay } from "@/components/data-display-boxes";
import { useGetMe } from "@/features/auth/hooks/use-get-me";


export const ProfileDataStaff = () => {
    const query = useGetMe()

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    return (
        <div className='flex flex-col items-center justify-start gap-4  max-w-3xl  rounded-lg w-full p-4 mx-auto px-2'>
            <div className=' w-55 bg-card mx-auto rounded-md p-2 h-full'>
                {/* <AspectRatio
                    ratio={1 / 1}
                    className='bg-linear-to-br from-pink-500 to-indigo-600 rounded-md overflow-hidden'
                >
                </AspectRatio> */}
                <Image
                    src="/default-user.png"
                    height={160}
                    width={160}
                    alt="ID Image"
                />
            </div>
            <div className='flex flex-col w-full px-4 items-start justify-start gap-4'>
                <DataDisplay title={'Full Name'} value={data.name} />
                <DataDisplay title={'Mobile'} value={data.mobile} />
                <DataDisplay title={'E-Mail'} value={data.email} />
                <DataDisplay title={'State'} value={'Karnataka'} />

            </div>
        </div>
    );
}