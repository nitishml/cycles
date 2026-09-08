import { db } from "@/db/drizzle";
import { task, taskLedger } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSession } from "@/features/auth/get-session";
import { addLedgerEntryApiSchema, updateLedgerApiSchema } from "@/features/cycles/types";

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const body = await request.json();
        const validatedData = addLedgerEntryApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const { taskId, day, remarks } = validatedData.data

        const [newEntry] = await db
            .insert(taskLedger)
            .values({
                taskId,
                day,
                remarks
            })
            .returning({
                id: task.id
            })

        if (!newEntry) return NextResponse.json({
            success: false,
            message: "Creation Failed",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Task Ledger Entry Created Successfuly",
                data: {
                    id: newEntry.id,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error entering into task ledger: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const body = await request.json();
        const validatedData = updateLedgerApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const { id, remarks } = validatedData.data

        await db
            .update(taskLedger)
            .set({
                // count: count,
                remarks
            })
            .where(eq(taskLedger.id, id))

        return NextResponse.json(
            {
                success: true,
                message: "Task Ledger Entry Updated Successfuly",
                data: {
                    id: id,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating task ledger: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
