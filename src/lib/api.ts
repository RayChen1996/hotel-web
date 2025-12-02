import axios from "axios";
import { Member, Order, UserInfo } from "@/schema/member";

type SignupData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: number;
    detail: string;
  };
};

interface SignupResponse {
  message: string;
}

export interface CreateOrderPayload {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  userInfo: UserInfo;
}

export interface CreateOrderResponse {
  status: boolean;
  result: Order;
  message?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const withAuth = (token?: string) => ({
  Authorization: token ?? "",
});

const extractErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message;
  }
  return "Unknown error occurred";
};

export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>("/api/v1/user/signup", data);
  return response.data;
};

export const fetchCurrentUser = async (token: string): Promise<Member> => {
  try {
    const response = await api.get<{ result: Member }>("/api/v1/user/", {
      headers: withAuth(token),
    });
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createOrder = async (
  payload: CreateOrderPayload,
  token: string
): Promise<CreateOrderResponse> => {
  try {
    const response = await api.post<CreateOrderResponse>(
      "/api/v1/orders/",
      payload,
      {
        headers: withAuth(token),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const fetchAdminOrders = async (token: string): Promise<Order[]> => {
  try {
    const response = await api.get<{ result: Order[] }>(
      "/api/v1/admin/orders/",
      {
        headers: withAuth(token),
      }
    );
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteAdminOrder = async (
  orderId: string,
  token: string
): Promise<void> => {
  try {
    await api.delete(`/api/v1/admin/orders/${orderId}`, {
      headers: withAuth(token),
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
