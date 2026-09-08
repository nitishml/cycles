import { createId } from "@/lib/nanoid-gen";
import { relations } from "drizzle-orm";
import { date, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { task, calendar } from ".";

export const taskLedger = pgTable("task_ledger", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    taskId: text("task_id").notNull().references(() => task.id),
    day: date('day', { mode: 'date' }).references(() => calendar.day),

    // count: integer("count").notNull().default(0),
    remarks: text("remarks"),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
},)

export const taskLedgerRelations = relations(taskLedger, ({ one, many }) => ({
    task: one(task, {
        fields: [taskLedger.taskId],
        references: [task.id],
    }),
    day: one(calendar, {
        fields: [taskLedger.day],
        references: [calendar.day],
    }),
}));

