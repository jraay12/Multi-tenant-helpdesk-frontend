import { useEffect, useState } from "react";
import { useGetTickets } from "../hooks/useGetTickets";
import { useNavigate, useOutletContext } from "react-router";

type OutletContextType = {
  ticketCount: number;
  setTicketCount: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const TICKET_FILTER = [
  {
    label: "All Tickets",
    value: "all",
  },
  {
    label: "Assigned to Me",
    value: "me",
  },
  {
    label: "Unassigned",
    value: "unassigned",
  },
];

type TicketFilterType = "all" | "me" | "unassigned";

function ViewFilters({
  onChange,
  value,
}: {
  onChange: (value: TicketFilterType) => void;
  value: TicketFilterType;
}) {
  return (
    <div className="flex gap-4 py-3 px-5 bg-[#e6e8eb] mx-4 lg:ml-4 rounded-2xl ">
      {TICKET_FILTER.map((item) => {
        const isActive = value === item.value;

        return (
          <div
            key={item.value}
            onClick={() => onChange(item.value as TicketFilterType)}
            className={`text-sm font-medium cursor-pointer px-3 py-2 rounded-lg transition-all duration-400 ease-in-out ${
              isActive
                ? "bg-white text-[#1d3785] shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

function FilterComponent({
  onChange,
  value,
}: {
  onChange: (value: TicketFilterType) => void;
  value: TicketFilterType;
}) {
  return (
    <div className="flex items-center w-full bg-white py-4 mb-4 border border-gray-300 rounded-xl gap-4">
      <ViewFilters onChange={onChange} value={value} />
      <div className="hidden lg:block border-r w-2 h-10 border-[#e6e8eb]" />
    </div>
  );
}

const TicketPage = () => {
  const [ticketFilter, setTicketFilter] =
    useState<TicketFilterType>("all");

  /* PAGINATION */
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const { data: ticketResponse } = useGetTickets({
    scope: ticketFilter,
    page,
    limit: LIMIT,
  });

  const tickets = ticketResponse?.data ?? [];
  const totalPages = ticketResponse?.totalPages ?? 1;

  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] =
    useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("");

  const [assigneeFilter, setAssigneeFilter] =
    useState("");

  const { setTicketCount } =
    useOutletContext<OutletContextType>();

  const filteredTickets = tickets?.filter((ticket) => {
    const matchesStatus =
      !statusFilter ||
      ticket.status === statusFilter;

    const matchesPriority =
      !priorityFilter ||
      ticket.priority === priorityFilter;

    const matchesAssignee =
      !assigneeFilter ||
      ticket.assignedToId === assigneeFilter;

    return (
      matchesStatus &&
      matchesPriority &&
      matchesAssignee
    );
  });

  const clearFilters = () => {
    setStatusFilter("");
    setPriorityFilter("");
    setAssigneeFilter("");
  };

  useEffect(() => {
    const ticketLength =
      ticketResponse?.total ?? undefined;

    setTicketCount(ticketLength);
  }, [ticketResponse]);

  /* RESET PAGE WHEN FILTER CHANGES */
  useEffect(() => {
    setPage(1);
  }, [ticketFilter]);

  const hasActiveFilters =
    statusFilter ||
    priorityFilter ||
    assigneeFilter;

  return (
    <div className="p-6 ">
      <FilterComponent
        onChange={setTicketFilter}
        value={ticketFilter}
      />

      <div className="bg-[#f5f7fa] border border-gray-200 rounded-2xl overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafaff] border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                  Title
                </th>

                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                  Customer
                </th>

                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                  Category
                </th>

                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                  Priority
                </th>

                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                  Status
                </th>

                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                  Assignee
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets?.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() =>
                    navigate(`/tickets/${ticket.id}`)
                  }
                  className="border-t border-gray-100 hover:bg-[#fafaff] transition-colors cursor-pointer group bg-white"
                >
                  {/* Title */}
                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {ticket.title}
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {ticket.description}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 ${getAvatarColor(
                          ticket.customer_name
                        )} text-white rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0`}
                      >
                        {initialCustomerName(
                          ticket.customer_name
                        )}
                      </div>

                      <span className="text-gray-700 font-medium text-sm">
                        {ticket.customer_name}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {ticket.category}
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${priorityBadge(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge(
                        ticket.status
                      )}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusDot(
                          ticket.status
                        )}`}
                      />

                      {ticket.status.replace("_", " ")}
                    </span>
                  </td>

                  {/* Assignee */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket?.assignedTo?.name ? (
                      ticket.assignedTo.name
                    ) : (
                      <span className="italic text-gray-300">
                        Unassigned
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTickets?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-12 w-12 rounded-xl bg-[#d9e1fc] flex items-center justify-center mb-3 text-xl">
                🎫
              </div>

              <p className="text-sm font-medium text-gray-600">
                No tickets found
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {filteredTickets.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                Previous
              </button>

              <button
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketPage;

// Helpers

const statusBadge = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-red-50 text-red-600";
    case "IN_PROGRESS":
      return "bg-amber-50 text-amber-600";
    case "RESOLVED":
      return "bg-green-50 text-green-700";
    case "CLOSED":
      return "bg-gray-100 text-gray-500";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const statusDot = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-red-400";
    case "IN_PROGRESS":
      return "bg-amber-400";
    case "RESOLVED":
      return "bg-green-400";
    case "CLOSED":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const priorityBadge = (priority: string) => {
  switch (priority) {
    case "URGENT":
      return "bg-red-50 text-red-500";
    case "HIGH":
      return "bg-orange-50 text-orange-500";
    case "MEDIUM":
      return "bg-[#d9e1fc] text-indigo-600";
    case "LOW":
      return "bg-gray-100 text-gray-500";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const initialCustomerName = (customer_name: string) => {
  return customer_name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};
