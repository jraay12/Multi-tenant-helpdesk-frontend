import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTicketComment } from "../api/CreateTicketComment";

export const useCreateTicketComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      message,
      ticketId,
    }: {
      message: string;
      ticketId: string;
    }) => CreateTicketComment(ticketId, { message }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ticket-comment", variables.ticketId],
      });
    },
  });
};
