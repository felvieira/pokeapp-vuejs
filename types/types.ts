export interface Pokemon {
    name: string;
    url: string;
    details?: PokemonDetails;
}


export interface PokemonDetails {
    name: string;
    id: number | null;
    image: string;
    types: string[];
    abilities: PokemonAbility[];
}


export interface PokemonAbility {
    name: string;
    url: string;
}
