import { db } from "@/db/drizzle";
import { taskLedger } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/features/auth/get-session";
import { scheduleTaskApiSchema } from "@/features/cycles/task-ledger/types";

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const body = await request.json();
        const validatedData = scheduleTaskApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const { taskId, remarks, deadline } = validatedData.data

        // console.log("at API: ", validatedData.data)

        const [newEntry] = await db
            .insert(taskLedger)
            .values({
                taskId,
                day: deadline,
                deadline,
                remarks,
            })
            .returning({
                id: taskLedger.id
            })

        if (!newEntry) return NextResponse.json({
            success: false,
            message: "Creation Failed",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Task Scheduled",
                data: {
                    id: newEntry.id,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error scheduling task: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
