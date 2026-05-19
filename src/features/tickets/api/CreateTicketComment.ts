import { api } from "../../../lib/appClient";

export const CreateTicketComment = async (ticketId: string, data: {message: string} ) => {
  const response = await api.post(`/api/v1/ticket/${ticketId}/comment `, data);

  return response.data;
};
