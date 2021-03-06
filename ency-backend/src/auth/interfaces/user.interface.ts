import { User } from "@prisma/client";

export interface IUser {
  uid: string;
}

export type UserEntity = User;