import { useQuery } from "@tanstack/react-query";
import { getTicket } from "../api/GetWorkspaceTickets";

export const useGetTickets = () => {
  const workspaceId = localStorage.getItem("workspace")
  return useQuery({
    queryKey: ['ticket', workspaceId],
    queryFn: getTicket
  })
}