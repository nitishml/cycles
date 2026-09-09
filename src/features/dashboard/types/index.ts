import { taskFrequenceEnum } from "@/db/schema";

export type LedgerItems = {
    id: string;
    taskId: string;
    remarks: string;
    taskTitle: string;
    completedAt: Date;
    frequency: typeof taskFrequenceEnum.enumValues[number];
}