"use client";

import React from "react";
// import { SubmitHandler, useForm } from "react-hook-form";

import { Provider } from "jotai";

/** - 重設密碼 */
export default function ResetPassword() {
  return (
    <Provider>
      <div className="grid gap-4 p-4">
        <SubmitSlice />
      </div>
    </Provider>
  );
}

/** - 送出 */
function SubmitSlice() {
  // const { back } = useRouter();
  // const setSent = useSetAtom(sentAtom);

  // if (!sent) {
  //   return <></>;
  // }
  return (
    <form className="grid gap-2">
      <div className="form-control">
        <label className="label" htmlFor="verificationCode">
          <span className="label-text">手機驗證碼</span>
        </label>
        <input
          id="verificationCode"
          className="input input-bordered bg-white focus:input-primary invalid:input-error w-full join-item"
          placeholder="請輸入手機驗證碼"
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="password">
          <span className="label-text">新密碼</span>
        </label>

        <div className="label">
          <span className="label-text-alt">
            八位數的英文和數字，英文必含大小寫
          </span>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        // disabled={resetPasswordLoading}
      >
        {/* {resetPasswordLoading ? (
          <span className="loading loading-spinner" />
        ) : null} */}
        送出
      </button>
    </form>
  );
}
