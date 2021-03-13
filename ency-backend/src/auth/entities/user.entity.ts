import { User } from "@prisma/client";

export class UserEntity implements User {
  uid!: string;
  name!: string;
  email!: string;
  description!: string | null;
  coins!: number;
}
