import { api } from "../../../lib/appClient";

export const UpdatePriorityStatus = async (ticketId: string, data: {priority: string}) => {
  const response = await api.patch(`/api/v1/ticket/${ticketId}/priority`, data);

  return response.data;
};
