export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdOn: Date;
}

export interface UserCreated {
  token: string;
}

export type UserLogin = Omit<IUser, "password"> & UserCreated;

export type UserAuthenticated = Pick<IUser, "_id" | "email">;
