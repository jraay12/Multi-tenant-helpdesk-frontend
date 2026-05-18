export interface FetchUserInvites {
  id: string
  name: string
  email: string
  isMember: boolean
}


export interface DirectInviteInputs {
  userIds: string[]
  role: "AGENT" | "VIEWER" | "ADMIN" | "OWNER"
}