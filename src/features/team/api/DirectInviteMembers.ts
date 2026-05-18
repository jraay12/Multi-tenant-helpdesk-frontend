import type { DirectInviteInputs } from "./../types";
import { api } from "../../../lib/appClient";

export const DirectInviteMembers = async (data: DirectInviteInputs) => {
  const response = await api.post(`/api/v1/workspace/invite-members`, data);

  return response.data;
};
