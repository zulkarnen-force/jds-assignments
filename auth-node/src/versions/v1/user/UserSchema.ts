import { z } from "zod";
export const register = z
  .object({
    name: z.string().min(1).max(255),
    nik: z.string().min(16).max(16),
  })
  .strict();
