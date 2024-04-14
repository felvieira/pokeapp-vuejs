<template>
    <div class="relative">
        <input type="text" placeholder="Digite o nome ou ID do Pokémon" v-model="searchTerm"
            @input="debounceFilter($event.target.value)"
            class="w-full p-4 pl-10 rounded-full border-2 border-gray-200 focus:border-blue-500" />
        <svg class="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePokemonStore } from '../store/usePokemonStore';
import debounce from 'lodash/debounce';

const store = usePokemonStore();
const searchTerm = ref('');

const debounceFilter = debounce((value) => {
    store.setSearchTerm(value);
    store.filterPokemons(value);
}, 700);
</script>