export interface Member {
  address: {
    zipcode: number;
    detail: string;
  };
  _id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  userInfo: UserInfo;
  _id: string;
  roomId: Room;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  zipcode: number;
  detail: string;
}

export interface UserInfo {
  address: Address;
  name: string;
  phone: string;
  email: string;
}

export interface Facility {
  title: string;
  isProvide: boolean;
}

export interface Amenity {
  title: string;
  isProvide: boolean;
}

export interface Room {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  facilityInfo: Facility[];
  amenityInfo: Amenity[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
