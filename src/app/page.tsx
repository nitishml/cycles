import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getSession } from '@/features/auth/get-session';

export default async function LandingPage() {
  const session = await getSession();
  if (session) return redirect('/dashboard');

  return (
    <div className='w-full flex flex-col items-center justify-center gap-8 py-10'>
      Welcome to Cycles Manager
      <Button asChild>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
      Marketing page
    </div>
  )

}