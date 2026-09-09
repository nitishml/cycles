import { db } from "@/db/drizzle";
import { routine } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { getSession } from "@/features/auth/get-session";

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
                id: routine.id,
                title: routine.title
            })
            .from(routine)
            .where(eq(routine.isActive, true))

        if (!data) return NextResponse.json({
            success: false,
            message: "No Tasks",
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

