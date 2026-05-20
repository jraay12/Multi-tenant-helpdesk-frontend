import { useMutation } from "@tanstack/react-query";
import { DirectInviteMembers } from "../api/DirectInviteMembers";
export const useDirectInviteMembers = () => {

  return useMutation({
    mutationFn: DirectInviteMembers,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["my-workspace"] });
    // },
  });
};
