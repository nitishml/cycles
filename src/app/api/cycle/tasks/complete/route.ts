import { db } from "@/db/drizzle";
import { taskLedger } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSession } from "@/features/auth/get-session";
import { completeTaskApiSchema } from "@/features/cycles/task-ledger/types";

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const body = await request.json();
        const validatedData = completeTaskApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const { id, remarks, completedAt } = validatedData.data

        await db
            .update(taskLedger)
            .set({
                completedAt,
                remarks,
                status: "COMPLETE"
            })
            .where(eq(taskLedger.id, id))

        return NextResponse.json(
            {
                success: true,
                message: "Task Ledger Entry Completed Successfuly",
                data: {
                    id: id,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error completing task ledger: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
