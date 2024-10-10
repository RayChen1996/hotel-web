import React from "react";
import Img6 from "@/../public/photo-1559841771-599b6eeaca62.avif";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  return (
    <div className="relative w-7/12 m-auto grid grid-cols-1 md:grid-cols-2 gap-x-5 mt-4">
      <div>
        <h3 className="text-4xl text-black font-bold leading-[55px]">
          Reservation <br /> information
        </h3>
        <div className=" mt-[52px]">
          <span className="flex items-center gap-2">
            <i className="material-icons">people</i>
            <span>Name</span>
          </span>
          <input
            type="text"
            placeholder="Annalise Parisian"
            className=" input input-md w-full  border-t-0 border-x-0 rounded-none  bg-white border-b border-gray-400"
          />
        </div>

        <div className=" mt-[52px]">
          <span className="flex items-center gap-2">
            <i className="material-icons">phone</i>
            <span>Phone</span>
          </span>
          <input
            type="text"
            placeholder="+886 9 32 45"
            className=" input input-md w-full border-t-0 border-x-0 rounded-none  bg-white border-b border-gray-400"
          />
        </div>
        <Link href={`/reservation/${123}`}>
          <button
            type="button"
            className=" mt-[50px] btn rounded-none bg-blue border-none text-white w-full"
          >
            reserve now
          </button>
        </Link>
      </div>
      <div className="flex-1   bg-black">
        <div className="flex flex-1 flex-col  bg-white border-2">
          <div className="flex items-center border">
            <figure className=" relative w-full h-52">
              <Image
                src={Img6}
                alt=""
                fill
                className="aspect-[4/3] object-cover"
                sizes="530px"
              />
            </figure>
          </div>
          <div className="flex items-center border ">
            <span className="px-6 py-8">Deluxe single Room</span>
          </div>
          <div className="flex items-center border px-6 py-8">
            <span className="material-icons">date_range</span>
            <select className=" select bg-white w-full">
              <option value="">check-in</option>
            </select>
          </div>
          <div className="flex items-center border px-6 py-8">
            <span className="material-icons">hotel</span>
            <select className=" select bg-white w-full">
              <option value="">check-in</option>
            </select>
          </div>

          <div className="flex flex-col w-full border px-6 py-8">
            <div className=" flex justify-around py-3">
              <span>$1,899 × 2 night</span>
              <span>$3,798</span>
            </div>

            <div className=" flex justify-around  py-3">
              <span>$1,899 × 2 night</span>
              <span>$3,798</span>
            </div>

            <div className=" flex justify-around py-3">
              <span>$1,899 × 2 night</span>
              <span>$3,798</span>
            </div>

            <hr />
            <div className=" flex justify-around py-3">
              <span className=" uppercase">total</span>
              <span>$10,998</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
