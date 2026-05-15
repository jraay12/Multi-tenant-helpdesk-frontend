import { api } from "../../../lib/appClient";
import axios from "axios";
import type { Ticket } from "../types";

export const getTicketById = async (ticketId: string): Promise<Ticket | null> => {
  try {
    const response = await api.get(`/api/v1/ticket/${ticketId}`);
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return null;
    }

    throw err;
  }
};
