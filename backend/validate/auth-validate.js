import z from "zod";

const loginSchema = z.object({
  email: z
    .string({ error: "Email Required" })
    .trim()
    .email()
    .min(3, { message: "Min email characters length 3" })
    .max(256, { message: "Max email characters length 256" }),
  password: z
    .string({ error: "Password Required" })
    .trim()
    .min(6, { message: "Min Password characters length 6" })
    .max(1024, { message: "Max Password characters length 1024" }),
});

const registerSchema = loginSchema.extend({
    username: z
    .string({ error: "Username Required" })
    .trim()
    .min(3, { message: "Min username characters length 3" })
    .max(256, { message: "Max username characters length 256" }),
})

export {loginSchema,registerSchema}