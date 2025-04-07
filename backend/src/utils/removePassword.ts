import { UserInstance } from "../models/user.model";
export const userWithoutPassword = (user: UserInstance | null) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user?.dataValues ?? { password: null };
  return rest;
};
