<template>
    <div>
        <input type="text" placeholder="Digite o nome ou ID do Pokémon" v-model="searchTerm"
            @input="debounceFilter($event.target.value)"
            class="w-full p-4 rounded-full border-2 border-gray-200 focus:border-blue-500" />
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