import { db } from "@/db/drizzle";
import { task, taskLedger } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { asc, count, eq, and } from "drizzle-orm";
import { getSession } from "@/features/auth/get-session";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const { searchParams } = new URL(request.url); //yyyy-MM-dd
        const dayParam = searchParams.get('day');

        if (!dayParam) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const result = await db
            .select({
                id: taskLedger.id,
                taskId: task.id,
                title: task.title,
                description: task.description,
                deadline: taskLedger.deadline,
                status: taskLedger.status,
                completedAt: taskLedger.completedAt,
                remarks: taskLedger.remarks,
            })
            .from(task)
            .innerJoin(taskLedger, eq(taskLedger.taskId, task.id))
            .where(eq(taskLedger.day, new Date(dayParam)))
            .orderBy(asc(taskLedger.deadline));

        if (!result) return NextResponse.json({
            success: false,
            message: "No Tasks",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                data: {
                    result,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching task list: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}


