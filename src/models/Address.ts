import type { ObjectId } from "mongodb";

export type Address = {
  _id?: ObjectId;
  city: string;
  country: string;
  description?: string;
  number: string;
  state: string;
  street: string;
};
