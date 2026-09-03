import { pgEnum } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum('gender_enum', [
    'M',
    'F',
    'O'
]);

export const paymentModeEnum = pgEnum('payment_mode_enum', [
    "CASH",
    "CHEQUE",
    "UPI",
    "ONLINE",
    "DD",
    "CRYPTO"
])
