import { getGoalsWithTodayLog } from "@/service/goalService";
import { useQuery } from "@tanstack/react-query";

export const useGetGoalsWithTodyLog = (userId: string) => {
  return useQuery({
    queryKey: ['goals-todaylogs', userId],
    queryFn: () => getGoalsWithTodayLog(userId),
    enabled: !!userId,
  });
};
