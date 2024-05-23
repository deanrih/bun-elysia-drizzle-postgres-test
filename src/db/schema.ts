import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
    id: text("id").primaryKey().notNull(),
    email: text("email").unique().notNull(),
    firstName: text("firstName"),
    lastName: text("lastName"),
    phone: text("phone"),
    avatar: text("avatar"),
    acitve: boolean("acitve").default(true).notNull(),
    isApproved: boolean("isApproved").default(false).notNull(),
    deleted: boolean("deleted").default(false).notNull(),
    rating: integer("rating").default(0).notNull(),
    sex: text("sex").default("male"),
    dob: timestamp("dob", { precision: 3, mode: "date" }),
    approvedAt: timestamp("approvedAt", { precision: 3, mode: "date" }),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  });
  
  export const userRelations = relations(user, ({ many, one }) => ({
    meta: one(userMeta, {
      fields: [user.id],
      references: [userMeta.userId],
    }),
    address: one(userAddress, {
      fields: [user.id],
      references: [userAddress.userId],
    }),
    documents: many(userDocuments),
  }));


export const userDocuments = pgTable("UserDocuments", {
    id: serial("id").primaryKey().notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
    document: text("document").notNull(),
    expiry: timestamp("expiry", { precision: 3, mode: "date" }),
    fileName: text("fileName").notNull(),
    size: integer("size").notNull(),
    otherDetails: json("otherDetails").$type<Record<string, string>>(),
    fileType: text("fileType").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  });
  
  export const userDocumentsRelations = relations(userDocuments, ({ one }) => ({
    user: one(user, {
      fields: [userDocuments.userId],
      references: [user.id],
    }),
  }));
  
  export const userMeta = pgTable("UserMeta", {
    id: serial("id").primaryKey().notNull(),
    userId: text("userId")
      .unique()
      .notNull()
      .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
    value: jsonb("metaData"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  });
  
  export const userMetaRelation = relations(userMeta, ({ one }) => ({
    meta: one(user, {
      fields: [userMeta.userId],
      references: [user.id],
    }),
  }));
  
  export const userAddress = pgTable("UserAddress", {
    id: serial("id").primaryKey().notNull(),
    userId: text("userId")
      .unique()
      .notNull()
      .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
    addressLine1: text("addressLine1").notNull(),
    addressLine2: text("addressLine2").notNull(),
    city: text("city").notNull(),
    pinCode: text("pinCode").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }).notNull(),
  });
  
  export const userAddressRelations = relations(userAddress, ({ one }) => ({
    address: one(user, {
      fields: [userAddress.userId],
      references: [user.id],
    }),
  }));