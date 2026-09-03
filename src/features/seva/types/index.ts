import z from "zod";

export type SevaListItem = {
    id: string;
    title: string;
    description: string;
    schedule?: string | null;
}

export type AddSevaDTO = {
    title: string;
    description: string;
    schedule?: string | null;
}

export const addSevaFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    schedule: z.string("Invalid Schedule format").optional(),
});

export const addSevaApiSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    schedule: z.string("Invalid Schedule format").optional(),
});

export type EditSevaDTO = {
    id: string;
    title: string;
    description: string;
    schedule?: string | null;
}

export const editSevaFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    schedule: z.string("Invalid Schedule format").optional(),
});

export const editSevaApiSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "description cannot be empty"),
    schedule: z.string("Invalid Schedule format").optional(),
});
