import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DirectInviteMembers } from "../api/DirectInviteMembers";
export const useDirectInviteMembers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DirectInviteMembers,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["my-workspace"] });
    // },
  });
};
