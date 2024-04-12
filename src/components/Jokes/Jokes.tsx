import {
  fetchJokesQueryFunction,
  fetchJokesQueryKey,
} from "@/queries/useJokesApi";
import { QueryClient } from "@tanstack/react-query";

const Jokes = async () => {
  const queryClient = new QueryClient();

  const queryResult = await queryClient.fetchQuery({
    queryKey: fetchJokesQueryKey(),
    queryFn: fetchJokesQueryFunction,
  });
  console.log({ queryResult });
  return <div>Jokes</div>;
};

export { Jokes };
