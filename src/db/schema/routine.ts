import { createId } from "@/lib/nanoid-gen";
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { routineFrequenceEnum } from "./enums";

export const routine = pgTable("routine", {
    id: text("id").primaryKey().$defaultFn(() => createId()),

    isActive: boolean("is_active").default(false).notNull(),
    isPinned: boolean("is_pinned").default(false).notNull(),
    isOneTime: boolean("is_one_time").default(false).notNull(),

    frequency: routineFrequenceEnum("frequence").notNull().default("DAILY"),
    displayOrder: integer("display_order").notNull().default(-1),
    title: text("title").notNull(),
    description: text("description").notNull(),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
},)

export const routineRelations = relations(routine, ({ one, many }) => ({

}));

