import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

type Props = {
    title: string;
    IconSrc: IconType;
    href: string;
};

export const HoverCard = ({ title, IconSrc, href }: Props) => {
    return (
        <Link href={`${href}`} className='w-full group'>
            <Card className='rounded-2xl bg-muted p-2 overflow-hidden group-hover:black relative z-10 flex flex-col h-full gap-0 py-6'>
                <CardHeader>
                    <CardTitle className='font-semibold tracking-wide text-center group-hover:scale-125 transition-transform duration-300 ease-in-out text-xl text-wrap h-min'>
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className=' text-muted-foreground tracking-wide leading-relaxed flex items-center justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out '>
                    <IconSrc className='size-8' />
                </CardContent>
            </Card>
        </Link>
    );
};
