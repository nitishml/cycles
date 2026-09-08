
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { session } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/features/auth/get-session";

export async function GET(request: NextRequest) {
    try {
        const sessionData = await getSession();
        if (!sessionData) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const userData = await db
            .select({
                id: session.id,
                createdAt: session.createdAt,
                userAgent: session.userAgent,
                ipAddress: session.ipAddress,
            })
            .from(session)
            .where(eq(session.userId, sessionData.userId))
            .orderBy(desc(session.createdAt))

        if (!userData) return NextResponse.json({
            success: false,
            message: "Not Found",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                data: userData
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching staff user data: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}