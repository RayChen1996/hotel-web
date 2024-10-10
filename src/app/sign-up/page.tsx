"use client";

import React, { memo } from "react";

import { atom, Provider, useAtomValue } from "jotai";
import FieldLabel from "@/components/FieldLabel";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
// NOTE zustand
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useTokenStore from "@/zustand/useTokenStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const stepAtom = atom(0);

const signUpSchema = z.object({
  name: z.string().min(1, "請輸入姓名"),
  email: z.string().min(1, "請輸入信箱").email("請輸入有效的信箱格式"),
  password: z
    .string()
    .min(8, "密碼至少需要8個字符")
    .regex(/[A-Z]/, "密碼需要包含至少一個大寫字母")
    .regex(/[a-z]/, "密碼需要包含至少一個小寫字母")
    .regex(/[0-9]/, "密碼需要包含至少一個數字"),
  phone: z
    .string()
    .min(1, "請輸入手機號碼")
    .regex(/^09\d{8}$/, "請輸入有效的手機號碼格式"),
  birthday: z.string().optional(),
  address: z.object({
    zipcode: z.string().min(1, "請輸入郵遞區號"),
    detail: z.string().min(1, "請輸入地址"),
  }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      address: {
        zipcode: "",
        detail: "",
      },
    },
  });
  return (
    <FormProvider {...form}>
      <div className="card">
        <h2 className="card-title text-primary">Sign Up</h2>
        <Provider>
          <FormArea loading={false} />
        </Provider>
      </div>
    </FormProvider>
  );
}
type FormAreaProps = {
  loading: boolean;
};
function FormArea({ loading }: FormAreaProps) {
  const step = useAtomValue(stepAtom);
  console.log(loading);
  switch (step) {
    case 0:
      return <Step3 loading={loading} />;
    default:
      return null;
  }
}

type Step3Props = {
  loading: boolean;
};

interface SignUpResponse {
  status: boolean;
  success: boolean;
  token: string;
}
const Step3 = memo(function Step3({ loading }: Step3Props) {
  const { handleSubmit, control } = useFormContext<SignUpFormData>();

  const setToken = useTokenStore((state) => state.setToken);

  const signUpMutation = useMutation<SignUpResponse, Error, SignUpFormData>({
    mutationFn: async (data: SignUpFormData) => {
      const response = await axios.post<SignUpResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/signup`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status && data.token) {
        setToken(data.token);
        console.log("Token saved:", data.token);
      }
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });
  const onSubmit = (formData: SignUpFormData) => {
    console.log(formData);
    signUpMutation.mutate(formData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err);
      })}
    >
      <div className="form-control">
        <FieldLabel label="手機號碼" required />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="tel"
                placeholder="手機號碼"
                className="input focus:input-primary input-bordered invalid:input-error w-full bg-white"
              />
              {error && (
                <p className="text-error text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div className="form-control">
        <FieldLabel label="密碼" required />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="password"
                placeholder="密碼"
                className="input focus:input-primary input-bordered invalid:input-error w-full bg-white"
              />
              {error && (
                <p className="text-error text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div className="form-control">
        <FieldLabel label="姓名" required />
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="text"
                placeholder="請輸入姓名"
                className="input input-bordered focus:input-primary invalid:input-error w-full bg-white"
              />
              {error && (
                <p className="text-error text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div className="form-control">
        <FieldLabel label="生日" />
        <Controller
          name="birthday"
          control={control}
          defaultValue=""
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <>
              <input
                {...field}
                type="date"
                placeholder="YYYY/MM/DD"
                onChange={(e) => {
                  const v = e.target.value;

                  const formatted = v
                    .replace(/\D/g, "")
                    .replace(/(\d{4})(\d{1,2})?(\d{1,2})?/, (_, y, m, d) => {
                      if (!m) return y;
                      if (!d) return `${y}/${m}`;
                      return `${y}/${m}/${d}`;
                    });
                  onChange(formatted);
                }}
                className="input input-bordered focus:input-primary w-full bg-white"
              />
              {error && (
                <p className="text-error text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div className="form-control">
        <FieldLabel label="信箱" required />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="email"
                placeholder="信箱"
                className="input input-bordered focus:input-primary invalid:input-error w-full join-item bg-white"
              />

              {error && (
                <p className="text-error text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div className="form-control">
        <FieldLabel label="郵遞區號" required />

        <Controller
          name="address.zipcode"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="text"
                placeholder="郵遞區號"
                className="input focus:input-primary input-bordered invalid:input-error w-full bg-white"
              />
              {error && (
                <p className="text-error text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div className="form-control">
        <FieldLabel label="地址" required />

        <Controller
          name="address.detail"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="text"
                placeholder="地址"
                className="input focus:input-primary input-bordered invalid:input-error w-full bg-white"
              />
              {error && (
                <p className="text-error text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block text-white"
        disabled={loading}
      >
        {loading ? <span className="loading loading-spinner" /> : null}註冊
      </button>
    </form>
  );
});
