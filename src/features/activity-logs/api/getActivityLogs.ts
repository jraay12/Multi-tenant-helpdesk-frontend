import { api } from "../../../lib/appClient";

import type { ActivityLogsResponse } from "../types";

interface GetActivityLogsParams {
  search?: string;
  userId?: string;
  action?: string;

  startDate?: string;
  endDate?: string;

  page?: number;
  limit?: number;
}

export const getActivityLogs = async (
  params?: GetActivityLogsParams,
): Promise<ActivityLogsResponse> => {
  const { data } = await api.get<ActivityLogsResponse>(
    "/api/v1/activity-logs",
    {
      params: {
        search: params?.search,
        userId: params?.userId,
        action: params?.action,

        startDate: params?.startDate,
        endDate: params?.endDate,

        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
      },
    },
  );

  return data;
};