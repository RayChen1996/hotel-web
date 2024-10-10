"use client";
import React from "react";
import SectionTitle from "../SectionTitle";

import RoomItem from "../GridItmes/Room";
import { useQuery } from "@tanstack/react-query";
import { RoomsType } from "@/components/GridItmes/Room";
import useTokenStore from "@/zustand/useTokenStore";

const loadingData = Array.from({ length: 2 }).map(() => undefined);

export default function Rooms() {
  const { data: roomsData, isLoading } = useQuery({
    queryKey: ["rooms"], // 正確使用 queryKey
    queryFn: fetchRooms, // 查詢函數
  });
  const { token } = useTokenStore();
  const onePersonRooms = roomsData?.filter((room) => room?.maxPeople === 1);
  const twoPeopleRooms = roomsData?.filter((room) => room?.maxPeople === 2);
  const familyRooms = roomsData?.filter((room) => room?.maxPeople > 2);
  async function fetchRooms(): Promise<RoomsType[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/rooms`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }
    const data = await response.json();
    // console.log(data);
    return data.result;
  }
  // console.log(onePersonRooms);
  // console.log(twoPeopleRooms);
  // console.log(familyRooms);

  return (
    <div className="bg-white relative m-auto py-11">
      <div className="w-10/12 m-auto">
        <section
          data-aos="fade-left"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 mb-[47px]"
        >
          <SectionTitle
            title="One person"
            subTitle="Enjoy the one and only service"
          />
          {isLoading && (
            <>
              {loadingData.map((_, i) => (
                <RoomItem key={"favoriteProduct" + i} />
              ))}
            </>
          )}
          {onePersonRooms?.map((item, key) => {
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

          {twoPeopleRooms?.map((item, key) => {
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

          {familyRooms?.map((item, key) => {
            return <RoomItem data={item} key={key} />;
          })}
        </section>
      </div>
    </div>
  );
}
