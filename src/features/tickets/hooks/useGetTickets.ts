import { useQuery } from "@tanstack/react-query";

import {
  getTicket,
  type TicketScope,
} from "../api/GetWorkspaceTickets";

type UseGetTicketsProps = {
  scope?: TicketScope;
  page?: number;
  limit?: number;
};

export const useGetTickets = ({
  scope = "all",
  page = 1,
  limit = 10,
}: UseGetTicketsProps = {}) => {
  const workspaceId =
    localStorage.getItem("workspace");

  return useQuery({
    queryKey: [
      "ticket",
      workspaceId,
      scope,
      page,
      limit,
    ],

    queryFn: () =>
      getTicket({
        scope,
        page,
        limit,
      }),
  });
};