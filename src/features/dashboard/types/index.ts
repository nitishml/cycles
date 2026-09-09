import { taskFrequenceEnum } from "@/db/schema";

export type LedgerItems = {
    tasks: {
        id: string;
        taskId: string;
        title: string;
        deadline: Date
    }[];
    routines: {
        id: string;
        taskId: string;
        remarks: string;
        title: string;
        completedAt: Date;
        frequency: typeof taskFrequenceEnum.enumValues[number];
    }[];
}