import { z } from "zod";
export const login = z
  .object({
    nik: z.string().min(16),
    password: z.string().min(1),
  })
  .strict();
