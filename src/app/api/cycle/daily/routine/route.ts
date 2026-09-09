import { db } from "@/db/drizzle";
import { routine, routineLedger } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { asc, count, eq, and } from "drizzle-orm";
import { getSession } from "@/features/auth/get-session";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const { searchParams } = new URL(request.url); //yyyy-MM-dd
        const dayParam = searchParams.get('day');

        if (!dayParam) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const result = await db
            .select({
                routineId: routine.id,
                routineTitle: routine.title,
                count: count(routineLedger.id),
            })
            .from(routine)
            .leftJoin(
                routineLedger,
                and(
                    eq(routineLedger.routineId, routine.id),
                    eq(routineLedger.day, new Date(dayParam))
                )
            )
            .where(eq(routine.isActive, true))
            .groupBy(routine.id, routine.title)
            .orderBy(asc(routine.displayOrder));

        if (!result) return NextResponse.json({
            success: false,
            message: "No Routines",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                data: {
                    result,
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


