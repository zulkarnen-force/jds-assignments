import { User } from "@prisma/client";

export type UserWithPassword = Omit<User, "created_at" | "updated_at" | "id">;
