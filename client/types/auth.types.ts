export interface IUser {
  name?: string;
  email?: string;
  uid?: string;
}

export type UserEntity = {
  uid: string;
  email: string;
  name: string;
  description: string | null;
  coins: number;
};
