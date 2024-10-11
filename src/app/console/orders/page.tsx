"use client";
import { Order } from "@/schema/member";
import useTokenStore from "@/zustand/useTokenStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import React from "react";

export default function Page() {
  const { token } = useTokenStore();
  const queryClient = useQueryClient();
  async function fetchConsoleOrders(): Promise<Order[]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/orders/`,
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

  async function deleteConsoleOrder(orderId: string): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/orders/${orderId}`,
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
  const mutation = useMutation({
    mutationFn: (orderId: string) => deleteConsoleOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["console_room"] });
    },
  });
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["console_room"],
    queryFn: fetchConsoleOrders,
  });

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }
  const filteredOrders = ordersData?.filter((order) => order.status != -1);
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
              <th>Order ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.length === 0 && (
              <tr>
                {" "}
                <td colSpan={5} className="text-gray-400 font-bold">
                  No Data
                </td>
              </tr>
            )}
            {filteredOrders?.map((item) => {
              return (
                <tr key={`idx`}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{item._id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.roomId?.name}</td>
                  <td>{item.roomId?.price}</td>
                  <th>
                    <button
                      type="button"
                      onClick={() => mutation.mutate(item._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      刪除
                      {mutation.isPending && (
                        <span className="loading loading-spinner"></span>
                      )}
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
