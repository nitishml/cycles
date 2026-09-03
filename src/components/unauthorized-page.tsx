import { AlertTriangle } from "lucide-react"

export const UnauthorizedPage = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center gap-2 pb-20'>
      <AlertTriangle size={60} className="text-rose-500" />
      <span className='text-7xl font-bold'>401</span>
      <span className='text-2xl font-medium'>UNAUTHORIZED</span>
      <span className='text-lg font-medium text-center px-4'>You do not have access to this resource</span>
    </div>
  )
}