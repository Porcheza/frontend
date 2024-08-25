<template>
  <draggable
    :list="tickets"
    group="tickes"
    item-key="id"
    @end="onEnd"
    :disabled="props.disabled"
  >
    <template #item="{ element }">
      <TicketCard :ticket="element" @click="onClick(element)" />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import type { ITicket } from "@/models/ticket.modal";
import { ref } from "vue";
import draggable from "vuedraggable";
import TicketCard from "../Card/TicketCard.vue";
import { useTicketStore } from "../../stores/ticket.store";

const ticketStore = useTicketStore();

const emit = defineEmits([
  "onMoveSuccess",
  "onMoveError",
  "onClick",
  "onChanging",
]);

const props = defineProps<{
  tickets: ITicket[];
  disabled: boolean;
}>();

const tickets = ref<ITicket[]>(props.tickets);

const onEnd = async (event: any) => {
  emit("onChanging");
  const { oldDraggableIndex, newDraggableIndex, from, to } = event;
  const ticketFrom = { ...from["__draggable_component__"].context.element };
  const moveFrom = {
    id: ticketFrom.id,
    index: oldDraggableIndex,
    status: ticketFrom.status,
    value: ticketFrom,
  };

  const moveTo = {
    id: ticketFrom.id,
    index: newDraggableIndex,
    status: to.attributes.id.value,
  };

  try {
    await ticketStore.updateTicket({
      id: ticketFrom.id,
      title: ticketFrom.title,
      description: ticketFrom.description,
      contactInfo: ticketFrom.contactInfo,
      status: to.attributes.id.value,
      newOrder: newDraggableIndex + 1,
    });

    emit("onMoveSuccess", moveTo);
  } catch (error) {
    emit("onMoveError", moveFrom, moveTo);
  }
};

const onClick = (ticket: ITicket) => {
  emit("onClick", ticket);
};
</script>
