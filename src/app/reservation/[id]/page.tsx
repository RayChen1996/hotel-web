import React from "react";

import Link from "next/link";
export default function Page() {
  // const reservationDetails = [
  //   { label: "GUEST", value: "Annalise Parisian" },
  //   { label: "PHONE", value: "+886 9 32 456 789" },
  //   { label: "ROOM", value: "Deluxe Single Room / 5 Nights" },
  //   { label: "CHECK-IN", value: "2019/8/7" },
  //   { label: "CHECK-OUT", value: "2019/8/12" },
  // ];
  return (
    <div className="relative w-11/12 lg:w-6/12   m-auto  ">
      <div>
        <h3 className="text-4xl text-black font-bold leading-[55px] mb-12 mt-10">
          Reservation <br /> received!
        </h3>
        <div>
          <div className=" pt-6 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500 font-bold">GUEST</div>
            <div className="text-lg text-gray-700">Annalise Parisian</div>
          </div>

          <div className="pb-6 border-b border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500 font-bold">PHONE</div>
            <div className="text-lg text-gray-700">+886 9 32 456 789</div>
          </div>
        </div>

        <div className="pb-6 pt-6 border-b border-gray-200 flex justify-between items-center py-4">
          <div className="text-sm text-gray-500 uppercase font-bold">room</div>
          <div className="text-lg text-gray-700">
            deluxe single room / 5 nights
          </div>
        </div>

        <div>
          <div className="pt-6  border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500 uppercase font-bold">
              check-in
            </div>
            <div className="text-lg text-gray-700">2019/8/7</div>
          </div>

          <div className="pb-6 border-b border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500 uppercase font-bold">
              check-out
            </div>
            <div className="text-lg text-gray-700">2019/8/12</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="mt-[50px] btn w-1/2 rounded-none bg-white border-blue my-6 h-[72px] uppercase">
            edit reservation
          </button>
          <Link
            href={`/`}
            className="mt-[50px] btn w-1/2 rounded-none bg-blue border-none text-white my-6 h-[72px] uppercase"
          >
            <button className="uppercase">homepage</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
