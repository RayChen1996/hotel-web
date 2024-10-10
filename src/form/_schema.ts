import isMobilePhone from "validator/lib/isMobilePhone";
import z from "zod";

/** - 密碼規則 */
export const passwordSchema = z
  .string({ required_error: "請輸入密碼" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "請包含大寫英文",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "請包含小寫英文",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "請包含數字",
  })
  .refine((password) => password.length >= 8, {
    message: "密碼長度不足",
  });

/** - 手機規則 */
export const mobileSchema = z
  .string()
  .min(1, { message: "請輸入手機" })
  .refine((value) => isMobilePhone(value), { message: "手機格式錯誤" });
