import { useState } from "react";
import { useFetchWorkspaceMember } from "../../features/workspace/hooks/useFetchWorkspaceMemberPaginated";
// ── types ─────────────────────────────────────────────────────────────────────
type Role = "OWNER" | "ADMIN" | "AGENT" | "VIEWER";
type Status = "Active" | "Offline" | "Away";

type Props = {
  onInvite: () => void;
};

// ── config maps ───────────────────────────────────────────────────────────────
const ROLE_STYLES: Record<Role, string> = {
  OWNER: "bg-violet-100 text-violet-700",
  ADMIN: "bg-blue-100 text-blue-700",
  AGENT: "bg-indigo-100 text-indigo-700",
  VIEWER: "bg-gray-100 text-gray-500",
};

const STATUS_DOT: Record<Status, string> = {
  Active: "bg-blue-500",
  Offline: "bg-gray-400",
  Away: "bg-gray-500",
};

const STATUS_TEXT: Record<Status, string> = {
  Active: "text-gray-800",
  Offline: "text-gray-400",
  Away: "text-gray-600",
};

// ── sub-components ────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${ROLE_STYLES[role]}`}
    >
      {role}
    </span>
  );
}

function StatusCell({ status }: { status: Status }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[status]}`} />
      <span className={`text-sm ${STATUS_TEXT[status]}`}>{status}</span>
    </div>
  );
}

function TicketBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="w-28 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 w-6 text-right">
        {value}
      </span>
    </div>
  );
}

function ThreeDotsMenu({ memberId }: { memberId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {[
              "View profile",
              "Change role",
              "Reassign tickets",
              "Remove member",
            ].map((label) => (
              <button
                key={label}
                onClick={() => setOpen(false)}
                className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50"
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── pagination ────────────────────────────────────────────────────────────────
function Pagination({
  page,
  total,
  onChange,
}: {
  page: number;
  total: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm text-gray-600">
        Page {page} of {total}
      </span>

      <button
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
const TeamTable = ({ onInvite }: Props) => {
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const { data } = useFetchWorkspaceMember({
    page,
    limit: LIMIT,
  });

  const members = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalMembers = data?.total ?? 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* ── toolbar ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button
          onClick={onInvite}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Invite Team
        </button>

        <span className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {members.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-700">
            {totalMembers}
          </span>{" "}
          members
        </span>
      </div>

      {/* ── table ── */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-170">
          <thead>
            <tr className="border-b border-gray-100 bg-white">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                Member name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                Assigned tickets
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/40?img=47"
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {member.user.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {member.user.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <RoleBadge role={member.role as Role} />
                </td>

                <td className="px-4 py-4">
                  <StatusCell status="Active" />
                </td>

                <td className="px-4 py-4">
                  <TicketBar
                    value={member.user._count.ticketsAssigned}
                    max={100}
                  />
                </td>

                <td className="px-4 py-4">
                  <ThreeDotsMenu memberId={member.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── pagination ── */}
      <Pagination
        page={page}
        total={totalPages}
        onChange={setPage}
      />
    </div>
  );
};

export default TeamTable;