import { db } from "@/db/drizzle";
import { task } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import z from "zod";
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

