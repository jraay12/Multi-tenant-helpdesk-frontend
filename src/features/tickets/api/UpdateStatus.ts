import { api } from "../../../lib/appClient";

export const UpdateTicketStatus = async (ticketId: string, data: {status: string}) => {
  const response = await api.patch(`/api/v1/ticket/${ticketId}/status`, data);

  return response.data;
};
