import { useQuery } from "@tanstack/react-query";
import { getActivityLogs } from "../api/getActivityLogs";

interface UseGetActivityLogsParams {
  search?: string;
  userId?: string;
  action?: string;

  startDate?: string;
  endDate?: string;

  page?: number;
  limit?: number;
}

export const useGetActivityLogs = (
  params?: UseGetActivityLogsParams,
) => {
  const workspaceId = localStorage.getItem("workspace");

  return useQuery({
    queryKey: [
      "activity-logs",
      workspaceId,

      params?.search,
      params?.userId,
      params?.action,

      params?.startDate,
      params?.endDate,

      params?.page,
      params?.limit,
    ],

    queryFn: () => getActivityLogs(params),

    enabled: !!workspaceId,
  });
};