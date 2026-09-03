import { db } from "@/db/drizzle";
import { seva } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { validateRole } from "@/features/auth/role-guard";
import { getSession } from "@/features/auth/get-session";
import { addSevaApiSchema } from "@/features/seva/types";

export async function GET() {
    try {
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

        const data = await db
            .select()
            .from(seva)
            .where(eq(seva.isActive, true))

        if (!data) return NextResponse.json({
            success: false,
            message: "No Seva",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                data: {
                    seva: data
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching seva list: ', error);
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

        const { authorized } = await validateRole(["DIRECTOR", "STAFF"]);
        if (!authorized) return NextResponse.json({
            success: false,
            message: "Forbidden",
            data: null,
        }, { status: 403 });

        const body = await request.json();
        const validatedData = addSevaApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const { title, description, schedule } = validatedData.data

        const [newSeva] = await db
            .insert(seva)
            .values({
                title,
                description,
                schedule,
                isActive: true,
            })
            .returning({
                id: seva.id
            })

        if (!newSeva) return NextResponse.json({
            success: false,
            message: "Signup Failed",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Seva Created Successfuly",
                data: {
                    id: newSeva.id,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error creating seva: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
