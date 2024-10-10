"use client";
import { RoomsType } from "@/components/GridItmes/Room";
import useTokenStore from "@/zustand/useTokenStore";
import { useQuery } from "@tanstack/react-query";

import React from "react";

export default function Page() {
  const { token } = useTokenStore();
  async function fetchConsoleRooms(): Promise<RoomsType[]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/rooms/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error Data:", errorData);
        throw new Error(errorData.message || "Unknown error occurred");
      }

      const data = await response.json();

      return data.result;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  }

  const { data: roomsData, isLoading } = useQuery({
    queryKey: ["console_room"], // 正確使用 queryKey
    queryFn: fetchConsoleRooms, // 查詢函數
  });
  console.log("roomsData");
  console.log(roomsData);

  if (isLoading) {
    return <span className=" loading loading-spinner"></span>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>房型名稱</th>
              <th>總數</th>
              <th>價格</th>
              <th>編輯/刪除</th>
            </tr>
          </thead>
          <tbody>
            {roomsData?.map((item) => {
              return (
                <tr key={`idx`}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.imageUrl} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.maxPeople}</td>
                  <td>{item.price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">刪除</button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
