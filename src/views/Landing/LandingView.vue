<template>
  <div class="landing__container">
    <BoardDraggable
      :boards="boards"
      @on-move-success="onMoveSuccess"
      @on-move-error="onMoveError"
    ></BoardDraggable>
  </div>
</template>

<script setup lang="ts">
import { Status, type Board, type ITicket } from "../../models/ticket.modal";
import BoardDraggable from "../../components/Board/BoardDraggable.vue";
import { onMounted, ref } from "vue";
import { useTicketStore } from "../../stores/ticket.store";
const ticketStore = useTicketStore();

let boards = ref<Board[]>([
  {
    name: Status.PENDING,
    tickets: [],
  },
  {
    name: Status.ACCEPTED,
    tickets: [],
  },
  {
    name: Status.RESOLVED,
    tickets: [],
  },
  {
    name: Status.REJECTED,
    tickets: [],
  },
]);

const fetchTickets = async () => {
  try {
    const tickets: ITicket[] = (await ticketStore.fetchTickets())!;
    for (let ticket of tickets) {
      let board = boards.value.find((board) => board.name === ticket.status);
      if (board) {
        board.tickets.push(ticket);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const onMoveSuccess = async (to: any) => {
  boards.value = boards.value.map((board) => {
    if (board.name === to.status) {
      board.tickets[to.index].status = to.status;
    }
    return board;
  });
};

const onMoveError = async (from: any, to: any) => {
  boards.value = boards.value.map((board) => {
    if (board.name === to.status) {
      board.tickets.splice(to.index, 1);
    }

    if (board.name === from.status) {
      board.tickets.push(from.value);
    }
    return board;
  });
};

onMounted(() => {
  fetchTickets();
});
</script>

<style lang="css" scoped>
.landing__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 0.5rem;
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .landing__container {
    padding: 2rem 1rem;
    width: calc(100% - 100px);
  }
}
</style>
