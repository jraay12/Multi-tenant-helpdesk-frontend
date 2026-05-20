import type { myDetails } from "./../types";
import { api } from "../../../lib/appClient";
export const fetchmyDetails = async (): Promise<myDetails> => {
  const response = await api.get("/api/v1/users/me");

  return response.data;
};
