"use client"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { SoftDataDisplay } from "@/components/data-display-boxes"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetTeacher } from "../hooks/use-get-teacher"
import Image from "next/image"

type Props = {
    teacherId: string
}
export const TeacherProfileHeader = ({ teacherId }: Props) => {
    const query = useGetTeacher({ teacherId })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return (
        <Skeleton className='h-34 lg:h-52 w-full'>

        </Skeleton>
    )
    if (!query.data || !query.data.data) return (
        <Skeleton className='h-34 lg:h-52 w-full'>

        </Skeleton>
    )
    const data = query.data.data
    return (
        <div className='w-full flex flex-col md:flex-row items-center justify-start p-2 gap-4'>
            <div className='w-full max-w-40'>
                {/*  <AspectRatio
                    ratio={1 / 1}
                    className='bg-linear-to-br from-pink-500 to-indigo-600 rounded-md overflow-hidden'
                >
                    Student image would go here 
                </AspectRatio>*/}
                <Image
                    src="/images/student.png"
                    height={160}
                    width={160}
                    alt="ID Image"
                />
            </div>
            <div className='flex-1 space-y-1'>
                <div className="w-full flex items-center justify-between gap-2">
                    <h1 className='text-2xl font-bold text-left pl-2'>{data.name}</h1>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1">

                    <SoftDataDisplay title="Designation" value={data.designation} />

                    <SoftDataDisplay title="Activated?" value={data.isActivated ? "Yes" : "No"} />

                    <SoftDataDisplay title="Department" value={data.department} />
                    <SoftDataDisplay title="Mobile Verified?" value={data.mobileVerified ? "Yes" : "No"} />

                </div>

            </div>
        </div>
    );
}