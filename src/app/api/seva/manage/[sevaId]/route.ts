import { db } from "@/db/drizzle";
import { count, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { validateRole } from "@/features/auth/role-guard";
import { seva, sevaTicket } from "@/db/schema";
import z from "zod";
import { getSession } from "@/features/auth/get-session";
import { editSevaApiSchema } from "@/features/seva/types";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ sevaId: string }> }
) {
    try {
        const { sevaId } = await params
        if (!sevaId) return NextResponse.json({
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

        const { authorized } = await validateRole(["DIRECTOR", "STAFF"]);
        if (!authorized) return NextResponse.json({
            success: false,
            message: "Forbidden",
            data: null,
        }, { status: 403 });

        const [result] = await db
            .select({
                id: seva.id,
                title: seva.title,
                description: seva.description,
                schedule: seva.schedule,
                bookingCount: count(sevaTicket.id)
            })
            .from(seva)
            .leftJoin(sevaTicket, eq(sevaTicket.sevaId, seva.id))
            .where(eq(seva.id, sevaId))
            .groupBy(seva.id)
            .orderBy(seva.displayOrder);

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
        console.error('Error fetching seva details: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ sevaId: string }> }
) {
    try {
        const { sevaId } = await params
        if (!sevaId) return NextResponse.json({
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

        const { authorized } = await validateRole(["DIRECTOR", "STAFF"]);
        if (!authorized) return NextResponse.json({
            success: false,
            message: "Forbidden",
            data: null,
        }, { status: 403 });

        const body = await request.json();
        const validatedData = editSevaApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        await db
            .update(seva)
            .set({
                title: values.title,
                description: values.description,
                schedule: values.schedule,

            })
            .where(eq(seva.id, sevaId))


        return NextResponse.json(
            {
                success: true,
                message: "Seva Edited Successfuly",
                data: {
                    id: sevaId
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating seva: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
