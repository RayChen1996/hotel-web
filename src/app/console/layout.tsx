import Link from "next/link";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:flex">
      <div className="drawer lg:drawer-open lg:w-80 ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content   flex-col items-center justify-center hidden">
          <label
            htmlFor="my-drawer-2"
            className="btn   drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu [&>li]:border-b-2 [&>li]:border-gray-100  bg-white shadow border text-base-content min-h-full w-80 p-4">
            <li>
              <Link href={"/console/rooms"}>房型管理</Link>
            </li>
            <li>
              <Link href={"/console/orders"}>訂單管理</Link>
            </li>
            {/* <li>
              <Link href={"/console/news"}>最新消息管理</Link>
            </li>
            <li>
              <Link href={"/console/foods"}>美味佳餚管理</Link>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="flex-1 bg-white text-black">{children}</div>
    </div>
  );
}
