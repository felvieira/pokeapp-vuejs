<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded-lg max-w-lg w-full">
            <div v-if="isSuccess && pokemonData">
                <img :src="pokemonData?.image" :alt="pokemonData?.name" class="mx-auto w-24">
                <p class="text-center text-lg font-semibold">{{ pokemonData?.name }}</p>
                <p class="text-center text-sm text-gray-600">ID: {{ pokemonData?.id }}</p>
                <div class="flex justify-center gap-2 mt-2">
                    <div v-for="type in pokemonData?.types" :key="type"
                        class="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
                        {{ type }}
                    </div>
                </div>


                <h3 class="text-lg font-semibold mb-2">Habilidades</h3>
                <div v-for="ability in pokemonData.abilities" :key="ability.name">
                    <h3>{{ ability.name }}</h3>
                    <ul class="ml-4">
                        <li v-for="effect in ability.effects" :key="effect" class="text-sm">{{ effect }}</li>
                    </ul>
                </div>
                <div>
                    <NuxtLink to="/">Voltar</NuxtLink>
                </div>
            </div>
            <div v-else>
                <p class="text-center">Carregando detalhes do Pokémon...</p>
            </div>

        </div>
    </div>
</template>



<script setup>
import { useRoute } from 'vue-router';
import useCompletePokemonDetails from '../composables/useCompletePokemonDetails';

const route = useRoute();
const pokemonId = route.params.id;

const { data: pokemonData, isSuccess } = useCompletePokemonDetails(pokemonId);
</script>