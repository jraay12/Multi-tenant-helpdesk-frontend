import type { RecentTicketResponse } from "../../features/dashboard/types";

const STATUS_CONFIG = {
  OPEN: {
    label: "Open",
    bg: "#EFF6FF",
    color: "#2563EB",
  },

  IN_PROGRESS: {
    label: "In Progress",
    bg: "#FEF3C7",
    color: "#D97706",
  },

  RESOLVED: {
    label: "Resolved",
    bg: "#DCFCE7",
    color: "#16A34A",
  },

  CLOSED: {
    label: "Closed",
    bg: "#F3F4F6",
    color: "#4B5563",
  },
};

const PRIORITY_CONFIG = {
  URGENT: {
    label: "URGENT",
    bg: "#FEF2F2",
    color: "#B91C1C",
  },

  HIGH: {
    label: "HIGH",
    bg: "#FFF1F2",
    color: "#E11D48",
  },

  MEDIUM: {
    label: "MEDIUM",
    bg: "#EFF6FF",
    color: "#2563EB",
  },

  LOW: {
    label: "LOW",
    bg: "#F0FDF4",
    color: "#16A34A",
  },
};



const RecentTicketTable = ({data}: {data: RecentTicketResponse[]}) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">
              ID
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-gray-600">
              SUBJECT
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-gray-600">
              STATUS
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-gray-600">
              PRIORITY
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-gray-600">
              TIMESTAMP
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((ticket) => {
            const statusConfig = STATUS_CONFIG[ticket.status];
            const priorityConfig = PRIORITY_CONFIG[ticket.priority];

            return (
              <tr
                key={ticket.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                  #TK-{ticket.ticket_number}
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">
                      {ticket.title}
                    </span>

                    <span className="text-xs text-gray-500">
                      {ticket.customer_name} • {ticket.category}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: statusConfig.bg,
                      color: statusConfig.color,
                    }}
                  >
                    {statusConfig.label}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: priorityConfig.bg,
                      color: priorityConfig.color,
                    }}
                  >
                    {priorityConfig.label}
                  </span>
                </td>

                <td className="px-4 py-4 text-sm text-gray-500">
                  {ticket.timeAgo}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTicketTable;