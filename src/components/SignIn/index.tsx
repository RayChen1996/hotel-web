"use client";

import React from "react";

// import { redirect } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useTokenStore from "@/zustand/useTokenStore";
import toast from "react-hot-toast";
// NOTE zustand
// import useTokenStore from "@/zustand/useTokenStore";

// !SECTION
// 定義 Zod 驗證模式
const schema = z.object({
  email: z.string().min(1, { message: "帳號是必填的" }),
  password: z
    .string()
    .min(8, { message: "密碼必須至少 8 位數" })
    .regex(/[A-Z]/, { message: "密碼必須包含至少一個大寫字母" })
    .regex(/[a-z]/, { message: "密碼必須包含至少一個小寫字母" })
    .regex(/[0-9]/, { message: "密碼必須包含至少一個數字" }),
});
interface SignInFormData {
  email: string;
  password: string;
}

interface SignInResponse {
  status: boolean;
  success: boolean;
  token: string;
}
/** - post loading `atom` */
// const postLoadingAtom = atom(false);
export default function SignIn() {
  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
  });
  const setToken = useTokenStore((state) => state.setToken);

  const signInMutation = useMutation<SignInResponse, Error, SignInFormData>({
    mutationFn: async (data: SignInFormData) => {
      const response = await axios.post<SignInResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/login`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status && data.token) {
        setToken(data.token);
        toast.success("登入成功");
        // console.log("Token saved:", data.token);
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.error("Error signing up:", error);
    },
  });

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    signInMutation.mutate(data);

    // 在這裡處理登入邏輯
  };
  return (
    <div>
      <div className="card">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="card-title text-blue">登入</h2>
          <div className="form-control">
            <label className="label" htmlFor="acc">
              <span className="label-text">帳號</span>
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    id="acc"
                    {...field}
                    className="input input-bordered bg-white focus:input-primary active:border-blue focus:border-blue w-full join-item"
                    placeholder="Enter Account"
                  />

                  {error && (
                    <p className="text-error text-sm mt-1">{error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="pwd">
              <span className="label-text">密碼</span>
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    id="pwd"
                    type="password"
                    {...field}
                    className="input input-bordered bg-white focus:input-primary invalid:input-error w-full join-item"
                    placeholder="Enter Password"
                  />
                  {error && (
                    <p className="text-error text-sm mt-1">{error.message}</p>
                  )}
                </>
              )}
            />

            <div className="label">
              <span className="label-text-alt">
                八位數的英文和數字，英文必含大小寫
              </span>
            </div>
          </div>
          <div className="card-actions flex-col">
            <button
              type="submit"
              className="btn bg-blue text-white border-none btn-block"
            >
              {/* {postLoading && !authProviderRef.current ? (
                <span className="loading loading-spinner" />
              ) : null} */}
              登入
            </button>
            <Link
              href="/sign-up"
              className="btn btn-primary border-blue btn-outline btn-block"
            >
              註冊
            </Link>
            <div className="flex flex-col items-center w-full">
              <label className="label">
                <span className="label-text text-primary">
                  <Link href="/forget-password">忘記密碼</Link>
                </span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
