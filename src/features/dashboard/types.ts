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