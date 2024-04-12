import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import type { PokemonDetails, PokemonAbility } from "../types/types";

export async function getAbilityEffect(abilityUrl: string): Promise<string[]> {
    const response = await axios.get(abilityUrl);
    const effects = response.data.effect_entries;
    const englishEffects = effects.filter((effect: any) => effect.language.name === "en");
    return englishEffects.map((effect: any) => effect.short_effect);
}

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

            const abilitiesWithEffects = await Promise.all(
                processedAbilities.map(async (ability) => {
                    const effects = await getAbilityEffect(ability.url);
                    return {
                        ...ability,
                        effects,
                    };
                })
            );

            return {
                name,
                id,
                image: sprites.other["official-artwork"].front_default,
                types: types.map((type: { type: { name: string } }) => type.type.name),
                abilities: abilitiesWithEffects,
            };
        },
        staleTime: Infinity,
    });
}
