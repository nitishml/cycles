import { createId } from "@/lib/nanoid-gen";
import { relations } from "drizzle-orm";
import { date, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { routine, calendar } from ".";

export const routineLedger = pgTable("routine_ledger", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    routineId: text("routine_id").notNull().references(() => routine.id),
    day: date('day', { mode: 'date' }).references(() => calendar.day),

    completedAt: timestamp('completed_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
    remarks: text("remarks"),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
},)

export const routineLedgerRelations = relations(routineLedger, ({ one, many }) => ({
    routine: one(routine, {
        fields: [routineLedger.routineId],
        references: [routine.id],
    }),
    day: one(calendar, {
        fields: [routineLedger.day],
        references: [calendar.day],
    }),
}));

