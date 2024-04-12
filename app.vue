<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-white py-4 px-6 shadow-md">
      LOGO
      <!-- <img src="ogo.png" alt="Logo" class="h-8">  -->
    </header>


    <div class="flex-1 bg-gray-100 py-6">
      <div class="max-w-4xl mx-auto px-6">

        <div class="mb-6">
          <input type="text" placeholder="Pesquise por nome ou código"
            class="w-full p-4 rounded-full border-2 border-gray-200 focus:border-blue-500">
        </div>

        <h1 class="text-2xl font-semibold mb-4">Pokémons</h1>

        <PokemonList />
      </div>
    </div>
  </div>
</template>

<script setup>
import PokemonList from './components/PokemonList.vue';
</script>