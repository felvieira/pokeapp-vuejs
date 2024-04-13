<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-white py-4 px-6 shadow-md">
      LOGO
      <!-- <img src="ogo.png" alt="Logo" class="h-8">  -->
    </header>


    <div class="flex-1 bg-gray-100 py-6">
      <div class="max-w-4xl mx-auto px-6">

        <h1 class="text-2xl font-semibold mb-4">Pokémons</h1>

        <PokemonContent />
      </div>
    </div>
  </div>
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