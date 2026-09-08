"use server"
import { headers } from "next/headers";

export async function getRequestMetadata(req: Request) {
    const headerStore = await headers();

    // IP Address
    // Vercel sets x-forwarded-for, fallback chain for other environments
    const ip =
        headerStore.get('x-forwarded-for')?.split(',')[0].trim() ??
        headerStore.get('x-real-ip') ??
        '0.0.0.0'; // fallback if not resolvable

    // User Agent
    const userAgent = headerStore.get('user-agent') ?? 'unknown';

    // // Device Hash — stable fingerprint from available signals - verify before using
    // const raw = `${userAgent}`;
    // const encoded = new TextEncoder().encode(raw);
    // const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    // const hashArray = Array.from(new Uint8Array(hashBuffer));
    // const deviceHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // return { ip, userAgent, deviceHash };
    return { ip, userAgent };
}