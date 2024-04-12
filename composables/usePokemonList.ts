import { identifier } from "@babel/types";
import { useInfiniteQuery } from "@tanstack/vue-query";
import axios from "axios";

export function usePokemonList() {
  const fetchPokemons = async ({
    pageParam = "https://pokeapi.co/api/v2/pokemon?limit=24",
  }) => {
    const response = await axios.get(pageParam);
    return response.data;
  };

  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
