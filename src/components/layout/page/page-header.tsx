"use client"

import { SidebarMobileMenu, SidebarTriggerHeader } from '@/components/ui/sidebar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
// import { UserMenu } from '@/features/auth/components/UserMenu';
import { useEffect, useState } from 'react';
import { UserMenu } from '@/features/auth/components/UserMenu';
import { format } from 'date-fns';

type Props = {
	title: string;
}

export default function PageHeaderStaff({ title }: Props) {
	// const [isScrolled, setIsScrolled] = useState(false)
	const router = useRouter();

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const scrollThreshold = 200
	// 		setIsScrolled(window.scrollY > scrollThreshold)
	// 	}

	// 	window.addEventListener("scroll", handleScroll)
	// 	return () => window.removeEventListener("scroll", handleScroll)
	// }, [])

	const handleBack = () => {
		router.back();
	};

	const handleForward = () => {
		// Note: router.forward() doesn't exist in Next.js App Router
		// Using window.history.forward() as alternative
		if (typeof window !== 'undefined') {
			window.history.forward();
		}
	};
	return (
		<>
			{/* {isScrolled && (
				<header
					className="hidden z-50 md:block top-1 fixed h-14 rounded-md w-full ml-[-45px] ">
					<div className='p-2 bg-custom-secondary-600 max-w-7xl w-full flex items-center justify-between gap-2 mx-auto rounded-md '>
						<div className="flex items-center gap-2 px-4">
							<SidebarTriggerHeader className="-ml-1" />
							<div className="hidden md:flex items-center space-x-2">
								<Button
									onClick={handleBack}
									aria-label="Go back"
									title="Go back"
									variant={'outline'}
									size={'icon'}
								>
									<ChevronLeft className="w-5 h-5" />
								</Button>

								<Button
									onClick={handleForward}
									aria-label="Go forward"
									title="Go forward"
									variant={'outline'}
									size={'icon'}
								>
									<ChevronRight className="w-5 h-5" />
								</Button>
							</div>
							<Separator
								orientation="vertical"
								className="mr-2 data-[orientation=vertical]:h-4"
							/>
							<span className='text-white'>{title}</span>
						</div>
						<div className='flex items-center justify-end gap-2'>
							<DropdownMenu modal={false} >
								<DropdownMenuTrigger asChild>
									<Button
										variant='link'
										className='hidden md:flex items-center justify-center text-white'
										size={'icon'} >
										<span className='sr-only'>Notifications</span>
										<Bell size={30} />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuItem className='py-4'>No Notifications</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<UserMenu role={role} />
						</div>
					</div>
				</header>
			)} */}
			{/* Desktop */}
			<header className="hidden z-50 md:flex h-14 shrink-0 items-center justify-between gap-2 w-full pr-4">
				<div className="flex items-center gap-2 px-4">
					<SidebarTriggerHeader className="-ml-1" />
					<div className="hidden md:flex items-center space-x-2">
						<Button
							onClick={handleBack}
							aria-label="Go back"
							title="Go back"
							variant={'outline'}
							size={'icon'}
						>
							<ChevronLeft className="w-5 h-5" />
						</Button>

						<Button
							onClick={handleForward}
							aria-label="Go forward"
							title="Go forward"
							variant={'outline'}
							size={'icon'}
						>
							<ChevronRight className="w-5 h-5" />
						</Button>
					</div>
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					{title}
				</div>
				<div className='flex items-center justify-end gap-2'>
					{format(new Date(), "dd/MM/yy")}
					<DropdownMenu modal={false} >
						<DropdownMenuTrigger asChild>
							<Button variant='link' className='hidden md:flex items-center justify-center' size={'icon'} >
								<span className='sr-only'>Notifications</span>
								<Bell size={30} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem className='py-4'>No Notifications</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<UserMenu />
				</div>
			</header>




			{/* Mobile */}
			<header className="md:hidden fixed top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 w-full pr-4 bg-custom-secondary-500 text-white">
				<div className="flex items-center gap-2 px-4">
					<SidebarMobileMenu className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					{title}
				</div>
				<div className='flex items-center justify-end gap-2'>
					<DropdownMenu >
						<DropdownMenuTrigger asChild>
							<Button variant='muted' className='flex items-center justify-center' size={'icon'} >
								<span className='sr-only'>Notifications</span>
								<Bell size={30} className='stroke-white' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-[90dvw]! mt-1 border-b-2 border-custom-secondary-700'>
							<DropdownMenuItem className='py-4'>No Notifications</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</>
	);
}
