
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { session } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revokeSessionSchema } from "@/features/user/types";
import { getSession } from "@/features/auth/get-session";

export async function DELETE(request: NextRequest) {
    try {
        const sessionData = await getSession();
        if (!sessionData) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const body = await request.json();
        const validatedData = revokeSessionSchema.safeParse(body);
        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 404 });

        const { sessionId } = validatedData.data

        const [sessionToken] = await db
            .select({
                token: session.token
            })
            .from(session)
            .where(eq(session.id, sessionId))

        if (!sessionToken) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 404 });

        await db.delete(session).where(eq(session.id, sessionId))

        return NextResponse.json(
            {
                success: true,
                data: {},
                message: "Done"
            },
            { status: 200 }
        );


    } catch (error) {
        console.error('Error revoking session:  ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}