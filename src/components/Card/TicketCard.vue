<template>
  <div
    class="card card-box w-100"
    :class="{
      [`active__${templateStats[ticket.status].className}`]: true,
    }"
  >
    <div class="card-body curser_pointer" @click="onEdit(ticket)">
      <div class="mt-3 line-height-sm">
        <h3 class="font-weight-bold font-size-lg mb-1 text-truncate__title">
          {{ ticket.title }}
        </h3>
        <p class="text-black-50 mb-0 text-truncate__description">
          {{ ticket.description }}
        </p>
      </div>
    </div>

    <CreateOrUpdateTicketModal
      :id="`modal__ticket-${ticket.id}`"
      :ticket="ticket"
      :status="ticket.status"
    />
  </div>
</template>

<script setup lang="ts">
import type { ITicket } from "@/models/ticket.modal";
import { ref } from "vue";
import CreateOrUpdateTicketModal from "../Modal/CreateOrUpdateTicketModal.vue";
import { Modal } from "bootstrap";

const emit = defineEmits(["onEdit"]);

const props = defineProps<{
  ticket: ITicket;
}>();

const ticket = ref<ITicket>(props.ticket);

const onEdit = (ticket: ITicket) => {
  const modalElement = document.getElementById(`modal__ticket-${ticket.id}`);
  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.show();
  }
};

const templateStats: { [key: string]: { className: string } } = {
  PENDING: {
    className: "pendding",
  },
  ACCEPTED: {
    className: "accepted",
  },
  RESOLVED: {
    className: "resolved",
  },
  REJECTED: {
    className: "rejected",
  },
};
</script>

<style lang="scss" scoped>
$pendding: #3c44b1;
$background-pendding: #eceef7;
$accepted: #f4772e;
$background-accepted: #fffbf2;
$resolved: #1bc943;
$background-resolved: #e5f9ed;
$rejected: #f83245;
$background-rejected: #fff5f6;

.active {
  &__pendding {
    border-left-color: $pendding !important;
    &:hover {
      background-color: $background-pendding;
    }
  }

  &__accepted {
    border-left-color: $accepted !important;
    &:hover {
      background-color: $background-accepted;
    }
  }

  &__resolved {
    border-left-color: $resolved !important;
    &:hover {
      background-color: $background-resolved;
    }
  }

  &__rejected {
    border-left-color: $rejected !important;
    &:hover {
      background-color: $background-rejected;
    }
  }
}

.card-box {
  border-left-width: 3px;
  border-radius: 0.42rem;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.25);
  }
}
.text-truncate {
  &__title {
    -webkit-line-clamp: 1;
    display: -webkit-box;
    width: 100%;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__description {
    -webkit-line-clamp: 4;
    display: -webkit-box;
    width: 100%;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
