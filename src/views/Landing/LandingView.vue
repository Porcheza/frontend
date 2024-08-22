<template>
  <div class="landing__container">
    <h1>Welcome to the Landing View!</h1>
    <!-- Your content here -->
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.landing__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 0.5rem;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  gap: 2rem 0;
}

.landing__header,
.landing-search__container,
.landing-list__container {
  width: 100%;
}

.landing__header h2 {
  font-weight: 600;
}

@media (min-width: 768px) {
  .landing__container {
    padding: 2rem 1rem;
    gap: 1.5rem 0;
  }
}
</style>
