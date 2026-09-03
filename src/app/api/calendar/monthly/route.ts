import { db } from "@/db/drizzle";
import { and, gte, lte, asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { calendar, event } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const monthParam = searchParams.get('month'); //0-11
        const yearParam = searchParams.get('year');

        if (!monthParam || !yearParam) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const month = parseInt(monthParam);
        const year = parseInt(yearParam);

        // Validate month range
        if (isNaN(month) || month < 0 || month > 11) {
            return NextResponse.json({
                success: false,
                message: "Bad Request",
                data: null,
            }, { status: 400 });
        }

        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0); // Last day of month



        const events = await db.query.calendar.findMany({
            where: and(
                gte(calendar.day, startDate),
                lte(calendar.day, endDate)
            ),
            columns: {
                day: true,
            },
            orderBy: asc(calendar.day),
            with: {
                events: {
                    columns: {
                        id: true,
                        title: true,
                        isHandled: true,
                    },
                    where: eq(event.isActive, true)
                }
            }
        })

        if (!events) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                data: {
                    events
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching monthly event list', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}