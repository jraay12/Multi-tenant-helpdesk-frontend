import { api } from "../../../lib/appClient";
import type { Ticket } from "../types";

export type TicketScope =
  | "all"
  | "me"
  | "unassigned";

type GetTicketParams = {
  scope?: TicketScope;
};

export const getTicket = async ({
  scope = "all",
}: GetTicketParams = {}): Promise<Ticket[]> => {
  const response = await api.get("/api/v1/ticket", {
    params: {
      scope,
    },
  });

  return response.data.data;
};