import { api } from "../../../lib/appClient";
import type { WorkspaceMembers } from "../types";

export type WorkspaceMembersResponse = {
  data: WorkspaceMembers[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type GetWorkspaceMembersParams = {
  page?: number;
  limit?: number;
};

export const workspaceMembers = async ({
  page = 1,
  limit = 10,
}: GetWorkspaceMembersParams = {}): Promise<WorkspaceMembersResponse> => {
  const response = await api.get("/api/v1/workspace/members", {
    params: {
      page,
      limit,
    },
  });

  return response.data.data;
};