import { Page } from "@/components/layout/page";
import { ViewTaskDetails } from "@/features/tasks/components/view-task-details";
import { Metadata } from "next";

type Params = Promise<{ taskId: string }>

export const metadata: Metadata = {
    title: "Task Details",
    description: "Task details page",
};

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params

    return (
        <Page.Root>
            <Page.Header title={"Task Details"} />
            <Page.Main className="max-w-7xl">

                <ViewTaskDetails taskId={params.taskId} />
            </Page.Main>
        </Page.Root>

    );
}