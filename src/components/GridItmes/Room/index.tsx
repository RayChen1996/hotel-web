import Image from "next/image";
import Link from "next/link";
import numbro from "numbro";
import React from "react";
export interface RoomsType {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  areaInfo: string;
  price: number;

  bedInfo: string;
  imageUrlList: string[];
  maxPeople: number; // 新增 maxPeople
}
interface RoomItemProps {
  data?: RoomsType;
  loading?: boolean;
}
export default function RoomItem({ data, loading }: RoomItemProps) {
  const { name, price, imageUrl, _id } = data ?? {};
  return (
    <Link href={`/rooms/${_id}`}>
      <div className="text-right" key={_id}>
        <figure className="aspect-[4/3] relative">
          {loading ? (
            <span className="skeleton w-20 h-20"></span>
          ) : (
            <Image src={imageUrl || ""} alt="" className="object-cover" fill />
          )}
        </figure>

        {loading ? (
          <div className="skeleton w-20 h-20"></div>
        ) : (
          <div className="text-2xl font-bold">{name}</div>
        )}

        <div>
          {numbro(price ?? 0).format({
            thousandSeparated: true,
            prefix: " \u00A0$\u00A0",
          })}
          NTD / night
        </div>
      </div>
    </Link>
  );
}
