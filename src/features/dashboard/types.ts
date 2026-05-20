// types.ts

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TicketStatisticItem = {
  total: number;
  today?: number;
  thisWeek?: number;
};

export type TicketStatisticResponse = {
  data: Record<TicketStatus, TicketStatisticItem>;
};

export interface RecentTicketResponse {
  id: string;
  title: string;
  status: TicketStatus;
  category: string;
  customer_name: string;
  createAt: Date;
  priority: TicketPriority;
  assignedTo: {
    name: string;
  } | null;
  timeAgo: string;
  ticket_number: string
}
