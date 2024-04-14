<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div v-if="isSuccess && pokemonData">
            <div class="bg-white p-4 rounded-lg max-w-lg w-full">

                <img :src="pokemonData?.image" :alt="pokemonData?.name" class="mx-auto w-60">
                <p class="text-center text-lg font-semibold mt-2 text-4xl capitalize">{{ pokemonData?.name }}</p>
                <div class="flex justify-center gap-2 mt-12">
                    <div v-for="type in pokemonData?.types" :key="type"
                        class="px-3 py-1 rounded-full text-sm text-white uppercase"
                        :style="{ backgroundColor: getTypeColor(type) }">
                        {{ type }}
                    </div>
                </div>
            </div>
            <div class="bg-white p-4 rounded-lg max-w-lg w-full mt-10">

                <h3 class="text-lg font-semibold mb-2 text-center">Habilidades</h3>
                <div v-for="ability in pokemonData.abilities" :key="ability.name">
                    <ul class="ml-4">
                        <li v-for="(effect, index) in ability.effects" :key="effect" 
                        class="text-gray-500 text-sm py-3 border-t border-gray-100">
                            {{ effect }}
                        </li>
                    </ul>
                </div>

            </div>
            <div class="mt-20 text-center cursor-pointer text-blue-500 font-bold">
                <NuxtLink to="/">Voltar</NuxtLink>
            </div>
        </div>
        <div v-else>
            <p class="text-center">Carregando detalhes do Pokémon...</p>
        </div>
    </div>
</template>



<script setup>
import { useRoute } from 'vue-router';
import useCompletePokemonDetails from '../composables/useCompletePokemonDetails';
import { getTypeColor } from '@/utils/pokemonTypes';

const route = useRoute();
const pokemonId = route.params.id;

const { data: pokemonData, isSuccess } = useCompletePokemonDetails(pokemonId);
</script>