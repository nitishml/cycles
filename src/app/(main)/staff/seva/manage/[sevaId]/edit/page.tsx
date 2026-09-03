import { Page } from "@/components/layout/page";
import { Ticket } from "lucide-react";
import { Actions } from "@/components/actions";
import { ViewSevaDetails } from "@/features/seva/components/view-seva-details";
import { FaEdit } from "react-icons/fa";

type Params = Promise<{ sevaId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params

    return (
        <Page.Root>
            <Page.Header title={"Teacher Details"} role="STAFF" />
            <Page.Main className="max-w-7xl">

            </Page.Main>
        </Page.Root>

    );
}