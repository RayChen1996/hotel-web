import axios from "axios";

// 定義資料型別，根據你的 API 返回的資料結構來定義
interface Post {
  id: number;
  title: string;
  body: string;
}
interface Address {
  zipcode: number;
  detail: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  address: Address;
}

// 定義回傳的資料型別 (假設 API 回傳一個成功的訊息)
interface SignupResponse {
  message: string;
}
const BASE_URL = "https://freyja-vw02.onrender.com";

// 使用泛型告訴 axios 回傳的資料型別是 Post[]
export const fetchData = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${BASE_URL}/posts`);
  return response.data;
};

export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
  const response = await axios.post<SignupResponse>(
    `${BASE_URL}/api/v1/user/signup`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
