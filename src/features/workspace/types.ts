export interface MyWorkspaceResponse {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    members: string;
  };
}

export interface MyWorkspaceResponseById {
  workspace: {
    id: string;
    name: string;
    description: string | null;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  };
  role: string;
  name: string
}

export interface WorkspaceMembers {
  id: string;
  userId: string;
  workspaceId: string;
  role: string;
  createdAt: Date;
  user: {
    name: string;
    email: string;
    _count: {
      ticketsAssigned: number
    }
  };
  
}


export interface CreateWorkspaceInput {
  name: string
  description: string
}