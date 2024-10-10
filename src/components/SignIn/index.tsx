"use client";

import React from "react";

// import { redirect } from "next/navigation";
import Link from "next/link";

// NOTE zustand
// import useTokenStore from "@/zustand/useTokenStore";

// !SECTION

/** - post loading `atom` */
// const postLoadingAtom = atom(false);
export default function SignIn() {
  return (
    <div>
      <div className="card">
        <form className="card-body">
          <h2 className="card-title text-blue">登入</h2>
          <div className="form-control">
            <label className="label" htmlFor="acc">
              <span className="label-text">帳號</span>
            </label>
            <div className="join">
              <input
                id="acc"
                className="input input-bordered bg-white focus:input-primary active:border-blue focus:border-blue w-full join-item"
                placeholder="Enter Account"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="pwd">
              <span className="label-text">密碼</span>
            </label>
            <div className="join">
              <input
                id="pwd"
                className="input input-bordered bg-white focus:input-primary invalid:input-error w-full join-item"
                placeholder="Enter Password"
              />
            </div>
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
