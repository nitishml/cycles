import { taskFrequenceEnum } from "@/db/schema";

export type LedgerItems = {
    id: string;
    taskId: string;
    remarks: string;
    taskTitle: string;
    createdAt: Date;
    frequency: typeof taskFrequenceEnum.enumValues[number];
}