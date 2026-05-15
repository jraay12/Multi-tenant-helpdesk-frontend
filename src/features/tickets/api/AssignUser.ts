import { api } from "../../../lib/appClient";

export const AssignUser = async (assignedId: string, ticketId: string) => {
  const response = await api.patch(`/api/v1/ticket/${ticketId}/assign`, { assignedId });

  return response.data;
};
