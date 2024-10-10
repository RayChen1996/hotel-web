import React from "react";
import SectionTitle from "../SectionTitle";

import { RoomsType } from "@/components/GridItmes/Room";
import RoomItem from "../GridItmes/Room";
import { useQuery } from "@tanstack/react-query";
async function fetchRooms(): Promise<RoomsType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/rooms`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }
  const data = await response.json();
  console.log(data);
  return data.result;
}
export default function Recommand() {
  const { data: roomsData, isLoading } = useQuery({
    queryKey: ["rooms"], // 正確使用 queryKey
    queryFn: fetchRooms, // 查詢函數
  });

  if (isLoading) return null;

  // const onePersonRooms = roomsData?.filter((room) => room?.maxPeople === 1);
  const twoPeopleRooms = roomsData?.filter((room) => room?.maxPeople === 2);
  // const familyRooms = roomsData?.filter((room) => room?.maxPeople > 2);

  return (
    <div className="relative text-gray-400 px-5 py-6 bg-white">
      <div className=" w-10/12 m-auto">
        <SectionTitle
          title="Recommend"
          subTitle="You may be interested in our popular rooms"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 relative">
          {twoPeopleRooms?.map((item, key) => {
            return <RoomItem data={item} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
}
