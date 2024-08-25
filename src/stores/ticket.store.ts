import { useAxiosBackendService } from "../composables/axios-backend-service";
import { defineStore } from "pinia";
import type {
  CreateTicketDto,
  ITicket,
  UpdateTicketDto,
} from "../models/ticket.modal";
import { ref } from "vue";

export const useTicketStore = defineStore("ticket", () => {
  const { axiosInstance } = useAxiosBackendService();
  const _cacheTickets = ref<ITicket[]>([]);

  const fetchTickets = async (params = {}) => {
    _cacheTickets.value = [];
    const res = await axiosInstance.get<ITicket[]>(`/ticket`, { params });

    if (res.data) {
      _cacheTickets.value = res.data;
      return res.data;
    }

    return null;
  };

  const createTicket = async (ticket: CreateTicketDto) => {
    const res = await axiosInstance.post<ITicket>("/ticket", ticket);

    if (res.data) {
      _cacheTickets.value.push(res.data);
      return res.data;
    }

    return null;
  };

  const updateTicket = async (ticket: UpdateTicketDto) => {
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
    createTicket,
    updateTicket,
    _cacheTickets,
  };
});
