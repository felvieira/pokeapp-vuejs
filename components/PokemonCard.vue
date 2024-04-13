<template>
    <div v-if="pokemonDetails?.isSuccess" class="bg-white shadow-lg rounded-lg p-4 min-w-[200px] cursor-pointer">
        <NuxtLink :to="'/pokemon/' + pokemonDetails?.data?.value?.id ">
            <img :src="pokemonDetails?.data?.value?.image" :alt="pokemonDetails?.data?.value?.name"
                class="mx-auto w-14">
            <p class="text-center">{{ pokemonDetails?.data?.value?.name }}</p>
            <p class="text-center">ID: {{ pokemonDetails?.data?.value?.id }}</p>
            <div class="flex justify-center gap-2 mt-2">
                <div v-for="type in pokemonDetails?.data?.value?.types" :key="type"
                    class="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
                    {{ type }}
                </div>
            </div>
        </NuxtLink>
    </div>
    <div v-else-if="pokemonDetails?.isError">
        Erro ao carregar os dados: {{ pokemonDetails?.error?.message }}
    </div>
    <div v-else>
        Carregando...
    </div>

</template>

<script setup lang="ts">
import { usePokemonDetails } from '../composables/usePokemonDetails';
import { ref } from 'vue';

const props = defineProps<{ url: string; }>();
const pokemonDetails = usePokemonDetails(props.url);

</script>