import z from "zod";

export const changePasswordSchema = z
    .object({
        // currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[a-z]/, 'Password must contain at least one lowercase character')
            .regex(/[\d\W]/, 'Password must contain at least one number, symbol, or whitespace'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type UserSession = {
    id: string;
    createdAt: Date;
    userAgent: string | null;
    ipAddress: string | null;
}

export const revokeSessionSchema = z
    .object({
        sessionId: z.string(),

    })
