import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserService = async (payload: Partial<IUser>): Promise<IUser> => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create(payload);

  return user;
};

const getUsersService = async () => {
  return User.find();
};

const getUserByIdService = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const UserService = {
  createUserService,
  getUsersService,
  getUserByIdService,
};
