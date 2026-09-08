import z from "zod";

export type TaskListItem = {
    id: string;
    title: string;
}

export type DailyCycleDTO = {
    taskId: string;
    taskTitle: string;
    count: number;
}

export type AddLedgerEntryDTO = {
    taskId: string;
    day: string;
    remarks?: string | null;
}

export const addLedgerEntryFormSchema = z.object({
    day: z.coerce.date(),
    remarks: z.string().optional(),
})

export const addLedgerEntryApiSchema = z.object({
    taskId: z.string(),
    day: z.coerce.date(),
    remarks: z.string().optional(),
})

export type UpdateLedgerEntryDTO = {
    id: string;
    taskId: string;
    day: Date;
    remarks?: string | null;
}

export const updateLedgerFormSchema = z.object({
    day: z.coerce.date(),
    remarks: z.string().optional(),
})

export const updateLedgerApiSchema = z.object({
    id: z.string(),
    taskId: z.string(),
    day: z.coerce.date(),
    remarks: z.string().optional(),
})