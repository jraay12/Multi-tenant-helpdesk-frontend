import type { FetchUserInvites } from "./../types";
import { api } from "../../../lib/appClient";
export const fetchUserForInvites = async (
  search?: string,
): Promise<FetchUserInvites[]> => {
  const response = await api.get("/api/v1/users", {
    params: {
      search,
    },
  });

  return response.data;
};
