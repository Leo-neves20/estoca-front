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

const parsedEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_INTERNAL_URL: process.env.NEXT_PUBLIC_API_INTERNAL_URL,
  NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
};

const { success, error, data } = envSchema.safeParse(parsedEnv);

if (!success) {
  const errosObj: Partial<typeof parsedEnv> = {};

  Object.entries(error.flatten().fieldErrors).forEach(([key, value]) => {
    errosObj[key as keyof typeof errosObj] = value.join(", ");
  });

  throw new Error(`Invalid variables! ${JSON.stringify(errosObj, null, 2)}`);
}

export const env = data;
