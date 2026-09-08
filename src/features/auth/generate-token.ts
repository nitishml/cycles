export function generateOTP() {
    return (crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000)
        .toString()
        .padStart(6, "0");
}

export function generateResetToken(): string {
    const bytes = new Uint8Array(32); // 256 bits
    crypto.getRandomValues(bytes);
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');  // base64url, no padding
}


export function generateActivateToken(): string {
    const bytes = new Uint8Array(32); // 256 bits
    crypto.getRandomValues(bytes);
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');  // base64url, no padding
}