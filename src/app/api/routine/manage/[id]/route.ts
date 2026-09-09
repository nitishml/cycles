import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { routine } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { editRoutineApiSchema } from "@/features/routine/types";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json({
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
                id: routine.id,
                title: routine.title,
                description: routine.description,
                isActive: routine.isActive,
                isPinned: routine.isPinned,
                isOneTime: routine.isOneTime,
                displayorder: routine.displayOrder,
                frequency: routine.frequency,
            })
            .from(routine)
            .where(eq(routine.id, id))
            .orderBy(routine.displayOrder);

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
        console.error('Error fetching routine details: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json({
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
        const validatedData = editRoutineApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        await db
            .update(routine)
            .set({
                title: values.title,
                description: values.description,
                isPinned: values.isPinned,
                isOneTime: values.isOneTime,
                frequency: values.frequency,
            })
            .where(eq(routine.id, id))


        return NextResponse.json(
            {
                success: true,
                message: "Routine Edited Successfuly",
                data: {
                    id: id
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating routine: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json({
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
            .update(routine)
            .set({
                isActive: false
            })
            .where(eq(routine.id, id))

        return NextResponse.json(
            {
                success: true,
                message: "Routine Deactivated Successfuly",
                data: {
                    id: id
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting routine: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json({
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
            .update(routine)
            .set({
                isActive: true
            })
            .where(eq(routine.id, id))

        return NextResponse.json(
            {
                success: true,
                message: "Routine Deactivated Successfuly",
                data: {
                    id: id
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting routine: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}