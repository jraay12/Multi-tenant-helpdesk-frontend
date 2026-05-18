import { useState } from "react";

// ── types ─────────────────────────────────────────────────────────────────────
type Role = "OWNER" | "ADMIN" | "AGENT" | "VIEWER";
type Status = "Active" | "Offline" | "Away";

interface Member {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: Status;
  assignedTickets: number;
  maxTickets: number;
}

// ── mock data ─────────────────────────────────────────────────────────────────
const MOCK_MEMBERS: Member[] = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@resolvdesk.com",
    avatar: "https://i.pravatar.cc/40?img=47",
    role: "ADMIN",
    status: "Active",
    assignedTickets: 24,
    maxTickets: 40,
  },
  {
    id: 2,
    name: "Marcus Thompson",
    email: "m.thompson@resolvdesk.com",
    avatar: "https://i.pravatar.cc/40?img=12",
    role: "AGENT",
    status: "Offline",
    assignedTickets: 12,
    maxTickets: 40,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "elena.r@resolvdesk.com",
    avatar: "https://i.pravatar.cc/40?img=9",
    role: "AGENT",
    status: "Away",
    assignedTickets: 38,
    maxTickets: 40,
  },
  {
    id: 4,
    name: "David Park",
    email: "d.park@resolvdesk.com",
    avatar: "https://i.pravatar.cc/40?img=52",
    role: "VIEWER",
    status: "Active",
    assignedTickets: 0,
    maxTickets: 40,
  },
  {
    id: 5,
    name: "Priya Nair",
    email: "p.nair@resolvdesk.com",
    avatar: "https://i.pravatar.cc/40?img=45",
    role: "AGENT",
    status: "Active",
    assignedTickets: 17,
    maxTickets: 40,
  },
  {
    id: 6,
    name: "James Okafor",
    email: "j.okafor@resolvdesk.com",
    avatar: "https://i.pravatar.cc/40?img=33",
    role: "OWNER",
    status: "Active",
    assignedTickets: 5,
    maxTickets: 40,
  },
];

const TOTAL_MEMBERS = 42;
const PAGE_SIZE = 4;
const TOTAL_PAGES = 5;

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

type Props = {
  onInvite: () => void;
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
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[status]}`} />
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

function ThreeDotsMenu({ memberId }: { memberId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
        aria-label="Member actions"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
              { label: "View profile",   icon: "👤" },
              { label: "Change role",    icon: "🔑" },
              { label: "Reassign tickets", icon: "🎫" },
              { label: "Remove member",  icon: "🗑️", danger: true },
            ].map(({ label, icon, danger }) => (
              <button
                key={label}
                onClick={() => setOpen(false)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors
                  ${danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors
        ${checked
          ? "bg-blue-600 border-blue-600"
          : "border-gray-300 bg-white hover:border-blue-400"
        }`}
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
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
  const pages = [1, 2, 3, "...", 5];

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm select-none">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                ${page === p
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
const TeamTable = ({onInvite}: Props) => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);

  const pagedMembers = MOCK_MEMBERS.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const allPageSelected =
    pagedMembers.length > 0 &&
    pagedMembers.every((m) => selectedIds.has(m.id));

  const toggleAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        pagedMembers.forEach((m) => next.delete(m.id));
      } else {
        pagedMembers.forEach((m) => next.add(m.id));
      }
      return next;
    });
  };

  const toggleOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── toolbar ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {/* invite */}
          <button onClick={onInvite} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[.98] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            Invite Team
          </button>

          {/* filter */}
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filter
          </button>

          {/* sort */}
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="6" y1="12" x2="18" y2="12"/>
              <line x1="9" y1="18" x2="15" y2="18"/>
            </svg>
            Sort
          </button>
        </div>

        <span className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {Math.min(PAGE_SIZE, MOCK_MEMBERS.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-700">{TOTAL_MEMBERS}</span>{" "}
          members
        </span>
      </div>

      {/* ── table ── */}
      <div className="overflow-x-auto ">
        <table className="w-full min-w-[680px]">
          <thead>
            <tr className="border-b border-gray-100 bg-white">
              <th className="w-10 px-4 py-3 text-left">
                <Checkbox
                  checked={allPageSelected}
                  onChange={toggleAll}
                  ariaLabel="Select all on this page"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Member name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Assigned tickets
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {pagedMembers.map((member) => (
              <tr
                key={member.id}
                className={`transition-colors ${
                  selectedIds.has(member.id) ? "bg-blue-50/50" : "hover:bg-gray-50/60"
                }`}
              >
                {/* checkbox */}
                <td className="px-4 py-4">
                  <Checkbox
                    checked={selectedIds.has(member.id)}
                    onChange={() => toggleOne(member.id)}
                    ariaLabel={`Select ${member.name}`}
                  />
                </td>

                {/* member */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {member.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* role */}
                <td className="px-4 py-4">
                  <RoleBadge role={member.role} />
                </td>

                {/* status */}
                <td className="px-4 py-4">
                  <StatusCell status={member.status} />
                </td>

                {/* assigned tickets */}
                <td className="px-4 py-4">
                  <TicketBar value={member.assignedTickets} max={member.maxTickets} />
                </td>

                {/* actions */}
                <td className="px-4 py-4">
                  <ThreeDotsMenu memberId={member.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── pagination ── */}
      <Pagination page={page} total={TOTAL_PAGES} onChange={setPage} />
    </div>
  );
};

export default TeamTable;