import { Search, X, UserPlus, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useFetchWorkspaceMember } from "../../features/workspace/hooks/useFetchWorkspaceMembers";

type AssignTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AssignTicketModal = ({ isOpen, onClose }: AssignTicketModalProps) => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: users } = useFetchWorkspaceMember();

  // Handles mount/unmount with transition
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // delay unmount to let transition finish
      const t = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const filteredUsers = users?.filter(
    (u) =>
      u.user.name.toLowerCase().includes(search.toLowerCase()) ||
      u.user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSearch("");
      setSelectedId(null);
    }, 250);
  };

  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
      {/* BACKDROP */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-250 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* MODAL */}
      <div
        className={`relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden
          transition-all duration-250 ease-out
          ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}
        `}
      >
        {/* Top accent */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-indigo-300 to-transparent" />

        {/* HEADER */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              Assign Ticket
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Select a team member to assign this ticket.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="h-8 w-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {/* SEARCH */}
        <div className="px-4 py-3 border-b border-gray-100 bg-[#fafaff]">
          <div className="relative flex items-center">
            <Search
              size={14}
              className="absolute left-3 text-gray-400 pointer-events-none"
            />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-700 outline-none placeholder-gray-400
                focus:border-indigo-300 focus:ring-2 focus:ring-[#d9e1fc] transition-all"
            />
          </div>
        </div>

        {/* USERS */}
        <div className="max-h-64 overflow-y-auto p-2">
          {filteredUsers?.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              No members found.
            </p>
          ) : (
            filteredUsers?.map((user) => {
              const isSelected = selectedId === user.id;
              return (
                <button
                  key={user.id}
                  onClick={() => setSelectedId(user.id)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-150
                    ${
                      isSelected
                        ? "bg-[#d9e1fc] border border-indigo-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors
                      ${isSelected ? "bg-indigo-500 text-white" : "bg-indigo-100 text-indigo-700"}`}
                    >
                      {user.user.name.charAt(0)}
                    </div>

                    {/* Info */}
                    <div className="text-left">
                      <p
                        className={`text-sm font-medium leading-none ${isSelected ? "text-indigo-800" : "text-gray-800"}`}
                      >
                        {user.user.name}
                      </p>
                      <p
                        className={`text-xs mt-1 ${isSelected ? "text-indigo-500" : "text-gray-400"}`}
                      >
                        {user.user.email}
                      </p>
                    </div>
                  </div>

                  {/* Action icon */}
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all
                    ${isSelected ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-400"}`}
                  >
                    {isSelected ? (
                      <Check size={13} strokeWidth={2.5} />
                    ) : (
                      <UserPlus size={13} />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="px-4 py-3 border-t border-gray-100 bg-[#fafaff] flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>

          <button
            disabled={!selectedId}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all
              ${
                selectedId
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200"
                  : "bg-indigo-100 text-indigo-300 cursor-not-allowed"
              }`}
          >
            Save Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTicketModal;
