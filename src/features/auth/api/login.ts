import { api } from "../../../lib/appClient";
import type { LoginUserInput } from "../pages/types";

export const login = async(data: LoginUserInput) => {
  const response = await api.post("/api/v1/auth/", data)

  return response.data
}