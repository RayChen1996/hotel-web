import React from "react";

/** - 標頭1 */
export default function AppHeader() {
  return (
    <header className="min-h-20 sticky top-0 shadow-md flex items-center justify-between">
      <span className=" bg-gray-700 text-3xl text-white italic font-extrabold px-5 py-3 h-20 justify-center items-center flex">
        HH
      </span>
      <span className=" flex items-center">
        <span className="material-icons">date_range</span>
        <select className="uppercase">
          <option value="" disabled>
            check-in & Check-out
          </option>
        </select>
      </span>
      <span className=" flex items-center">
        <span className="material-icons">hotel</span>
        <select name="" id="" className="uppercase">
          <option value="">room</option>
        </select>
      </span>
      <div className="bg-blue  h-20 justify-center items-center flex">
        <button className="uppercase px-10 text-white">reserve now</button>
      </div>
    </header>
  );
}
