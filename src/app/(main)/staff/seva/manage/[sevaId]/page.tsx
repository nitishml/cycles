import { Page } from "@/components/layout/page";
import { ViewSevaDetails } from "@/features/seva/components/view-seva-details";

type Params = Promise<{ sevaId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params

    return (
        <Page.Root>
            <Page.Header title={"Seva Details"} role="STAFF" />
            <Page.Main className="max-w-7xl">

                <ViewSevaDetails sevaId={params.sevaId} />
            </Page.Main>
        </Page.Root>

    );
}