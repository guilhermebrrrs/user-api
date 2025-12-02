import type { ObjectId } from "mongodb";
import type { Address, Phone } from "src/models";

export type User = {
  _id?: ObjectId;
  addresses?: Address[];
  birthdate: Date;
  email: string;
  password: string;
  name: string;
  phones?: Phone[];
};
