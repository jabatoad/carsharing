import {Ride} from "./Ride";

export interface User {
  password: string,
  phone: number,
  username: string,
  rides: Ride[],
  admin: boolean
}
