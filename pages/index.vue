<template>
  <h1 class="text-2xl font-semibold mb-4 w-full flex items-center justify-center md:justify-start">Pokémons</h1>
  <PokemonContent />
</template>

<script setup>
import PokemonContent from '../components/PokemonContent.vue';
import { onMounted } from 'vue';
import { usePokemonStore } from '../store/usePokemonStore';


const store = usePokemonStore();
onMounted(async () => {
  if (store.allPokemons.length === 0) {
    await store.fetchAllPokemons();
  }
});
</script>