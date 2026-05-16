import { useQuery } from "@tanstack/react-query";
import { DashboardStats } from "../api/DashboardStats";

export const useDashboardStatistics = () => {
  const workspaceId = localStorage.getItem("workspace");
  return useQuery({
    queryKey: ["dashboard-stats", workspaceId],
    queryFn: DashboardStats,
  });
};
