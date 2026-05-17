// DashboardStats.ts
import type { TicketStatisticResponse } from "../types";
import { api } from "../../../lib/appClient";

export const DashboardStats = async (): Promise<
  TicketStatisticResponse["data"]
> => {
  const { data } = await api.get<TicketStatisticResponse>(
    "/api/v1/ticket/stats"
  );

  return data.data;
};