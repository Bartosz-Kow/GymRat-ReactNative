import { useMutation } from "@tanstack/react-query";
import { register } from "@/API/api";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
  });
};
