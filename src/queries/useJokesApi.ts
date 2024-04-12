import { API } from "@/helpers/api/requests";
import { useQuery } from "@tanstack/react-query";

export const fetchJokesQueryKey = () => ["fetchJokesQueryKey"];

export const fetchJokesQueryFunction = () => API.jokesApi.fetchJokes();

const useFetchIdea = () => {
  const queryResult = useQuery({
    queryKey: fetchJokesQueryKey(),
    queryFn: fetchJokesQueryFunction,
  });

  return queryResult;
};

export { useFetchIdea };
