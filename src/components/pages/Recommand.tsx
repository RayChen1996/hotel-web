import React from "react";
import SectionTitle from "../SectionTitle";
import { StaticImageData } from "next/image";
import Img1 from "@/../public/khadeeja-yasser-msFZE7d9KB4-unsplash.jpg";
import Img2 from "@/../public/photo-1549638441-b787d2e11f14.avif";
import Img3 from "@/../public/photo-1621891334481-5c14b369d9d7.avif";

import RoomItem from "../GridItmes/Room";
interface RoomsType {
  name: string;
  price: number;
  src: StaticImageData;
}
export default function Recommand() {
  const rooms: RoomsType[] = [
    {
      name: "twin room",
      price: 3350,
      src: Img1,
    },
    {
      name: "Double Room",
      price: 2460,
      src: Img2,
    },
    {
      name: "Deluxe Single Room",
      price: 1899,
      src: Img3,
    },
  ];
  return (
    <div className=" relative text-gray-400  px-5 py-6 bg-white">
      <div className=" w-10/12 m-auto">
        <SectionTitle
          title="Recommend"
          subTitle="You may be interested in our popular rooms"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 relative">
          {rooms.map((item, key) => {
            return <RoomItem key={key} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
