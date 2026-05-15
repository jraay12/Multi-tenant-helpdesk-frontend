import { useQuery } from "@tanstack/react-query";
import { workspaceMembers } from "../api/GetAllWorkspaceMember";

export const useFetchWorkspaceMember = () => {
  const workspaceById = localStorage.getItem("workspace");
  return useQuery({
    queryKey: ["workspace-members", workspaceById],
    queryFn: workspaceMembers,
    enabled: !!workspaceById
  });
};
