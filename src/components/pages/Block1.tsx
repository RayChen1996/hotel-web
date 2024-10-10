import Link from "next/link";
import React from "react";

export default function Block1() {
  return (
    <div className="relative flex justify-end w-11/12 m-auto py-12">
      <VerticalTitle />
      <div className="flex flex-col [&>div]:py-6 [&>div]:px-8 bg-white border-2 w-80">
        <div className="flex items-center border gap-3">
          <span className="material-icons">date_range</span>
          {/* <select className=" select bg-white w-full">
            <option value="">check-in</option>
          </select> */}
          <input type="date" className=" bg-white" />
        </div>
        <div className="flex items-center border  gap-3">
          <span className="material-icons">date_range</span>
          {/* <select className="select bg-white w-full">
            <option value="">check-in</option>
          </select> */}
          <input type="date" className=" bg-white" />
        </div>
        <div className="flex items-center border">
          <span className="material-icons">hotel</span>
          <select className=" select bg-white w-full">
            <option value="">check-in</option>
          </select>
        </div>
        <Link
          href={`/reservation`}
          className="btn bg-blue rounded-none border-none text-white uppercase"
        >
          <button>reserve now</button>
        </Link>
      </div>
    </div>
  );
}
function VerticalTitle() {
  return (
    <div className="left-0 absolute top-7 h-full flex items-center z-30 ">
      <h1 className="transform rotate-90 whitespace-nowrap text-6xl bg-white italic font-light origin-center translate-y-[-50%] text-gray-800">
        HexHotel
      </h1>
    </div>
  );
}
