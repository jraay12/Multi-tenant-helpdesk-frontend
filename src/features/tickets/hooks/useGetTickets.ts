import { useQuery } from "@tanstack/react-query";
import {
  getTicket,
  type TicketScope,
} from "../api/GetWorkspaceTickets";

type UseGetTicketsProps = {
  scope?: TicketScope;
};

export const useGetTickets = ({
  scope = "all",
}: UseGetTicketsProps = {}) => {
  const workspaceId = localStorage.getItem("workspace");

  return useQuery({
    queryKey: ["ticket", workspaceId, scope],

    queryFn: () =>
      getTicket({
        scope,
      }),
  });
};