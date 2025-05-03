import { useMutation } from "@tanstack/react-query";
import { login } from "@/API/api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
