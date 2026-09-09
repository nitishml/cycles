import { db } from "@/db/drizzle";
import { task } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSession } from "@/features/auth/get-session";
import { addTaskApiSchema } from "@/features/tasks/types";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const data = await db
            .select()
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
                    tasks: data
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

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const body = await request.json();
        const validatedData = addTaskApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const { title, description } = validatedData.data

        const [newTask] = await db
            .insert(task)
            .values({
                title,
                description,
                isActive: true,
                // frequency
            })
            .returning({
                id: task.id
            })

        if (!newTask) return NextResponse.json({
            success: false,
            message: "Creation Failed",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Task Created Successfuly",
                data: {
                    id: newTask.id,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error creating task: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
