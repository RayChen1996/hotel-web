import React from "react";
import SectionTitle from "../SectionTitle";
import Image, { StaticImageData } from "next/image";
import Img1 from "@/../public/khadeeja-yasser-msFZE7d9KB4-unsplash.jpg";
import Img2 from "@/../public/photo-1549638441-b787d2e11f14.avif";
import Img3 from "@/../public/photo-1621891334481-5c14b369d9d7.avif";
import Img4 from "@/../public/premium_photo-1674676471380-1258cb31b3ac.avif";
import Img5 from "@/../public/photo-1558392164-be227dfe1c98.avif";
import Img6 from "@/../public/photo-1559841771-599b6eeaca62.avif";
import RoomItem from "../GridItmes/Room";
import numbro from "numbro";
/** - 房間展示區 */
interface RoomsType {
  name: string;
  price: number;
  src: StaticImageData;
}
export default function Rooms() {
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
  ];

  const roomsType2: RoomsType[] = [
    {
      name: "Double Room",
      price: 3350,
      src: Img3,
    },
    {
      name: "Deluxe Double Room",
      price: 2460,
      src: Img4,
    },
  ];

  const roomsType3: RoomsType[] = [
    {
      name: "Twin Room",
      price: 3899,
      src: Img5,
    },
    {
      name: "Deluxe Twin Room",
      price: 3350,
      src: Img6,
    },
  ];
  return (
    <div className="bg-white relative m-auto py-11">
      <div className=" w-10/12 m-auto ">
        <section
          data-aos="fade-left"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 mb-[47px]"
        >
          <SectionTitle
            title="One person"
            subTitle="Enjoy the one and only service"
          />

          {rooms.map((item, key) => {
            return <RoomItem data={item} key={key} />;
          })}
        </section>
        <section
          data-aos="fade-right"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 mb-[47px]"
        >
          <SectionTitle
            title="Two people"
            subTitle="The perfect choice for both of you"
          />

          {roomsType2.map((item, key) => {
            return <RoomItem data={item} key={key} />;
          })}
        </section>

        <section
          data-aos="fade-left"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 mb-[47px]"
        >
          <SectionTitle
            title="Family"
            subTitle="Wanna a big room? there you are"
          />

          {roomsType3.map((item, key) => {
            return <RoomItem data={item} key={key} />;
          })}
        </section>
      </div>
    </div>
  );
}
