import z from "zod";

export type RoutineListItem = {
    id: string;
    title: string;
}

export type DailyCycleDTO = {
    routineId: string;
    routineTitle: string;
    count: number;
}

export type AddLedgerEntryDTO = {
    routineId: string;
    day: string;
    remarks?: string | null;
    completedAt: Date;
}

export const addLedgerEntryFormSchema = z.object({
    completedAt: z.coerce.date(),
    remarks: z.string().optional(),
})

export const addLedgerEntryApiSchema = z.object({
    routineId: z.string(),
    day: z.coerce.date(),
    remarks: z.string().optional(),
    completedAt: z.coerce.date(),
})

export type UpdateLedgerEntryDTO = {
    id: string;
    routineId: string;
    day: Date;
    remarks?: string | null;
    completedAt: Date;
}

export const updateLedgerFormSchema = z.object({
    day: z.coerce.date(),
    remarks: z.string().optional(),
    completedAt: z.coerce.date(),
})

export const updateLedgerApiSchema = z.object({
    id: z.string(),
    routineId: z.string(),
    day: z.coerce.date(),
    remarks: z.string().optional(),
    completedAt: z.coerce.date(),
})