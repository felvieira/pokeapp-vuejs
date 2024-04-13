import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import type { PokemonDetails, PokemonAbility } from "../types/types";


export function usePokemonDetails(url: string) {
    return useQuery<PokemonDetails>({
        queryKey: ["pokemonDetails", url],
        queryFn: async () => {
            const response = await axios.get(url);
            const { name, id, sprites, types, abilities } = response.data;

            const processedAbilities: PokemonAbility[] = abilities.map((ability: any) => {
                return {
                    name: ability.ability.name,
                    url: ability.ability.url,
                };
            });

            return {
                name,
                id,
                image: sprites.other["official-artwork"].front_default,
                types: types.map((type: { type: { name: string } }) => type.type.name),
                abilities: processedAbilities,
            };
        },
        staleTime: Infinity,
    });
}
