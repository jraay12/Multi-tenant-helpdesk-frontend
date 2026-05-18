import { CreateWorkspace } from "../api/CreateWorkspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-workspace"] });
    },
  });
};
