import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import type { CompletePokemonDetails, PokemonDetailsFull, ProcessedAbility } from "~/types/types";

async function fetchAbilityEffects(abilityUrl: string): Promise<string[]> {
    const response = await axios.get(abilityUrl);
    const effects = response.data.effect_entries;
    const englishEffects = effects.filter((entry: any) => entry.language.name === "en");
    return englishEffects.map((effect: any) => effect.short_effect);
}

function useCompletePokemonDetails(pokemonId: string): UseQueryResult<CompletePokemonDetails, unknown> {
    return useQuery<CompletePokemonDetails>({
        queryKey: ['completePokemonDetails', pokemonId],
        queryFn: async () => {
            const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
            const response = await axios.get(pokemonUrl);
            const data: PokemonDetailsFull = response.data;

            const processedAbilities: ProcessedAbilityy[] = await Promise.all(data.abilities.map(async (ability) => {
                const effects = await fetchAbilityEffects(ability.ability.url);
                return {
                    name: ability.ability.name,
                    effects,
                };
            }));

            return {
                name: data.name,
                id: data.id,
                image: data.sprites.other["official-artwork"].front_default,
                types: data.types.map(type => type.type.name),
                abilities: processedAbilities,
            };
        },
        staleTime: Infinity,
    });
}

export default useCompletePokemonDetails;