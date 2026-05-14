import { api } from "../../../lib/appClient";
import type { MyWorkspaceResponseById } from "../types";

export const workspaceById = async (workspaceId: string): Promise<MyWorkspaceResponseById> => {
  const response = await api.get(`/api/v1/workspace/${workspaceId}`);

  return response.data;
};
