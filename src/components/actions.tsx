import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { HoverCard } from './hover-card';
import { IconType } from 'react-icons/lib';

type ActionProps = {
    label: string;
    href: string;
    icon: IconType;
};

type ActionsProps = {
    header?: string;
    actions: ActionProps[];
    size?: string;
};

export const Actions = ({ header, actions, size }: ActionsProps) => {
    return (
        <>
            <div className={cn('w-full min-h-32 h-full hidden md:flex flex-col gap-10 items-center justify-start mx-auto ', size)}>
                {header && (<h2 className='text-4xl font-bold'>{header}</h2>)}
                <div
                    className={cn(
                        'grid gap-8 w-full',
                        actions.length === 2 && 'grid-cols-2',
                        actions.length === 3 && 'grid-cols-3',
                        actions.length === 4 && 'grid-cols-4',
                    )}
                >
                    {actions.map((action, index) => (
                        <HoverCard key={index} title={action.label} IconSrc={action.icon} href={action.href} />
                    ))}
                </div>
            </div>
            <div
                className={cn(
                    'flex flex-col items-center justify-center gap-2 md:hidden ',)}
            >

                {actions.map((action, index) => (
                    <Button key={index} asChild className='h-16 max-w-62.5 w-full' size={'lg'} >
                        <Link href={action.href}>
                            <action.icon />
                            {action.label}
                        </Link>
                    </Button>
                ))}
            </div>
        </>
    );
};


export const ComponentActions = ({ header, actions, size }: ActionsProps) => {
    return (
        <>
            <div
                className={cn(
                    'flex flex-col items-center justify-center gap-2 px-4 max-w-60 w-full',)}
            >

                {actions.map((action, index) => (
                    <Button key={index} asChild className='h-16 max-w-62.5 w-full' size={'lg'} >
                        <Link href={action.href}>
                            <action.icon />
                            {action.label}
                        </Link>
                    </Button>
                ))}
            </div>

        </>
    );
};
