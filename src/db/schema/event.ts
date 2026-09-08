import { createId } from "@/lib/nanoid-gen";
import { relations } from "drizzle-orm";
import { boolean, date, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { calendar } from "./calendar";

export const event = pgTable("event", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    day: date('day', { mode: 'date' }).references(() => calendar.day),

    isActive: boolean("is_active").default(false).notNull(),
    isPinned: boolean("is_pinned").default(false).notNull(),
    isOneTime: boolean("is_one_time").default(false).notNull(),
    isHandled: boolean("is_handled").default(false).notNull(),

    displayOrder: integer("display_order").notNull().default(-1),
    title: text("title").notNull(),

    description: text("description"),
    remarks: text("remarks"),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
},)

export const eventRelations = relations(event, ({ one, many }) => ({
    day: one(calendar, {
        fields: [event.day],
        references: [calendar.day],
    }),
}));

