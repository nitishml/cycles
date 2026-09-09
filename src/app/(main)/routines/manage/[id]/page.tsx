import { Page } from "@/components/layout/page";
import { ViewRoutineDetails } from "@/features/routine/components/view-routine-details";
import { Metadata } from "next";

type Params = Promise<{ id: string }>

export const metadata: Metadata = {
    title: "Routine Details",
    description: "Routine details page",
};

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params

    return (
        <Page.Root>
            <Page.Header title={"Routine Details"} />
            <Page.Main className="max-w-7xl">

                <ViewRoutineDetails routineId={params.id} />
            </Page.Main>
        </Page.Root>

    );
}