import { useQuery } from "@tanstack/react-query";
import { myWorkspace } from "../api/MyWorkspace";
export const useFetchMyWorkspace = () => {
  return useQuery({
    queryKey: ['my-workspace'],
    queryFn: myWorkspace
  })
}