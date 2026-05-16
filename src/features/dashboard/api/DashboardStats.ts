import type { TicketStatisticResponse } from './../types';
import { api } from "../../../lib/appClient";

export const DashboardStats = async (): Promise<TicketStatisticResponse> => {
  const response = await api.get(`/api/v1/ticket/stats`);

  return response.data.data;
};
