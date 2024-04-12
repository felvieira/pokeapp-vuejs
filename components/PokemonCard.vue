<template>
    <div v-if="pokemonDetails?.isSuccess" class="bg-white shadow-lg rounded-lg p-4 min-w-[200px] cursor-pointer"
        @click="openModal">
        <img :src="pokemonDetails?.data?.value?.image" :alt="pokemonDetails?.data?.value?.name" class="mx-auto w-14">
        <p class="text-center">{{ pokemonDetails?.data?.value?.name }}</p>
        <p class="text-center">ID: {{ pokemonDetails?.data?.value?.id }}</p>
        <div class="flex justify-center gap-2 mt-2">
            <div v-for="type in pokemonDetails?.data?.value?.types" :key="type"
                class="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
                {{ type }}
            </div>
        </div>
    </div>
    <div v-else-if="pokemonDetails?.isError">
        Erro ao carregar os dados: {{ pokemonDetails?.error?.message }}
    </div>
    <div v-else>
        Carregando...
    </div>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded-lg max-w-lg w-full">
            <div v-if="pokemonDetails?.isSuccess">
                <img :src="pokemonDetails?.data?.value?.image" :alt="pokemonDetails?.data?.value?.name"
                    class="mx-auto w-24">
                <p class="text-center text-lg font-semibold">{{ pokemonDetails?.data?.value?.name }}</p>
                <p class="text-center text-sm text-gray-600">ID: {{ pokemonDetails?.data?.value?.id }}</p>
                <div class="flex justify-center gap-2 mt-2">
                    <div v-for="type in pokemonDetails?.data?.value?.types" :key="type"
                        class="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
                        {{ type }}
                    </div>
                </div>
                <div v-if="pokemonDetails?.data?.value?.abilities" class="mt-4">
                    <h3 class="text-lg font-semibold mb-2">Habilidades</h3>
                    <div v-for="(ability, index) in pokemonDetails?.data?.value?.abilities" :key="index" class="mb-2">
                        <p class="font-semibold">{{ ability.name }}</p>
                        <ul class="ml-4">
                            <li v-for="(effect, effectIndex) in ability.effects" :key="effectIndex" class="text-sm">{{
        effect }}</li>
                        </ul>
                    </div>
                </div>
                <button @click="closeModal" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Voltar
            </button>
            </div>
           
            <div v-else-if="pokemonDetails?.isError" class="text-red-500">
                Erro ao carregar os dados: {{ pokemonDetails?.error?.message }}
            </div>
            <div v-else class="text-gray-600">
                Carregando...
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePokemonDetails } from '../composables/usePokemonDetails';
import { ref } from 'vue';

const props = defineProps<{ url: string; }>();
const pokemonDetails = usePokemonDetails(props.url);

const showModal = ref(false);

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};
</script>