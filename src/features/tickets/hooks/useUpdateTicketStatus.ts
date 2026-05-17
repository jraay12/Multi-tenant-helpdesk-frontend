import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTicketStatus } from "../api/UpdateStatus";

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId, status }: { ticketId: string; status: string }) =>
      UpdateTicketStatus(ticketId, { status }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ticket-details", variables.ticketId],
      });
    },
  });
};
