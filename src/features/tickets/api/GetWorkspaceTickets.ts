import { api } from "../../../lib/appClient";
import type { Ticket } from "../types";

export const getTicket = async (): Promise<Ticket[]> => {
  const response = await api.get("/api/v1/ticket");

  return response.data.data;
};
