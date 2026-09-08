import { createId } from "@/lib/nanoid-gen";
import { pgTable, text, timestamp, boolean, uniqueIndex, index, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text("id").primaryKey().$defaultFn(() => createId()),

    name: text("name").notNull(),
    mobile: text("mobile").notNull().unique(),
    email: text("email").notNull().unique(),

    hashedPassword: text("hashed_password"),

    loginAttempts: integer("login_attempts").notNull().default(0),

    isActivated: boolean("is_activated").notNull().default(false),
    mobileVerified: boolean("mobile_verified").notNull().default(false),
    emailVerified: boolean("email_verified").notNull().default(false),
    blacklisted: boolean("blacklisted").default(false),
    deleted: boolean("deleted").default(false),

    activatedAt: timestamp("activated_at", { mode: 'date', withTimezone: true }),
    mobileVerifiedAt: timestamp("mobile_verified_at", { mode: 'date', withTimezone: true }),
    emailVerifiedAt: timestamp("email_verified_at", { mode: 'date', withTimezone: true }),
    deletedAt: timestamp("deleted_at", { mode: 'date', withTimezone: true }),
    blacklistedAt: timestamp("blacklisted_at", { mode: 'date', withTimezone: true }),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    uniqueIndex('idx_user_mobile').on(table.mobile),
]);





