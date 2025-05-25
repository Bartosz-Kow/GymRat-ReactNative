import { useQuery } from "@tanstack/react-query";
import { getExercises } from "@/API/api";

export const useExercisesQuery = () => {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });
};
