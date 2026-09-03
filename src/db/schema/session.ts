import { createId } from "@/lib/nanoid-gen";
import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const session = pgTable("session", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),

    expiresAt: timestamp("expires_at", { mode: 'date', withTimezone: true }).notNull(),
    token: text("token").notNull().unique(),

    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    deviceHash: text("device_hash"),

    deviceId: text("device_id"), //unique id for mobiles
    isWeb: boolean("is_web").default(true), //change this when we get custom mobile apps

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    index('idx_session_user').on(table.userId),
]);

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));