<template>
    <div v-if="pokemonData?.isSuccess || pokemon" class="bg-white shadow-lg rounded-lg p-4 min-w-[200px] cursor-pointer">
        <NuxtLink :to="'/pokemon/' + computedPokemon?.id">
            <img :src="computedPokemon?.image" :alt="computedPokemon?.name" class="mx-auto w-14">
            <p class="text-center">{{ computedPokemon?.name }}</p>
            <p class="text-center">ID: {{ computedPokemon?.id }}</p>
            <div class="flex justify-center gap-2 mt-2">
                <div v-for="type in computedPokemon?.types" :key="type"
                    class="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
                    {{ type }}
                </div>
            </div>
        </NuxtLink>
    </div>
    <div v-else-if="pokemonData.isError">
        Erro ao carregar os dados: {{ pokemonData.error.message }}
    </div>
    <div v-else>
        Carregando...
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { usePokemonDetails } from '../composables/usePokemonDetails';

const props = defineProps({
    pokemon: Object,
    url: String
});

const pokemonData = props.url ? usePokemonDetails(props.url) : null;

const computedPokemon = computed(() => {
    return props.pokemon || (pokemonData.isSuccess ? pokemonData.data.value : null);
});
</script>