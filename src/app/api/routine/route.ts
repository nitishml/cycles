import { db } from "@/db/drizzle";
import { routine } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSession } from "@/features/auth/get-session";
import { addRoutineApiSchema } from "@/features/routine/types";

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
            .from(routine)
            .where(eq(routine.isActive, true))

        if (!data) return NextResponse.json({
            success: false,
            message: "No Routines",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                data: {
                    routines: data
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching routine list: ', error);
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
        const validatedData = addRoutineApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const { title, description, frequency } = validatedData.data

        const [newRoutine] = await db
            .insert(routine)
            .values({
                title,
                description,
                isActive: true,
                frequency
            })
            .returning({
                id: routine.id
            })

        if (!newRoutine) return NextResponse.json({
            success: false,
            message: "Creation Failed",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Routine Created Successfuly",
                data: {
                    id: newRoutine.id,
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
