import { useAxiosBackendService } from "../composables/axios-backend-service";
import { defineStore } from "pinia";
import type { ITicket } from "../models/ticket.modal";
import { computed, ref } from "vue";

export const useTicketStore = defineStore("ticket", () => {
  const { axiosInstance } = useAxiosBackendService();
  const _cacheTickets = ref<ITicket[]>([]);
  const cacheTickets = computed(() => _cacheTickets.value);

  const fetchTickets = async () => {
    const res = await axiosInstance.get<ITicket[]>(`/ticket`);

    if (res.data) {
      _cacheTickets.value = res.data;
      return res.data;
    }

    return null;
  };

  const updateTicket = async (ticket: ITicket) => {
    const res = await axiosInstance.patch<ITicket>(
      `/ticket/${ticket.id}`,
      ticket
    );

    if (res.data) {
      const index = _cacheTickets.value.findIndex((t) => t.id === ticket.id);
      _cacheTickets.value[index] = res.data;
      return res.data;
    }

    return null;
  };

  return {
    fetchTickets,
    updateTicket,
    cacheTickets,
  };
});
