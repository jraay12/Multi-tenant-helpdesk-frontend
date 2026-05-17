import { useQuery } from "@tanstack/react-query";
import { getRecentTicket } from "../api/RecentTicket";
export const useRecentTickets = () => {
  const workspaceId = localStorage.getItem("workspace");
  return useQuery({
    queryKey: ["recent-ticket", workspaceId],
    queryFn: getRecentTicket,
  });
};
