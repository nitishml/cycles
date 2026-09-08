'use client';

import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle } from 'lucide-react';

interface NotificationType {
    announcement: {
        email: boolean;
        browser: boolean;
        app: boolean;
    };
    message: {
        email: boolean;
        browser: boolean;
        app: boolean;
    };
}

const defaultNotificationPreset = [
    {
        id: 'announcement',
        name: 'Announcement',
        email: true,
        browser: true,
        app: true,
    },
    {
        id: 'new-message',
        name: 'Message',
        email: true,
        browser: true,
        app: true,
    },
    {
        id: 'new-lead',
        name: 'New Lead',
        email: true,
        browser: true,
        app: true,
    },
    // {
    // 	id: 'browser',
    // 	name: 'A new browser used to sign in',
    // 	email: true,
    // 	browser: true,
    // 	app: false,
    // },
    // {
    // 	id: 'device',
    // 	name: 'A new device is linked',
    // 	email: true,
    // 	browser: false,
    // 	app: false,
    // },
]

const presetNotifs = {
    announcement: {
        email: true,
        browser: true,
        app: true,
    },
    message: {
        email: true,
        browser: true,
        app: true,
    },
}

export default function NotificationPreferences() {
    const [notifications, setNotifications] = React.useState<NotificationType>(presetNotifs);

    // const handleCheckboxChange = (id: string, type: 'email' | 'browser' | 'app', checked: boolean) => {
    //     setNotifications(
    //         notifications.map((notification) =>
    //             notification.id === id ? { ...notification, [type]: checked } : notification,
    //         ),
    //     );
    // };

    return (
        <Card className='space-y-8 border-none shadow-none w-full'>
            <CardHeader>
                <CardTitle className='text-xl font-semibold'>
                    <h1 className="text-2xl font-semibold">Notification Preferences</h1>
                </CardTitle>
                <p className='text-sm text-muted-foreground'>
                    We need permission from your browser to show notifications.{' '}
                    <Button variant='link' className='p-0 h-auto font-normal'>
                        Request Permission
                    </Button>
                </p>
            </CardHeader>
            <CardContent className='space-y-6'>
                <div className='overflow-x-auto'>
                    {/* <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[200px] text-xs md:text-sm'>TYPE</TableHead>
                                <TableHead className='text-center text-xs md:text-sm'>EMAIL</TableHead>
                                <TableHead className='text-center text-xs md:text-sm'>PUSH</TableHead>
                                <TableHead className='text-center text-xs md:text-sm'>WHATSAPP</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {notifications.map((notification) => (
                                <TableRow key={notification.id}>
                                    <TableCell className='font-medium'>{notification.name}</TableCell>
                                    <TableCell className='text-center'>
                                        <Checkbox
                                            checked={notification.email}
                                            onCheckedChange={(checked) => handleCheckboxChange(notification.id, 'email', checked as boolean)}
                                            className='mx-auto size-7'
                                        />
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        <Checkbox
                                            checked={notification.browser}
                                            onCheckedChange={(checked) =>
                                                handleCheckboxChange(notification.id, 'browser', checked as boolean)
                                            }
                                            className='mx-auto size-7'
                                        />
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        <Checkbox
                                            checked={notification.app}
                                            onCheckedChange={(checked) => handleCheckboxChange(notification.id, 'app', checked as boolean)}
                                            className='mx-auto size-7'
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> */}
                    <Card className='px-4 w-full'>
                        <CardTitle>Announcements</CardTitle>
                        <div className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='h-7 w-24 bg-blue-700 text-white rounded-md rounded-b-none text-center text-sm py-1'>
                                    {"Email"}
                                </div>
                                <div className='h-10 w-24 bg-blue-500 text-white rounded-md rounded-t-none flex items-center justify-center'>
                                    <CheckCircle />
                                </div>

                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='h-7 w-24 bg-amber-700 text-white rounded-md rounded-b-none text-center text-sm py-1'>
                                    {"Push"}
                                </div>
                                <div className='h-10 w-24 bg-amber-500 text-white rounded-md rounded-t-none flex items-center justify-center'>
                                    <CheckCircle />
                                </div>

                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='h-7 w-24 bg-emerald-700 text-white rounded-md rounded-b-none text-center text-sm py-1'>
                                    {"Whatsapp"}
                                </div>
                                <div className='h-10 w-24 bg-emerald-500 text-white rounded-md rounded-t-none flex items-center justify-center'>
                                    <CheckCircle />
                                </div>

                            </div>


                        </div>
                    </Card>

                    <Card className='px-4 w-full'>
                        <CardTitle>Message</CardTitle>
                        <div className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='h-7 w-24 bg-blue-700 text-white rounded-md rounded-b-none text-center text-sm py-1'>
                                    {"Email"}
                                </div>
                                <div className='h-10 w-24 bg-blue-500 text-white rounded-md rounded-t-none flex items-center justify-center'>
                                    <CheckCircle />
                                </div>

                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='h-7 w-24 bg-amber-700 text-white rounded-md rounded-b-none text-center text-sm py-1'>
                                    {"Push"}
                                </div>
                                <div className='h-10 w-24 bg-amber-500 text-white rounded-md rounded-t-none flex items-center justify-center'>
                                    <CheckCircle />
                                </div>

                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='h-7 w-24 bg-emerald-700 text-white rounded-md rounded-b-none text-center text-sm py-1'>
                                    {"Whatsapp"}
                                </div>
                                <div className='h-10 w-24 bg-emerald-500 text-white rounded-md rounded-t-none flex items-center justify-center'>
                                    <CheckCircle />
                                </div>

                            </div>


                        </div>
                    </Card>

                </div>

            </CardContent>
            <CardFooter>
                <Button disabled className='max-w-[200px] h-12 mx-auto w-full'>
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
}