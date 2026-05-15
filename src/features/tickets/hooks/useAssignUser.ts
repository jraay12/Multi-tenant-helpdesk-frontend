import { AssignUser } from "./../api/AssignUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAssignUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assignedId,
      ticketId,
    }: {
      assignedId: string;
      ticketId: string;
    }) => AssignUser(assignedId, ticketId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ticket-details", variables.ticketId],
      });
    },
  });
};