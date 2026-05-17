import { api } from "../../../lib/appClient";
import type { RecentTicketResponse } from "../types";
export const getRecentTicket = async (): Promise<RecentTicketResponse[]> => {
  const { data } = await api.get("/api/v1/ticket/recent");

  return data.data;
};
