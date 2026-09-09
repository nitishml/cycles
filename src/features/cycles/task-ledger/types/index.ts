import { taskStatusEnum } from "@/db/schema";
import z from "zod";

export type DailyTaskStatusDTO = {
    id: string;
    taskId: string;
    title: string;
    description: string;
    deadline: Date;
    status: typeof taskStatusEnum.enumValues[number];
    completedAt: Date | null;
    remarks: string | null;
}

export type ScheduleTaskDTO = {
    taskId: string;
    deadline: Date;
    remarks?: string | null;
}

export const scheduleTaskFormSchema = z.object({
    deadline: z.coerce.date(),
    remarks: z.string().optional(),
})

export const scheduleTaskApiSchema = z.object({
    taskId: z.string(),
    deadline: z.coerce.date(),
    remarks: z.string().optional(),
})

export type CompleteTaskDTO = {
    id: string;
    remarks?: string | null;
    completedAt: Date;
}

export const completeTaskFormSchema = z.object({
    completedAt: z.coerce.date(),
    remarks: z.string().optional(),
})

export const completeTaskApiSchema = z.object({
    id: z.string(),
    completedAt: z.coerce.date(),
    remarks: z.string().optional(),
})

export type UpdateLedgerEntryDTO = {
    id: string;
    taskId: string;
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
    taskId: z.string(),
    day: z.coerce.date(),
    remarks: z.string().optional(),
    completedAt: z.coerce.date(),
})