import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, Trash } from "lucide-react";
import { useDeactivateTask } from "../hooks/use-deactivate-task";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
    taskId: string
}

export function DeactivateTaskCard({ taskId }: Props) {
    const mutation = useDeactivateTask()
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    function onSubmit() {
        setLoading(true)
        mutation.mutate({
            id: taskId,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Task Details Updated")

                    // better approach if its ok to show edit form after submitting
                    router.refresh()

                    // this removes all cache and history
                    // window.location.reload()
                }
                else {
                    toast.error(data.message || "Please try again")
                    setLoading(false)
                }
            },
            onError: (data) => {
                toast.error(data.message || "Please try again")
                setLoading(false)
            }

        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger
            >
                <Card className='w-full group rounded-2xl bg-muted p-2 overflow-hidden group-hover:black relative z-10 flex flex-col h-full gap-0 py-6 cursor-pointer'
                    aria-disabled={isLoading}>
                    <CardHeader>
                        <CardTitle className='font-semibold tracking-wide text-center group-hover:scale-125 transition-transform duration-300 ease-in-out text-xl text-wrap h-min'>
                            {"Deactivate Task"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className=' text-muted-foreground tracking-wide leading-relaxed flex items-center justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out '>
                        {isLoading ? (<Loader className='size-8 animate-spin' />) : (<Trash className='size-8' />)}
                    </CardContent>
                </Card>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will remove the task from the main list and not allow progress
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isLoading} onClick={onSubmit}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
