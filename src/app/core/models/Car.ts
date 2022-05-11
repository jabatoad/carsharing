import {Mark} from "./Mark";

export interface Car {
  name: string,
  year: number,
  range: number,
  price: number,
  imgName: string,
  point: Mark,
  eco: boolean,
  rented: boolean
}
