<template>
  <div class="draggable__container">
    <div v-for="board in props.boards" class="card card__board">
      <div class="d-flex flex-row justify-content-between">
        <h3 class="mb-0">{{ board.name }}</h3>
        <FontAwesomeIcon
          class="curser_pointer"
          icon="fa-solid fa-plus-circle"
          size="2x"
          @click="() => openModal(`modal_${board.name}`)"
        />
      </div>
      <div class="div-divider"></div>
      <Draggable
        :id="board.name"
        :key="board.name"
        :tickets="board.tickets"
        class="draggable__board"
        :disabled="disabled"
        @onMoveSuccess="onMoveSuccess"
        @on-move-error="onMoveError"
        @on-changing="() => (disabled = true)"
      ></Draggable>
      <CreateOrUpdateTicketModal
        :id="`modal_${board.name}`"
        :ticket="null"
        :status="board.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Board } from "../../models/ticket.modal";
import Draggable from "../../components/Board/Draggable.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import CreateOrUpdateTicketModal from "../Modal/CreateOrUpdateTicketModal.vue";
import { Modal } from "bootstrap";
import { ref } from "vue";

const props = defineProps<{
  boards: Board[];
}>();

let disabled = ref<boolean>(false);

const emit = defineEmits(["onMoveSuccess", "onMoveError"]);

const onMoveSuccess = (to: any) => {
  disabled.value = false;
  emit("onMoveSuccess", to);
};

const onMoveError = (from: any, to: any) => {
  disabled.value = false;
  emit("onMoveError", from, to);
};

const openModal = (id: string) => {
  const modal = new Modal(document.getElementById(id));
  if (modal) {
    modal.show();
  }
};
</script>

<style>
.card__board {
  height: 80vh;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px 10px 10px 10px;
  background-color: #f7f8fa;
  overflow-y: auto;
}

.draggable__container {
  height: auto;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  grid-gap: 2rem;
}

@media (min-width: 1024px) {
  .draggable__container {
    height: calc(100vh - 120px);
    width: 100%;
    flex-wrap: nowrap;
  }

  .card__board {
    height: 100%;
    width: 23%;
  }
}

.draggable__board {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;
}
</style>
