import z from "zod";

export type TaskListItem = {
    id: string;
    title: string;
}

export type DailyCycleDTO = {
    today: {
        id: string;
        taskTitle: string;
        taskId: string;
        count: number;
    }[];
    taskList: {
        id: string;
        title: string;
    }[];
}

export type LedgerEntryDTO = {
    taskId: string;
    day: Date;
    count: number;
    remarks?: string | null;
}

export const addLedgerEntryFormSchema = z.object({
    day: z.coerce.date(),
    count: z.coerce.number(),
    remarks: z.string().optional(),
})

export const addLedgerEntryApiSchema = z.object({
    taskId: z.string(),
    day: z.coerce.date(),
    count: z.coerce.number(),
    remarks: z.string().optional(),
})

export const updateLedgerApiSchema = z.object({
    id: z.string(),
    taskId: z.string(),
    day: z.coerce.date(),
    count: z.coerce.number(),
    remarks: z.string().optional(),
})