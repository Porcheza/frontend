<template>
  <ul class="navbar-nav mr-auto nav-items"></ul>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<style lang="css">
.nav-items {
  width: 100%;
  gap: 0.25rem;
}

.top-nav-item {
  text-indent: 0.75rem;
}

@media (min-width: 768px) {
  .nav-items {
    width: auto;
    gap: 0.25rem;
  }

  .top-nav-item {
    text-indent: 0;
  }
}
</style>
