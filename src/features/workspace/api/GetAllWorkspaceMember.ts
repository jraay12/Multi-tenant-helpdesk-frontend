import { api } from "../../../lib/appClient";
import type { WorkspaceMembers } from "../types";

export const workspaceMembers = async (): Promise<WorkspaceMembers[]> => {
  const response = await api.get("/api/v1/workspace/members");

  return response.data.data;
};
