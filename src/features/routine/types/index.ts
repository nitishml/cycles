import { routineFrequenceEnum } from "@/db/schema";
import z from "zod";

export type RoutineListItem = {
    id: string;
    title: string;
    description: string;
    frequency: typeof routineFrequenceEnum.enumValues[number];
}

export type RoutineDetailsDTO = {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    isPinned: boolean;
    isOneTime: boolean;
    displayOrder: number;
    frequency: typeof routineFrequenceEnum.enumValues[number];
}

export type AddRoutineDTO = {
    title: string;
    description: string;
    schedule?: string | null;
    frequency: typeof routineFrequenceEnum.enumValues[number];
}

export const addRoutineFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    frequency: z.enum(routineFrequenceEnum.enumValues),
});

export const addRoutineApiSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    frequency: z.enum(routineFrequenceEnum.enumValues),
});

export type EditRoutineDTO = {
    id: string;
    title: string;
    description: string;
    isPinned: boolean;
    isOneTime: boolean;
    frequency: typeof routineFrequenceEnum.enumValues[number];
}

export const editRoutineFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    frequency: z.enum(routineFrequenceEnum.enumValues),
    isPinned: z.boolean(),
    isOneTime: z.boolean(),

});

export const editRoutineApiSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    frequency: z.enum(routineFrequenceEnum.enumValues),
    isPinned: z.boolean(),
    isOneTime: z.boolean(),
});

export type DeactivateRoutineDTO = {
    id: string;
}
