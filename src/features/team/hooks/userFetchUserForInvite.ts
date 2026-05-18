import { useQuery } from "@tanstack/react-query";
import { fetchUserForInvites } from "../api/FetchUserForInvite";

export const useFetchUserForInvites = (search?: string) => {
  const workspaceId = localStorage.getItem("workspace")
  return useQuery({
    queryKey: ['workspace-invites', workspaceId, search],
    queryFn: () => fetchUserForInvites(search),
    enabled: !!workspaceId
  })
}