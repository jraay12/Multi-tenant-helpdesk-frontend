import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdatePriorityStatus } from "../api/UpdatePriority";

export const useUpdateTicketPriority = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId, priority }: { ticketId: string; priority: string }) =>
      UpdatePriorityStatus(ticketId, { priority }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ticket-details", variables.ticketId],
      });
    },
  });
};
