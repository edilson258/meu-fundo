import {z} from "zod"

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  HASH_SALT: z.string(),
  AUTH_SECRET: z.string(),
});

console.log(process.env);

// export const Env = EnvSchema.parse(process.env);
