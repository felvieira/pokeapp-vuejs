<template>
    <div v-if="pokemonsDetails.length > 0" class="flex flex-wrap justify-center gap-4">
        <PokemonCard v-for="pokemon in pokemonsDetails" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <div v-else class="text-center">
        Nenhum Pokémon encontrado
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePokemonStore } from '../store/usePokemonStore';
import PokemonCard from './PokemonCard.vue';

const store = usePokemonStore();
const pokemonsDetails = computed(() => store.pokemonsDetails);
</script>