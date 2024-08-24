<template>
  <div class="draggable__container">
    <div v-for="board in props.boards" class="card card__board">
      <div>
        <h3>{{ board.name }}</h3>
      </div>
      <Draggable
        :id="board.name"
        :key="board.name"
        :tickets="board.tickets"
        class="draggable__board"
        @onMoveSuccess="onMoveSuccess"
        @on-move-error="onMoveError"
      ></Draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Board } from "../../models/ticket.modal";
import Draggable from "../../components/Board/Draggable.vue";
const props = defineProps<{
  boards: Board[];
}>();

const emit = defineEmits(["onMoveSuccess", "onMoveError"]);

const onMoveSuccess = (to: any) => {
  emit("onMoveSuccess", to);
};

const onMoveError = (from: any, to: any) => {
  emit("onMoveError", from, to);
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
