import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useAuth } from "../context/Auth";

const QueryProvider = ({ chidlren }: any) => {
  const { authContext } = useAuth();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: async (error, query) => {
        const statusCode = JSON.parse(error.message).status;
        const token = localStorage.getItem("token");
        if (statusCode == 401) {
          if (token) {
            authContext.refreshToken();
            await queryClient.invalidateQueries({
              queryKey: query.queryKey,
            });
          } else {
            authContext.signOut();
          }
        } else {
          authContext.signOut();
        }
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>{chidlren}</QueryClientProvider>
  );
};

export default QueryProvider;
