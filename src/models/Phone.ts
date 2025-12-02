import type { ObjectId } from "mongodb";

export type Phone = {
  _id?: ObjectId;
  number: number;
  description?: string;
};
