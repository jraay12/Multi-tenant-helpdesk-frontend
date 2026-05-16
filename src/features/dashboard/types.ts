export interface TicketStatisticResponse {
  OPEN: {
    total: number;
    today: number;
  };

  IN_PROGRESS: {
    total: number;
    today: number;
  };

  RESOLVED: {
    total: number;
    thisWeek: number;
  };

  CLOSED: {
    total: number;
  };
}
