<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ ticket.id ? "Edit" : "Create" }} Ticket
          </h5>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-4">
              <label for="ticket__title" class="form-label font-weight-bold"
                >Title</label
              >
              <input
                v-model="ticket.title"
                type="text"
                class="form-control"
                id="ticket__title"
                required
              />
              <div class="invalid-feedback">Please provide a valid zip.</div>
            </div>
            <div class="mb-4">
              <label
                for="ticket__description"
                class="form-label font-weight-bold"
                >Description</label
              >
              <textarea
                v-model="ticket.description"
                class="form-control"
                id="ticket__description"
                rows="5"
              ></textarea>
            </div>
            <div class="mb-4">
              <label
                for="ticket__description"
                class="form-label font-weight-bold"
                >Contact Information</label
              >
              <textarea
                v-model="ticket.contactInfo"
                class="form-control"
                id="ticket__description"
                rows="3"
              ></textarea>
            </div>

            <div class="mb-3 d-flex flex-row">
              <label class="form-label mr-2 mb-0 font-weight-bold"
                >Created:</label
              >
              <p class="m-0">{{ formatDate(ticket.createdAt) }}</p>
            </div>
            <div class="mb-4 d-flex flex-row">
              <label class="form-label mr-2 mb-0 font-weight-bold"
                >Last updated:</label
              >
              <p class="m-0">{{ formatDate(ticket.updatedAt) }}</p>
            </div>

            <div class="custom_footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="() => (ticket = { ...props.ticket } as ITicket)"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" @click="onSubmit">
                {{ ticket ? "Save" : "Create" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITicket } from "@/models/ticket.modal";
import { ref } from "vue";
import { useTicketStore } from "../../stores/ticket.store";
import dayjs from "dayjs";

const ticketStore = useTicketStore();

const props = defineProps<{
  id: string;
  ticket: ITicket | null;
  status: string;
}>();

const modalId = ref(props.id);
let ticket = ref(
  props.ticket
    ? { ...props.ticket }
    : ({
        title: "",
        description: "",
        contactInfo: "",
        status: props.status,
        createdAt: "",
        updatedAt: "",
      } as ITicket)
);

const onSubmit = async () => {
  if (!ticket.value.title) return;

  if (ticket.value.id) {
    return await ticketStore.updateTicket({
      id: ticket.value.id,
      title: ticket.value.title,
      description: ticket.value.description,
      contactInfo: ticket.value.contactInfo,
      status: ticket.value.status,
      newOrder: ticket.value.order,
    });
  } else {
    return await ticketStore.createTicket({
      title: ticket.value.title,
      description: ticket.value.description,
      contactInfo: ticket.value.contactInfo,
      status: ticket.value.status,
    });
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "-";

  const date = dayjs(dateString);
  // Then specify how you want your dates to be formatted
  return date.format("MMM D, YYYY h:mm A");
};
</script>

<style>
.custom_footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  grid-gap: 1rem;
}
</style>
