import { api } from "../../../lib/appClient";
import type { UserRegisterInput } from "../types";

export const register = async (data: UserRegisterInput) => {
  const response = await api.post("/api/v1/users/", data);

  return response.data;
};
