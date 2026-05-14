import { api } from "../../../lib/appClient";
import type { MyWorkspaceResponse } from "../types";

export const myWorkspace = async (): Promise<MyWorkspaceResponse[]> => {
  const response = await api.get("/api/v1/workspace");

  return response.data;
};
