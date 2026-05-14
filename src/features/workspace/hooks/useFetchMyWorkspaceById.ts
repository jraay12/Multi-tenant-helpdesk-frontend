import { useQuery } from "@tanstack/react-query";
import { workspaceById } from "../api/WorkspaceById";
export const useFetchMyWorkspaceById = (id: string) => {
  return useQuery({
    queryKey: ['my-workspace', id],
    queryFn: () => workspaceById(id),
    enabled: !!id,
  })
}