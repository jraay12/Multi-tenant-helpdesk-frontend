export interface MyWorkspaceResponse {
  id: string
  name: string
  slug: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    members: string;
  };
}