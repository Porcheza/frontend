<template>
  <nav
    ref="navbar"
    class="navbar navbar-expand-md navbar-light bg-secondary fixed-top"
    :class="{ 'nav-shadow': showShadow }"
  >
    <div class="navbar-brand">
      <h3 class="mb-0">Ticket Board</h3>
    </div>

    <button
      class="navbar-toggler is-active collapsed hamburger"
      @click="showSidebar"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </button>

    <!-- <div class="d-none d-md-flex navbar-content__container">
      <NavMenu></NavMenu>
    </div> -->
  </nav>
</template>

<script setup lang="ts">
import NavMenu from "./_NavMenu.vue";

import { computed, onMounted, onUnmounted, ref } from "vue";
import NavController from "../../composables/nav-controller";

const navbar = ref<HTMLElement>();
const componentHeight = ref(0);
const isScrollAtTop = ref(true);
const { showSidebar, hideSidebar } = NavController;

const emit = defineEmits(["onHeightChange"]);

const showShadow = computed(() => !isScrollAtTop.value);

const scrollHandler = () => {
  if (window.scrollY > 0) {
    isScrollAtTop.value = false;
    return;
  }

  isScrollAtTop.value = true;
};

const windowResizeHandler = () => {
  if (navbar.value && navbar.value) {
    if (componentHeight.value != navbar.value.offsetHeight) {
      componentHeight.value = navbar.value.offsetHeight;
      emit("onHeightChange", componentHeight.value);
    }
  }

  if (window.innerWidth > 768) {
    hideSidebar();
  }
};

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
  window.addEventListener("resize", windowResizeHandler);
  windowResizeHandler();
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
  window.removeEventListener("resize", windowResizeHandler);
});

defineExpose({
  showShadow,
});
</script>

<style lang="css">
nav.navbar {
  gap: 0.5rem;
}

nav.navbar.fixed-top {
  transition: box-shadow 0.25s ease;
}

nav.navbar.fixed-top.nav-shadow {
  -webkit-box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.35);
  box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.35);
}

.navbar-content__container {
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.actions__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
  padding: 0.5rem;
}

@media (min-width: 768px) {
  .navbar-brand {
    z-index: 1;
  }

  .actions__container {
    flex-direction: row;
    width: auto;
    padding: 0;
  }
}
</style>
