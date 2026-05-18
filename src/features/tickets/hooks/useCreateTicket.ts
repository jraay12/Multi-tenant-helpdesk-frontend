import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTicket } from "../api/CreateTicket";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  const workspaceId = localStorage.getItem("workspace");
  return useMutation({
    mutationFn: CreateTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", workspaceId] });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["recent-ticket", workspaceId],
      });
    },
  });
};
