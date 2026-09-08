import { taskFrequenceEnum } from "@/db/schema";
import z from "zod";

export type TaskListItem = {
    id: string;
    title: string;
    description: string;
    frequency: typeof taskFrequenceEnum.enumValues[number];
}

export type TaskDetailsDTO = {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    isPinned: boolean;
    isOneTime: boolean;
    displayOrder: number;
    frequency: typeof taskFrequenceEnum.enumValues[number];
}

export type AddTaskDTO = {
    title: string;
    description: string;
    schedule?: string | null;
    frequency: typeof taskFrequenceEnum.enumValues[number];
}

export const addTaskFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    frequency: z.enum(taskFrequenceEnum.enumValues),
});

export const addTaskApiSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    frequency: z.enum(taskFrequenceEnum.enumValues),
});

export type EditTaskDTO = {
    id: string;
    title: string;
    description: string;
    isPinned: boolean;
    isOneTime: boolean;
    frequency: typeof taskFrequenceEnum.enumValues[number];
}

export const editTaskFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    frequency: z.enum(taskFrequenceEnum.enumValues),
    isPinned: z.boolean(),
    isOneTime: z.boolean(),

});

export const editTaskApiSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    frequency: z.enum(taskFrequenceEnum.enumValues),
    isPinned: z.boolean(),
    isOneTime: z.boolean(),
});

export type DeactivateTaskDTO = {
    id: string;
}
