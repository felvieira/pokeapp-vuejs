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
    ability: {
        name: string;
        url: string;
    };
}

export interface PokemonDetailsFull {
    name: string;
    id: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    types: Array<{ type: { name: string } }>;
    abilities: PokemonAbility[];
}

export interface ProcessedAbility {
    name: string;
    effects: string[];
}

export interface CompletePokemonDetails {
    name: string;
    id: number;
    image: string;
    types: string[];
    abilities: ProcessedAbility[];
}
