<template>
  <div class="layout__default" :style="{ paddingTop: `${paddingTop}px` }">
    <HeaderNav @onHeightChange="onHeightChange" />

    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <Suspense timeout="0">
            <component :is="Component"></component>

            <template #fallback>
              <div
                class="layout__default-pending"
                :style="{ minHeight: `calc(100vh - ${paddingTop}px)` }"
              >
                <CubeLoading />
              </div>
            </template>
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import HeaderNav from "../Nav/HeaderNav.vue";
import CubeLoading from "../LoadingState/CubeLoading.vue";

const paddingTop = ref(0);

const onHeightChange = (value: number) => {
  paddingTop.value = value;
};
</script>
<style lang="css">
.layout__default {
  display: flex;
  min-height: 100vh;
}
.layout__default-pending {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
