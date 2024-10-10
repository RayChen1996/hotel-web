import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { passwordSchema } from "./_schema";

export const signInSchema = z.object({
  country: z.string(),
  countryCode: z.string(),
  username: z
    .string({ required_error: "請輸入帳號" })
    .min(1, { message: "請輸入帳號" }),
  password: passwordSchema,
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const defaultValues: SignInSchema = {
  country: "",
  countryCode: "886",
  username: "",
  password: "",
};

export const resolver = zodResolver(signInSchema);
