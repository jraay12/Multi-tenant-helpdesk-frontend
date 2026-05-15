import { useQuery } from "@tanstack/react-query";
import { getTicketById } from "../api/GetWorkspaceTicketsById";

export const useGetTicketById = (ticketId: string) => {
  return useQuery({
    queryKey: ['ticket-details', ticketId],
    queryFn: () => getTicketById(ticketId),
    enabled: !!ticketId
  })
}