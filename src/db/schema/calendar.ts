import { relations } from "drizzle-orm";
import { boolean, date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { event } from ".";

export const calendar = pgTable("calendar", {
    day: date('day', { mode: 'date' }).primaryKey().notNull(),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})
export const calendarRelations = relations(calendar, ({ many }) => ({
    events: many(event)
}));