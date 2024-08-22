import { useAxiosBackendService } from "@/composables/axios-backend-service";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { ITicket } from "../models/ticket.model";

export const useSectorStore = defineStore("ticket", () => {
  const { axiosInstance } = useAxiosBackendService();
  const _cacheTicket = ref<ITicket[]>([]);

  const getTicket = async () => {
    if (_cacheTicket.value.length) return _cacheTicket.value;

    const res = await axiosInstance.get<ITicket[]>(`/ticket/getTicket`);
    if (res.data) {
      _cacheTicket.value = res.data;
      return res.data;
    }
    return null;
  };

  return {
    getTicket,
  };
});
