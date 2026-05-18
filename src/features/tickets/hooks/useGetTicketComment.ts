import { useQuery } from "@tanstack/react-query";
import { getTicketComment } from "../api/getTicketComments";

export const useGetTicketComment = (ticketId: string) => {
  return useQuery({
    queryKey: ['ticket-comment', ticketId],
    queryFn: () => getTicketComment(ticketId),
    enabled: !!ticketId
  })
}