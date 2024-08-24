<template>
  <div
    class="card card-box w-100"
    :class="{
      [`active__${templateStats[ticket.status].className}`]: true,
    }"
  >
    <div class="card-body">
      <div class="mt-3 line-height-sm">
        <h3 class="font-weight-bold font-size-lg mb-1">
          {{ ticket.title }}
        </h3>
        <p class="text-black-50 mb-0">{{ ticket.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITicket } from "@/models/ticket.modal";
import { ref } from "vue";

const props = defineProps<{
  ticket: ITicket;
}>();

const ticket = ref<ITicket>(props.ticket);

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
</style>
