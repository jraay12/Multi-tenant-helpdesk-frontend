import { useMutation } from "@tanstack/react-query";
import { register } from "../api/registration";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
