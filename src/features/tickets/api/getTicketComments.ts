import { api } from "../../../lib/appClient";
import type { TicketComment } from "../types";

export const getTicketComment = async (
  ticketId: string,
): Promise<TicketComment> => {
  const response = await api.get(`/api/v1/ticket/${ticketId}/comment`);
  return response.data.data;
};
