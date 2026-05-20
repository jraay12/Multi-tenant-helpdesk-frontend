import { useQuery } from "@tanstack/react-query";
import { workspaceMembersNotPaginated } from "../api/fetchMemberNotPaginated";
export const useFetchWorkspaceMemberNotPaginated = () => {
  const workspaceById = localStorage.getItem("workspace");
  return useQuery({
    queryKey: ["workspace-members", workspaceById],
    queryFn: workspaceMembersNotPaginated,
    enabled: !!workspaceById,
  });
};
