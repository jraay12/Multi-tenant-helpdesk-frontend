import { X } from "lucide-react";
import SearchComponent from "./Search";
import { useState, useEffect } from "react";
import { useFetchUserForInvites } from "../../features/team/hooks/userFetchUserForInvite";
import { useDirectInviteMembers } from "../../features/team/hooks/useDirectInviteMembers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Role = "ADMIN" | "OWNER" | "AGENT" | "VIEWER";

const roles: {
  value: Role;
  label: string;
  description: string;
}[] = [
  {
    value: "ADMIN",
    label: "Admin",
    description: "Full control over settings & users",
  },
  {
    value: "AGENT",
    label: "Agent",
    description: "Can handle and resolve tickets",
  },
  {
    value: "VIEWER",
    label: "Viewer",
    description: "Readonly access to activity logs",
  },
  {
    value: "OWNER",
    label: "Owner",
    description: "Readonly access to activity logs",
  },
];

const FoundUsers = ({
  users,
  onInvite,
  selectedUser,
}: {
  users: any[];
  onInvite: (user: any) => void;
  selectedUser: any[];
}) => {
  return (
    <div className="mt-4">
      <h1 className="text-black/50 font-bold text-sm">FOUND USERS</h1>

      <div className="w-full rounded-md mt-4 flex flex-col gap-3">
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onInvite={onInvite}
            selectedUser={selectedUser}
          />
        ))}
      </div>
    </div>
  );
};

const UserItem = ({
  user,
  onInvite,
  selectedUser,
}: {
  user: any;
  onInvite: (user: any) => void;
  selectedUser: any;
}) => {
  const userAlreadySelected = selectedUser.some((u: any) => u.id === user.id);
  return (
    <div className="flex items-center justify-between bg-[#f2f3fc] p-2 rounded-md">
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/150?img=45"
          alt=""
          className="rounded-full h-10 w-10"
        />

        <div className="flex flex-col">
          <h1 className="text-sm font-medium">{user.name}</h1>
          <p className="text-xs font-medium text-black/40">@{user.email}</p>
          {user.isMember && (
            <p className="absolute ml-40 mt-2 text-xs bg-[#d9e1fc] font-bold p-1 px-2 rounded-full">
              ALREADY REGISTERED
            </p>
          )}
        </div>
      </div>

      <button
        disabled={user.isMember || userAlreadySelected}
        onClick={() => onInvite(user)}
        className="text-xs px-3 py-1 rounded-md transition-all cursor-pointer
    bg-indigo-500 text-white hover:bg-indigo-600
    disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
      >
        Invite
      </button>
    </div>
  );
};

const SelectedMembers = ({
  selectedMembers,
  onRemove,
}: {
  selectedMembers: any[];
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="mt-10 bg-[#f2f3fc] p-4 border border-dashed rounded-lg">
      <h1 className="text-xs font-bold text-black/50 mb-3">
        SELECTED MEMBERS ({selectedMembers.length})
      </h1>

      <div className="flex gap-4 flex-wrap">
        {selectedMembers.map((member) => (
          <div className="flex bg-white gap-4 items-center px-4 py-1 rounded-md">
            <img
              src="https://i.pravatar.cc/150?img=45"
              alt=""
              className="h-8 w-8 rounded-full"
            />
            <p className="text-sm font-medium">{member.name}</p>
            <button
              className="cursor-pointer"
              onClick={() => onRemove(member.id)}
            >
              <X className="h-4 w-4 rounded-full border-2 rounded-b-full" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AssignRole = ({
  selectedRole,
  onChange,
}: {
  selectedRole: string;
  onChange: (role: Role) => void;
}) => {
  return (
    <div className="mt-5">
      <h1 className="text-xs font-bold text-black/50 mb-3">ASSIGN ROLE</h1>

      <div className="space-y-3">
        {roles.map((role) => (
          <label
            key={role.value}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-300 bg-[#f8f8ff] cursor-pointer"
          >
            <div>
              <p className="text-sm font-medium">{role.label}</p>
              <p className="text-black/50 text-xs">{role.description}</p>
            </div>

            <input
              type="radio"
              checked={selectedRole === role.value}
              onChange={() => onChange(role.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

// Main Component
const InviteTeamModal = ({ isOpen, onClose }: Props) => {
  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>("AGENT");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [search, setSearch] = useState("");
  const directInviteMutation = useDirectInviteMembers();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data } = useFetchUserForInvites(debouncedSearch);

  const handleInvite = (user: any) => {
    setSelectedMembers((prev) => [...prev, user]);
  };

  const handleRemove = (id: string) => {
    setSelectedMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleSubmit = () => {
    const payload = {
      userIds: selectedMembers.map((u) => u.id),
      role: selectedRole,
    };

    directInviteMutation.mutate(
      { role: payload.role, userIds: payload.userIds },
      {
        onSuccess: () => {
          onClose()
        },
      },
    );
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer duration-250 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* MODAL */}
      <div
        className={`relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-y-scroll max-h-140
          transition-all duration-250 ease-out
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-3 scale-95"
          }
        `}
      >
        {/* Top accent */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-indigo-300 to-transparent" />

        {/* HEADER */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100 bg-[#f5f5fa]">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Add Members Directly
            </h2>

            <p className="text-sm text-gray-400 mt-0.5">
              Search and add existing users to your worksapce instantly
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 cursor-pointer rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-5 pt-5 mb-10">
          <div className="bg-[#f5f5fa]">
            <SearchComponent
              placeholder="search user name"
              value={search}
              onChange={setSearch}
            />
          </div>
          <FoundUsers
            users={data ?? []}
            onInvite={handleInvite}
            selectedUser={selectedMembers}
          />
          <SelectedMembers
            selectedMembers={selectedMembers}
            onRemove={handleRemove}
          />
          <AssignRole selectedRole={selectedRole} onChange={setSelectedRole} />
        </div>

        <div className="flex justify-end px-5 pt-5 pb-4 border-b border-gray-100 bg-[#f5f5fa]">
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="rounded-lg p-2 text-white bg-[#0059bf] border border-[#0059bf] flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-[#004799] hover:border-[#004799] hover:shadow-md active:scale-[0.98]"
          >
            Add to Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteTeamModal;
