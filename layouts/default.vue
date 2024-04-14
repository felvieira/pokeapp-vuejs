<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-white py-4 flex items-center shadow-md w-full justify-center md:justify-start md:ml-5">
      <LogoIcon />
    </header>

    <div class="flex-1 bg-gray-100 py-6">
      <div class="max-w-6xl mx-auto px-6">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script>
import LogoIcon from '@/components/icons/Logo.vue';

export default {
  components: {
    LogoIcon
  }
}
</script>