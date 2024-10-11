"use client";
import { RoomsType } from "@/components/GridItmes/Room";
import useTokenStore from "@/zustand/useTokenStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const hotelImages = [
  {
    url: "https://plus.unsplash.com/premium_photo-1682800179180-fb326934d458?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsfGVufDB8fDB8fHww",
    alt: "Premium hotel room 1",
  },
  {
    url: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsfGVufDB8fDB8fHww",
    alt: "Hotel room 2",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGhvdGVsfGVufDB8fDB8fHww",
    alt: "Premium hotel room 3",
  },
  {
    url: "https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGhvdGVsfGVufDB8fDB8fHww",
    alt: "Hotel room 4",
  },
  {
    url: "https://images.unsplash.com/photo-1561049933-c7762dbc757e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGhvdGVsfGVufDB8fDB8fHww",
    alt: "Hotel room 5",
  },
];

const roomSchema = z.object({
  name: z.string().min(1, "請輸入房型名稱"),

  maxPeople: z
    .number()
    .min(1, "人數不能小於1")
    .transform((value) => Math.round(value)), // 確保價格為整數
  price: z
    .number()
    .min(1, "價格必須大於0")
    .transform((value) => Math.round(value)), // 確保價格為整數
  imageUrl: z.string().min(1, "請選擇主要圖片"),
  imageUrlList: z.array(z.string()).min(1, "請至少選擇一張其他圖片"),
});
/** - 房型管理 */
export default function Page() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      maxPeople: 1,
      price: 3000,
      imageUrl: "",
      imageUrlList: [],
    },
  });
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

  const mainImage = watch("imageUrl");
  const otherImages = watch("imageUrlList");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postConsoleRoom,
    onSuccess: () => {
      toast.success("房型新增成功！");

      queryClient.invalidateQueries({ queryKey: ["console_room"] });

      reset();
    },
    onError: (error) => {
      console.error("房型新增失敗：", error);
    },
  });
  const mutationDeleteRoom = useMutation({
    mutationFn: (roomId: string) => deleteConsoleRoom(roomId),
    onSuccess: () => {
      // 刪除成功後重新獲取房間列表
      queryClient.invalidateQueries({ queryKey: ["console_room"] });

      toast.success("房型已成功刪除！");
    },
    onError: (error) => {
      console.error("刪除房型失敗：", error);
      alert("刪除房型失敗，請稍後再試。");
    },
  });
  const { data: roomsData, isLoading } = useQuery({
    queryKey: ["console_room"],
    queryFn: fetchConsoleRooms,
  });

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  //NOTE - 刪除API
  async function deleteConsoleRoom(roomId: string): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/rooms/${roomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error occurred");
      }

      console.log("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }

  //NOTE - 修改API
  // async function putConsoleRoom(roomId: string): Promise<void> {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/rooms/${roomId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `${token}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Unknown error occurred");
  //     }

  //     console.log("Order deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //     throw error;
  //   }
  // }

  async function postConsoleRoom(data: {
    name: string;
    maxPeople: number;
    price: number;
    imageUrl: string;
    imageUrlList: string[];
  }): Promise<void> {
    const roomData = {
      name: data.name,
      description:
        "享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。",
      imageUrl: data.imageUrl,
      imageUrlList: ["https://fakeimg.pl/300/"],
      areaInfo: "24坪",
      bedInfo: "一張大床",
      maxPeople: data.maxPeople,
      price: data.price,
      facilityInfo: [{ title: "平面電視", isProvide: true }],
      amenityInfo: [{ title: "衛生紙", isProvide: true }],
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/rooms/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(roomData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error occurred");
      }

      reset();
    } catch (error) {
      console.error("Error adding room:", error);
      throw error;
    }
  }

  const onSubmit = (data: {
    name: string;
    maxPeople: number;
    price: number;
    imageUrl: string;
    imageUrlList: string[];
  }) => {
    mutation.mutate(data);
  };

  return (
    <div className="p-8">
      <button
        className="btn btn-primary text-white"
        onClick={() => {
          const ele = document.getElementById(
            "my_modal_4"
          ) as HTMLDialogElement;
          ele?.showModal();
        }}
      >
        新增房型
      </button>
      <dialog id="my_modal_4" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl bg-white">
          <h3 className="font-bold text-lg">新增</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 房型名稱 */}
            <div>
              <label htmlFor="name">房型名稱</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="name"
                    type="text"
                    className={`input input-bordered bg-white ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder="輸入房型名稱"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* 最大容納人數 */}
            <div>
              <label htmlFor="maxPeople">可容納人數</label>
              <Controller
                name="maxPeople"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <input
                    value={value}
                    id="maxPeople"
                    onChange={(e) => onChange(Number(e.target.value) || 0)}
                    type="number"
                    className={`input input-bordered bg-white ${
                      errors.maxPeople ? "border-red-500" : ""
                    }`}
                    placeholder="輸入可容納人數"
                  />
                )}
              />
              {errors.maxPeople && (
                <p className="text-red-500">{errors.maxPeople.message}</p>
              )}
            </div>

            {/* 價格 */}
            <div>
              <label htmlFor="price">價格</label>
              <Controller
                name="price"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <input
                    id="price"
                    type="number"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value) || 0)}
                    className={`input input-bordered bg-white ${
                      errors.price ? "border-red-500" : ""
                    }`}
                    placeholder="輸入價格"
                  />
                )}
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* 主要圖片選擇 */}
            <div>
              <label htmlFor="imageUrl" className="block mb-2">
                主要圖片
              </label>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`select bg-white select-bordered w-full ${
                        errors.imageUrl ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">選擇主要圖片</option>
                      {hotelImages.map((image, index) => (
                        <option key={index} value={image.url}>
                          圖片 {index + 1}
                        </option>
                      ))}
                    </select>
                    {mainImage && (
                      <div className="mt-2">
                        <img
                          src={mainImage}
                          alt="主要圖片預覽"
                          className="w-full max-w-md rounded"
                        />
                      </div>
                    )}
                  </div>
                )}
              />
              {errors.imageUrl && (
                <p className="text-red-500">{errors.imageUrl.message}</p>
              )}
            </div>

            {/* 其他圖片選擇 */}
            <div>
              <label htmlFor="imageUrlList" className="block mb-2">
                其他圖片
              </label>
              <Controller
                name="imageUrlList"
                control={control}
                render={({ field }) => (
                  <div>
                    <select
                      multiple
                      onChange={(e) => {
                        const options = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        field.onChange(options);
                      }}
                      className={`select bg-white select-bordered w-full ${
                        errors.imageUrlList ? "border-red-500" : ""
                      }`}
                    >
                      {hotelImages.map((image, index) => (
                        <option key={index} value={image.url}>
                          圖片 {index + 1}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {otherImages?.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`其他圖片 ${index + 1}`}
                          className="w-full rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              />
              {errors.imageUrlList && (
                <p className="text-red-500">{errors.imageUrlList.message}</p>
              )}
            </div>

            <div className="modal-action">
              <button type="submit" className="btn text-white  ">
                提交
              </button>
              <form method="dialog">
                <button className="btn bg-white">關閉</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>

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
                    <button
                      type="button"
                      onClick={() => {
                        mutationDeleteRoom.mutate(item._id);
                      }}
                      className="btn btn-ghost btn-xs"
                    >
                      刪除
                    </button>
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
