import { db } from "@/db/drizzle";
import { task, taskLedger } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
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

        const data = await db
            .select({
                taskTitle: task.title,
                taskId: task.id,
                count: taskLedger.count,
                id: taskLedger.id
            })
            .from(taskLedger)
            .where(eq(taskLedger.day, new Date(dayParam)))
            .innerJoin(task, eq(taskLedger.taskId, task.id))
            .groupBy(task.id, task.title, taskLedger.count, taskLedger.id)


        const taskList = await db
            .select({
                id: task.id,
                title: task.title
            })
            .from(task)
            .where(eq(task.isActive, true))

        if (!data) return NextResponse.json({
            success: false,
            message: "No Tasks",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                data: {
                    today: data,
                    taskList
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


