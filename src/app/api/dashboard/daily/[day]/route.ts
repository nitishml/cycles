import { db } from "@/db/drizzle";
import { routine, routineLedger, task, taskLedger } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, } from "drizzle-orm";
import { getSession } from "@/features/auth/get-session";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ day: string }> }
) {
    try {

        const { day } = await params
        if (!day) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        // const { searchParams } = new URL(request.url); //yyyy-MM-dd
        // const dayParam = searchParams.get('day');

        // if (!dayParam) return NextResponse.json({
        //     success: false,
        //     message: "Bad Request",
        //     data: null,
        // }, { status: 400 });

        const routines = await db
            .select({
                id: routineLedger.id,
                routineId: routineLedger.id,
                remarks: routineLedger.id,
                title: routine.title,
                completedAt: routineLedger.completedAt,
                frequency: routine.frequency,
            })
            .from(routineLedger)
            .where(eq(routineLedger.day, new Date(day)))
            .innerJoin(routine, eq(routineLedger.routineId, routine.id))
            .orderBy(desc(routineLedger.completedAt,))

        const tasks = await db
            .select({
                id: taskLedger.id,
                taskId: task.id,
                title: task.title,
                deadline: taskLedger.deadline,
            })
            .from(taskLedger)
            .where(and(
                eq(taskLedger.day, new Date(day)),
                eq(taskLedger.status, "OPEN")
            ))
            .innerJoin(task, eq(taskLedger.taskId, task.id))
            .orderBy(desc(taskLedger.deadline))


        if (!tasks || !routines) return NextResponse.json({
            success: false,
            message: "No Tasks",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                data: {
                    tasks,
                    routines,
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


