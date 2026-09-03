import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { task } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { editTaskApiSchema } from "@/features/tasks/types";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const { taskId } = await params
        if (!taskId) return NextResponse.json({
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


        const [result] = await db
            .select({
                id: task.id,
                title: task.title,
                description: task.description,
                isActive: task.isActive,
                isPinned: task.isPinned,
                isOneTime: task.isOneTime,
                displayorder: task.displayOrder

            })
            .from(task)
            .where(eq(task.id, taskId))
            .orderBy(task.displayOrder);

        if (!result) return NextResponse.json({
            success: false,
            message: "Not Found",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                data: result
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching task details: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const { taskId } = await params
        if (!taskId) return NextResponse.json({
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

        const body = await request.json();
        const validatedData = editTaskApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        await db
            .update(task)
            .set({
                title: values.title,
                description: values.description,
                isPinned: values.isPinned,
                isOneTime: values.isOneTime,
            })
            .where(eq(task.id, taskId))


        return NextResponse.json(
            {
                success: true,
                message: "Task Edited Successfuly",
                data: {
                    id: taskId
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating task: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const { taskId } = await params
        if (!taskId) return NextResponse.json({
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

        await db
            .update(task)
            .set({
                isActive: false
            })
            .where(eq(task.id, taskId))

        return NextResponse.json(
            {
                success: true,
                message: "Task Deactivated Successfuly",
                data: {
                    id: taskId
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting task: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const { taskId } = await params
        if (!taskId) return NextResponse.json({
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

        await db
            .update(task)
            .set({
                isActive: true
            })
            .where(eq(task.id, taskId))

        return NextResponse.json(
            {
                success: true,
                message: "Task Deactivated Successfuly",
                data: {
                    id: taskId
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting task: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}