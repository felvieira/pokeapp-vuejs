import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { useStore } from 'vuex';
import type { PokemonDetails } from "~/types/types";

export function useSearchPokemon() {
  const store = useStore();

  const setSearchTerm = (term: string) => {
    store.commit('setSearchTerm', term);
  };

  const queryResults = useQuery<PokemonData, Error>({
    queryKey: ['searchPokemon', store.getters.getSearchTerm],
    queryFn: () => fetchPokemon(store.getters.getSearchTerm),
    enabled: !!store.getters.getSearchTerm,
    refetchOnWindowFocus: false
  });

  return {
    queryResults,
    setSearchTerm
  };
}

async function fetchPokemon(searchTerm: string): Promise<PokemonDetails> {
  if (!searchTerm.trim()) throw new Error('Search term is empty');

  const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
  const response = await axios.get(url);

  if (response.status !== 200) throw new Error('Pokemon not found');

  return response.data;
}
