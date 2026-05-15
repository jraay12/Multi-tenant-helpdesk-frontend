import { api } from "../../../lib/appClient";
import type { CreateTicketInput } from "../types";

export const CreateTicket = async (data: CreateTicketInput) => {
  const response = await api.post("/api/v1/ticket/", data);

  return response.data;
};
