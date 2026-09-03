
export const SESSION_COOKIE = 'cycles.session_token';
export const TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

const ITERATIONS = 100_000;
const SALT_LENGTH = 16;
const KEY_LENGTH = 256;
const ALGORITHM = "SHA-256";

const encoder = new TextEncoder();

export function generateSessionToken(): string {
    const bytes = new Uint8Array(32); // 256 bits
    crypto.getRandomValues(bytes);
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');  // base64url, no padding
}

function toHex(buffer: Uint8Array): string {
    return [...buffer].map(b => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
}

async function derive(password: string, salt: Uint8Array) {
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const bits = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: salt.buffer as ArrayBuffer,
            iterations: ITERATIONS,
            hash: ALGORITHM
        },
        keyMaterial,
        KEY_LENGTH
    );

    return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const hash = await derive(password, salt);

    return `pbkdf2$${ITERATIONS}$${toHex(salt)}$${toHex(hash)}`;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
    if (a.length !== b.length) return false;

    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        diff |= a[i] ^ b[i];
    }

    return diff === 0;
}

export async function verifyPassword(
    password: string,
    stored: string
): Promise<boolean> {

    const [, iter, saltHex, hashHex] = stored.split("$");

    const salt = fromHex(saltHex);
    const originalHash = fromHex(hashHex);

    const attempt = await derive(password, salt);

    return timingSafeEqual(attempt, originalHash);
}