import { useQuery } from "@tanstack/react-query";
import { fetchmyDetails } from "../api/mydetails";
import { getCurrentUserId } from "../../../lib/auth";

export const useMyDetails = () => {
  const userId = getCurrentUserId();
  return useQuery({
    queryKey: ["my-details", userId],
    queryFn: fetchmyDetails,
    enabled: !!userId,
  });
};
