"use client";
import Link from "next/link";
import React from "react";
import { enterHome } from "@/jotai/Layout";
import { useAtomValue } from "jotai";
/** - 標頭1 */
export default function AppHeader() {
  const getAtom = useAtomValue(enterHome);
  if (getAtom) return null;
  if (!getAtom)
    return (
      <header className="min-h-20 sticky top-0 shadow-md flex items-center justify-between bg-white z-50">
        <span className="bg-gray-700 text-3xl text-white italic font-extrabold px-5 py-3 h-20 justify-center items-center inline-flex">
          <Link
            href="/"
            className="flex px-3 items-center -tracking-[10px] justify-center no-underline text-white h-full w-full m-0 p-0"
          >
            HH
          </Link>
        </span>
        <span className=" flex items-center">
          <span className="material-icons">date_range</span>
          <select className="uppercase select bg-white">
            <option value="" disabled>
              check-in & Check-out
            </option>
          </select>
        </span>
        <span className=" flex items-center">
          <span className="material-icons">hotel</span>
          <select name="" id="" className="uppercase select bg-white">
            <option value="">room</option>
          </select>
        </span>
        <div className="bg-blue  h-20 justify-center items-center flex ">
          <Link href={`/reservation`} className="px-10 text-white ">
            <button className="uppercase">reserve now</button>
          </Link>
        </div>
      </header>
    );
}
