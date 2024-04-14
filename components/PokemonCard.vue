<template>
    <div v-if="pokemonData?.isSuccess || pokemon"
        class="bg-white shadow-lg rounded-lg p-4 w-64 h-80 flex flex-col justify-between cursor-pointer">
        <NuxtLink :to="'/pokemon/' + computedPokemon?.id" class="h-full flex flex-col justify-between">
            <div>
                <img :src="computedPokemon?.image" :alt="computedPokemon?.name" class="mx-auto w-14 h-14">
                <p class="text-center capitalize font-bold text-xl mt-4">{{ computedPokemon?.name }}</p>
                <p class="text-center font-bold mt-4">Cód: {{ computedPokemon?.id }}</p>
            </div>
            <div class="flex justify-center gap-2">
                <div v-for="type in computedPokemon?.types" :key="type"
                    class="px-3 py-1 rounded-full text-sm text-white uppercase"
                    :style="{ backgroundColor: getTypeColor(type) }">
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
import { getTypeColor } from '@/utils/pokemonTypes';
const props = defineProps({
    pokemon: Object,
    url: String
});

const pokemonData = props.url ? usePokemonDetails(props.url) : null;

const computedPokemon = computed(() => {
    return props.pokemon || (pokemonData.isSuccess ? pokemonData.data.value : null);
});

</script>