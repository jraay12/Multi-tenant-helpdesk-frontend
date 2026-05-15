import { useState } from "react";
import { useGetTickets } from "../hooks/useGetTickets";
import { useNavigate } from "react-router";

const TicketPage = () => {
  const { data: tickets } = useGetTickets();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");

  const filteredTickets = tickets?.filter((ticket) => {
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
    const matchesAssignee = !assigneeFilter || ticket.assignedToId === assigneeFilter;
    return matchesStatus && matchesPriority && matchesAssignee;
  });

  const clearFilters = () => {
    setStatusFilter("");
    setPriorityFilter("");
    setAssigneeFilter("");
  };

  const hasActiveFilters = statusFilter || priorityFilter || assigneeFilter;

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <p className="text-[11px] font-semibold text-indigo-400 tracking-widest uppercase mb-1">
              Support
            </p>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Tickets</h1>
          </div>

          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
            {filteredTickets?.length ?? 0} results
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-3 px-6 py-4 border-b border-gray-100 bg-[#fafaff]">
          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white text-gray-700 focus:border-indigo-300 focus:ring-2 focus:ring-[#d9e1fc] transition-all"
            >
              <option value="">All</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white text-gray-700 focus:border-indigo-300 focus:ring-2 focus:ring-[#d9e1fc] transition-all"
            >
              <option value="">All</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          {/* Assignee */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Assignee</label>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white text-gray-700 focus:border-indigo-300 focus:ring-2 focus:ring-[#d9e1fc] transition-all"
            >
              <option value="">All</option>
              <option value="John">John</option>
              <option value="Mark">Mark</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg text-sm text-indigo-500 border border-[#d9e1fc] bg-white hover:bg-[#d9e1fc] transition-all font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafaff] border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Title</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Customer</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Category</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Priority</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Assignee</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets?.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                  className="border-t border-gray-100 hover:bg-[#fafaff] transition-colors cursor-pointer group"
                >
                  {/* Title */}
                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {ticket.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{ticket.description}</p>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 ${getAvatarColor(ticket.customer_name)} text-white rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0`}>
                        {initialCustomerName(ticket.customer_name)}
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{ticket.customer_name}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-gray-500 text-sm">{ticket.category}</td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${priorityBadge(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge(ticket.status)}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusDot(ticket.status)}`} />
                      {ticket.status.replace("_", " ")}
                    </span>
                  </td>

                  {/* Assignee */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket?.assignedTo?.name
                      ? ticket.assignedTo.name
                      : <span className="italic text-gray-300">Unassigned</span>
                    }
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
              <p className="text-sm font-medium text-gray-600">No tickets found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketPage;

// Helpers

const statusBadge = (status: string) => {
  switch (status) {
    case "OPEN":        return "bg-red-50 text-red-600";
    case "IN_PROGRESS": return "bg-amber-50 text-amber-600";
    case "RESOLVED":    return "bg-green-50 text-green-700";
    case "CLOSED":      return "bg-gray-100 text-gray-500";
    default:            return "bg-gray-100 text-gray-500";
  }
};

const statusDot = (status: string) => {
  switch (status) {
    case "OPEN":        return "bg-red-400";
    case "IN_PROGRESS": return "bg-amber-400";
    case "RESOLVED":    return "bg-green-400";
    case "CLOSED":      return "bg-gray-400";
    default:            return "bg-gray-400";
  }
};

const priorityBadge = (priority: string) => {
  switch (priority) {
    case "URGENT": return "bg-red-50 text-red-500";
    case "HIGH":   return "bg-orange-50 text-orange-500";
    case "MEDIUM": return "bg-[#d9e1fc] text-indigo-600";
    case "LOW":    return "bg-gray-100 text-gray-500";
    default:       return "bg-gray-100 text-gray-500";
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
  "bg-red-500", "bg-blue-500", "bg-green-500",
  "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500",
];

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};