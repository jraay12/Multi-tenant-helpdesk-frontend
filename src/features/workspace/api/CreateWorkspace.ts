import type { CreateWorkspaceInput } from "./../types";
import { api } from "../../../lib/appClient";

export const CreateWorkspace = async (data: CreateWorkspaceInput) => {
  const response = await api.post(`/api/v1/workspace`, data);

  return response.data;
};
