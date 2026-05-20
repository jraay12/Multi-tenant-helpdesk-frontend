import { useQuery } from "@tanstack/react-query";
import { workspaceMembers } from "../api/GetAllWorkspaceMember";

type UseFetchWorkspaceMemberProps = {
  page?: number;
  limit?: number;
};

export const useFetchWorkspaceMember = ({
  page = 1,
  limit = 10,
}: UseFetchWorkspaceMemberProps = {}) => {
  const workspaceById = localStorage.getItem("workspace");

  return useQuery({
    queryKey: [
      "workspace-members",
      workspaceById,
      page,
      limit,
    ],

    queryFn: () =>
      workspaceMembers({
        page,
        limit,
      }),

    enabled: !!workspaceById,
  });
};