import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import numbro from "numbro";
import React from "react";
export interface RoomsType {
  name: string;
  price: number;
  src: StaticImageData;
}
interface RoomItemProps {
  data: RoomsType;
}
export default function RoomItem({ data }: RoomItemProps) {
  const { name, price, src } = data;
  return (
    <Link href={`/rooms/${name}`}>
      <div className="text-right" key={name}>
        <figure className="aspect-[4/3] relative">
          <Image src={src} alt="" className=" object-cover" fill />
        </figure>
        <div className="text-2xl font-bold">{name}</div>
        <div>
          {numbro(price ?? 0).format({
            thousandSeparated: true,
            prefix: "\u00A0$\u00A0",
          })}
          NTD / night
        </div>
      </div>
    </Link>
  );
}
