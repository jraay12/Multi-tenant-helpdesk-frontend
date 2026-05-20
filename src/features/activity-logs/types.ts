export interface ActivityLogUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface ActivityLogTicket {
  id: string;
  title: string;
}

export interface ActivityLog {
  id: string;

  user: ActivityLogUser | null;

  action:
    | "TICKET_CREATED"
    | "TICKET_UPDATED"
    | "TICKET_ASSIGNED"
    | "TICKET_STATUS_CHANGED"
    | "COMMENT_ADDED"
    | "WORKSPACE_MEMBER_ADDED";

  description: string;

  ticket: ActivityLogTicket | null;

  metadata: Record<string, any> | null;

  createdAt: string;
}

export interface ActivityLogsResponse {
  message: string;

  data: ActivityLog[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}