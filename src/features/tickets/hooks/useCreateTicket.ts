import { useMutation } from "@tanstack/react-query";
import { CreateTicket } from "../api/CreateTicket";

export const useCreateTicket = () => {
  return useMutation({
    mutationFn: CreateTicket,
  });
};
