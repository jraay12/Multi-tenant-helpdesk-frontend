export interface CreateTicketInput {
  title: string;
  description: string;
  priority: string;
  category: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  customer_name: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  category: string;
  workspaceId: string;
  createdById: string;
  assignedToId: string | null;
  createdAt: string;
  updatedAt: string;
  assignedTo: {
    name: string;
  };
}
export interface TicketComment {
  ticket: {
    customer_name: string;
    description: string;
  };

  comments: {
    id: string;
    message: string;
    ticketId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;

    user: {
      name: string;
    } | null;
  }[];
}