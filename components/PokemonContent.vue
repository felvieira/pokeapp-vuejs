<template>
    <div>
        <PokemonSearchInput />
        <div class="mt-10 mb-40">
            <PokemonSearchResults v-if="searchTerm" />
            <PokemonList v-else />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePokemonStore } from '../store/usePokemonStore';
import PokemonSearchInput from './PokemonSearchInput.vue';
import PokemonSearchResults from './PokemonSearchResults.vue';
import PokemonList from './PokemonList.vue';

const store = usePokemonStore();
const searchTerm = computed(() => store.searchTerm);
</script>