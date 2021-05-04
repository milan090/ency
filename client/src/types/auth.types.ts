export interface User {
  id: string;
  email: string;
  name: string;
}

export type UserEntity = {
  uid: string;
  email: string;
  name: string;
  description: string | null;
  coins: number;
};
