import { useAuthContext } from "./useAuthContext";

export const useAuth = () => {
  const { userId, user } = useAuthContext();
  return { userId, user };
};
