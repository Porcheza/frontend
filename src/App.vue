<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <main class="app-container">
    <component :is="route.meta.layout"></component>
  </main>
</template>
