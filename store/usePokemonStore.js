import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonStore = defineStore("pokemonStore", {
  state: () => ({
    allPokemons: [],
    filteredPokemons: [],
    searchTerm: "",
    pokemonsDetails: [],
  }),
  actions: {
    setSearchTerm(term) {
      this.searchTerm = term;
    },
    async fetchAllPokemons() {
      let url = "https://pokeapi.co/api/v2/pokemon?limit=1310";

      while (url) {
        const response = await axios.get(url);
        this.allPokemons.push(
          ...response.data.results.map((pokemon) => ({
            name: pokemon.name,
            url: pokemon.url,
            id: pokemon.url.split("/").filter(Boolean).pop(),
          }))
        );
        url = response.data.next;
      }
    },
    async fetchPokemonDetails(url) {
      try {
        const response = await axios.get(url);
        const { name, id, sprites, types } = response.data;

        return {
          name,
          id,
          image: sprites.other["official-artwork"].front_default,
          types: types.map((type) => type.type.name),
        };
      } catch (error) {
        console.error("Failed to fetch pokemon details", error);
        return null;
      }
    },
    async fetchDetailsForFilteredPokemons() {
      this.pokemonsDetails = [];
      for (let pokemon of this.filteredPokemons) {
        const pokemonDetails = await this.fetchPokemonDetails(pokemon.url);
        if (pokemonDetails) {
          this.pokemonsDetails.push(pokemonDetails);
        }
      }
    },
    filterPokemons(term) {
      this.searchTerm = term;
      if (term === "") {
        this.filteredPokemons = [];
      } else {
        this.filteredPokemons = this.allPokemons.filter(
          (pokemon) =>
            pokemon.name.includes(term.toLowerCase()) ||
            pokemon.id.toString() === term
        );
      }
      this.fetchDetailsForFilteredPokemons();
    },
  },
});
