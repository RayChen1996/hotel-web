"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAdminOrder,
  fetchAdminOrders,
} from "@/lib/api";
import useTokenStore from "@/zustand/useTokenStore";

export default function Page() {
  const { token } = useTokenStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (orderId: string) => deleteAdminOrder(orderId, token ?? ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
    },
  });
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: () => fetchAdminOrders(token ?? ""),
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
                <tr key={item._id}>
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
                      {mutation.isPending && mutation.variables === item._id && (
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
