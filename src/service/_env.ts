import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string({ required_error: "Api url is missing!" }),
  NEXT_PUBLIC_API_INTERNAL_URL: z.string({
    required_error: "Api internal url is missing!",
  }),
  NEXT_PUBLIC_SECRET_KEY: z.string({
    required_error: "Secret key is missing!",
  }),
});

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error("Invalid variables", error.format());
  throw new Error("Invalid variables!");
}

export const env = data;
