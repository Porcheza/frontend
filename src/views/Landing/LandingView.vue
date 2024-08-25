<template>
  <div class="landing__container">
    <FilterTicket @on-filter="onFilter" class="mb-3"></FilterTicket>
    <BoardDraggable
      key="boards"
      :boards="boards"
      @on-move-success="onMoveSuccess"
      @on-move-error="onMoveError"
    ></BoardDraggable>
  </div>
</template>

<script setup lang="ts">
import { Status, type Board, type ITicket } from "../../models/ticket.modal";
import BoardDraggable from "../../components/Board/BoardDraggable.vue";
import { computed, onMounted, ref } from "vue";
import { useTicketStore } from "../../stores/ticket.store";
import FilterTicket from "../../components/Board/FilterTicket.vue";
const ticketStore = useTicketStore();
const cacheTickets = computed(() => ticketStore._cacheTickets);

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

const fetchTickets = async (filter = {}) => {
  try {
    (await ticketStore.fetchTickets(filter))!;
    for (let ticket of cacheTickets.value) {
      let board = boards.value.find((board) => board.name === ticket.status);
      if (board) {
        board.tickets.push(ticket);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const onFilter = async (filters: any) => {
  const filter: any = {};
  const { status = [], sortBy = null } = filters;

  if (status.length) {
    filter["status"] = status;
  }

  if (sortBy) {
    filter["sortBy"] = sortBy;
  }

  boards.value = boards.value.map((board) => {
    board.tickets.splice(0);
    return board;
  });

  await fetchTickets(filter);
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
  padding: 1.25rem;
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .landing__container {
    padding: 2rem 1rem;
    width: 80%;
  }
}
</style>
