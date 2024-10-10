"use client";

import React from "react";
// import { useRouter } from "next/navigation";
// import {
//   useForm,
//   FormProvider,
//   useFormContext,
//   SubmitHandler,
//   useWatch,
// } from "react-hook-form";
import { atom, Provider, useAtomValue } from "jotai";

// NOTE zustand
// import useTokenStore from "@/zustand/useTokenStore";

const stepAtom = atom(0);

export default function SignUpPage() {
  return (
    // <FormProvider  >
    <div className="card">
      <form className={"card-body pt-6 lg:pt-32"}>
        <h2 className="card-title text-primary">Sign Up</h2>
        <Provider>
          <FormArea loading={false} />
        </Provider>
      </form>
    </div>
    // </FormProvider>
  );
}
type FormAreaProps = {
  loading: boolean;
};
function FormArea({ loading }: FormAreaProps) {
  const step = useAtomValue(stepAtom);
  console.log(loading);
  switch (step) {
    default:
      return null;
  }
}
