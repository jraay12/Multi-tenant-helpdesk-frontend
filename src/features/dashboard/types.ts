// types.ts

export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export type TicketStatisticItem = {
  total: number;
  today?: number;
  thisWeek?: number;
};

export type TicketStatisticResponse = {
  data: Record<TicketStatus, TicketStatisticItem>;
};

export interface RecentTicketResponse {
  id: string
  title: string
  status: string
  category: string
  customer_name: string
  createAt: Date
  priority: string
  assignedTo: {
    name: string
  } | null
  timeAgo: string
}