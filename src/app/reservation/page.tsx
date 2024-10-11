"use client";
import React from "react";
import Img6 from "@/../public/photo-1559841771-599b6eeaca62.avif";
import Image from "next/image";

import { Member } from "@/schema/member";
import { useMutation, useQuery } from "@tanstack/react-query";
import useTokenStore from "@/zustand/useTokenStore";

import axios from "axios";
import { z } from "zod";
import { roomId } from "@/jotai/Room";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
/**
 * 
 * 
 *   "roomId": "65251f6095429cd58654bf12",
  "checkInDate": "2023/06/18",
  "checkOutDate": "2023/06/19",
  "peopleNum": 2,
  "userInfo": {
    "address": {
      "zipcode": 802,
      "detail": "文山路23號"
    },
    "name": "Joanne Chen",
    "phone": "0912345678",
    "email": "example@gmail.com"
  }
 */
const orderSchema = z.object({
  roomId: z.string().min(1, "請輸入"),
  checkInDate: z.string().min(1, "請輸入"),
  checkOutDate: z.string().min(1, "請輸入"),
  peopleNum: z.number(),

  userInfo: z.object({
    address: z.object({
      zipcode: z.number(),
      detail: z.string().min(1, "請輸入地址"),
    }),
    name: z.string().min(1, "請輸入郵遞區號"),
    phone: z.string().min(1, "請輸入地址"),
    email: z.string().min(1, "請輸入地址"),
  }),
});

type OrderFormData = z.infer<typeof orderSchema>;
interface SignUpResponse {
  status: boolean;
  result: {
    roomId: {
      _id: string;
    };
  };
}

export default function Page() {
  const { data: userData } = useQuery({
    queryKey: ["userData"], //  queryKey
    queryFn: fetchRooms, // 查詢函數
  });
  const { token } = useTokenStore();
  const { push } = useRouter();

  async function fetchRooms(): Promise<Member> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json(); // 獲取錯誤響應的 JSON 數據
      const errorMessage = errorData.message || "Unknown error occurred"; // 獲取錯誤訊息

      // 檢查是否為重新登入的錯誤
      if (errorData.message === "請重新登入") {
        // console.log("請重新登入2");
        // return []; // 可以返回空數組以避免後續的錯誤
      }

      throw new Error(errorMessage);
    }
    const data = await response.json();
    // console.log(data);
    return data.result;
  }

  // const orderMutation = useMutation<SignUpResponse, Error, OrderFormData>({
  //   mutationFn: async (data: OrderFormData) => {
  //     const response = await axios.post<SignUpResponse>(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/`,
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `${token}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   },
  //   onSuccess: (data) => {
  //     if (data.status) {
  //       push(`/reservation/${data?.result.roomId._id}`);
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Error signing up:", error);
  //   },
  // });
  const orderMutation = useMutation({
    mutationFn: async (data: OrderFormData) => {
      const response = await axios.post<SignUpResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status) {
        push(`/reservation/${data?.result.roomId._id}`);
      }
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });

  const getAtomId = useAtomValue(roomId);

  const handleClickSubmit = () => {
    try {
      const orderData: OrderFormData = {
        roomId: getAtomId,
        checkInDate: "2024/10/11",
        checkOutDate: "2024/10/12",
        peopleNum: 1,
        userInfo: {
          name: userData?.name || "",
          email: userData?.email || "",
          address: {
            detail: userData?.address.detail || "",
            zipcode: userData?.address.zipcode || 0,
          },
          phone: userData?.phone || "",
        },
      };

      orderSchema.parse(orderData);

      orderMutation.mutate(orderData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="relative w-11/12 lg:w-7/12 m-auto grid grid-cols-1 md:grid-cols-2 gap-x-5 mt-4">
      <div>
        <h3 className="text-4xl text-black font-bold leading-[55px]">
          Reservation <br /> information
        </h3>
        <div className="mt-[52px]">
          <span className="flex items-center gap-2">
            <i className="material-icons">people</i>
            <span>Name</span>
          </span>
          <input
            type="text"
            value={userData?.name}
            placeholder="Annalise Parisian"
            className="input input-md w-full  border-t-0 border-x-0 rounded-none  bg-white border-b border-gray-400"
          />
        </div>

        <div className="mt-[52px]">
          <span className="flex items-center gap-2">
            <i className="material-icons">phone</i>
            <span>Phone</span>
          </span>
          <input
            type="text"
            value={userData?.phone}
            placeholder="+886 9 32 45"
            className="input input-md w-full border-t-0 border-x-0 rounded-none  bg-white border-b border-gray-400"
          />
        </div>
        {/* <Link href={`/reservation/${123}`}> */}
        <button
          onClick={handleClickSubmit}
          type="button"
          className="mt-[50px] btn rounded-none bg-blue border-none text-white w-full uppercase"
        >
          reserve now
          {orderMutation.isPending && (
            <span className=" loading loading-spinner"></span>
          )}
        </button>
        {/* </Link> */}
      </div>
      <div className="flex-1 bg-black">
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
            {/* <select className=" select bg-white w-full">
              <option value="">check-in</option>
            </select> */}
            <input type="date" className=" bg-white" />
          </div>
          <div className="flex items-center border px-6 py-8">
            <span className="material-icons">date_range</span>
            {/* <select className=" select bg-white w-full">
              <option value="">check-in</option>
            </select> */}
            <input type="date" className=" bg-white" />
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
