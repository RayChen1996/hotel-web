import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

// import {
//   defaultValues as memberInputDefaultValues,
//   memberInputSchema as _memberInputSchema,
// } from "./memberInput";

// export const memberInputSchema = _memberInputSchema;

export const signUpSchema = z.object({
  // memberInput: memberInputSchema,
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const defaultValues: SignUpSchema = {
  // memberInput: memberInputDefaultValues,
  verificationCode: "",
};

export const resolver = zodResolver(signUpSchema);
