import z from "zod";

export type TaskListItem = {
    id: string;
    title: string;
    description: string;
}

export type TaskDetailsDTO = {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    isPinned: boolean;
    isOneTime: boolean;
    displayOrder: number;
}

export type AddTaskDTO = {
    title: string;
    description: string;
    schedule?: string | null;
}

export const addTaskFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
});

export const addTaskApiSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
});

export type EditTaskDTO = {
    id: string;
    title: string;
    description: string;
    isPinned: boolean;
    isOneTime: boolean;
}

export const editTaskFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    isPinned: z.boolean(),
    isOneTime: z.boolean(),

});

export const editTaskApiSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    isPinned: z.boolean(),
    isOneTime: z.boolean(),
});

export type DeactivateTaskDTO = {
    id: string;
}
