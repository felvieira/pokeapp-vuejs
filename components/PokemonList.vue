<template>
    <div class="flex flex-wrap justify-center gap-4">
        <PokemonCard v-for="pokemon in pokemons" :key="pokemon.name" :url="pokemon.url" />
        <div v-if="hasNextPage" ref="loadMoreRef" class="w-full text-center ">Carregando mais...</div>
        <div  ref="loadMoreRef" class="w-full text-center mt-10 mb-20">Footer</div>

    </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '~/composables/useIntersectionObserver';
import PokemonCard from './PokemonCard.vue';
import { usePokemonList } from '~/composables/usePokemonList';
import { computed, ref } from 'vue';
const { data, fetchNextPage, hasNextPage } = usePokemonList();
const loadMoreRef = ref(null);

const pokemons = computed(() => {
    return data.value?.pages.flatMap(page =>
        page.results
    ) || [];
});

useIntersectionObserver(loadMoreRef, (isIntersecting) => {
    if (isIntersecting && hasNextPage.value) {
        fetchNextPage();
    }
});
</script>