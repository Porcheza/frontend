<template>
  <div class="filter__container">
    <div>
      <label for="sort">Sort By:</label>
      <select v-model="sortBy" class="custom-select ml-3">
        <option :value="null">None</option>
        <option :value="{ createdAt: 'DESC' }">Created</option>
        <option :value="{ updatedAt: 'DESC' }">Last updated</option>
      </select>
    </div>

    <div class="btn-group dropend">
      <button
        class="btn btn-link dropdown-toggle"
        type="button"
        id="dropdownFilterStatus"
        data-bs-toggle="dropdown"
        data-bs-auto-close="false"
        aria-expanded="false"
      >
        Filter
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownFilterStatus">
        <div class>
          <div class="form-check m-3" v-for="st in status">
            <input
              :id="`selected-${st}`"
              v-model="selectedStatus"
              class="form-check-input"
              type="checkbox"
              :value="st"
            />
            <label class="form-check-label ml-2" :for="`selected-${st}`">
              {{ st }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Status } from "../../models/ticket.modal";

const status = Status;
const filters = ref<object>({
  status: [],
  sortBy: null,
});
const selectedStatus = ref<string[]>([]);
const sortBy = ref<string | null>(null);

const emit = defineEmits(["onFilter"]);

watch(selectedStatus, (status) => {
  filters.value = { ...filters.value, status };
  emit("onFilter", filters.value);
});

watch(sortBy, (sortBy) => {
  filters.value = { ...filters.value, sortBy };
  emit("onFilter", filters.value);
});
</script>

<style>
.filter__container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  grid-gap: 1rem;
}
.custom-select {
  width: auto;
}
</style>
