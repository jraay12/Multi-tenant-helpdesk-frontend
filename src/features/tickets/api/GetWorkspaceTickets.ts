import { api } from "../../../lib/appClient";
import type { Ticket } from "../types";

export type TicketScope =
  | "all"
  | "me"
  | "unassigned";

type GetTicketParams = {
  scope?: TicketScope;
  page?: number;
  limit?: number;
};

export type TicketPaginationResponse = {
  data: Ticket[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const getTicket = async ({
  scope = "all",
  page = 1,
  limit = 10,
}: GetTicketParams = {}): Promise<TicketPaginationResponse> => {
  const response = await api.get("/api/v1/ticket", {
    params: {
      scope,
      page,
      limit,
    },
  });

  return response.data;
};