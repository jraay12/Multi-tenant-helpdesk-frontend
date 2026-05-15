import { useState } from "react";
import { useGetTickets } from "../hooks/useGetTickets";
import { useNavigate } from "react-router";
const TicketPage = () => {
  const {data: tickets} = useGetTickets()
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");

  const filteredTickets = tickets?.filter((ticket) => {
    const matchesStatus = !statusFilter || ticket.status === statusFilter;

    const matchesPriority =
      !priorityFilter || ticket.priority === priorityFilter;

    const matchesAssignee =
      !assigneeFilter || ticket.assignedToId === assigneeFilter;

    return matchesStatus && matchesPriority  && matchesAssignee;
  });

  const clearFilters = () => {
    setStatusFilter("");
    setPriorityFilter("");
    setAssigneeFilter("");
  };

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Tickets</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-4 p-6 border-b border-gray-200 bg-gray-50">
          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Status</label>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="">All</option>
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Priority</label>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="">All</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="URGENT">URGENT</option>
            </select>
          </div>

          {/* Assignee */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Assignee</label>

            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="">All</option>
              <option value="John">John</option>
              <option value="Mark">Mark</option>
            </select>
          </div>

          {/* Clear Filter */}
          <button
            onClick={clearFilters}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
          >
            Clear Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-600">Title</th>
                <th className="px-6 py-3 font-medium text-gray-600">
                  Customer
                </th>
                <th className="px-6 py-3 font-medium text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 font-medium text-gray-600">
                  Priority
                </th>
                <th className="px-6 py-3 font-medium text-gray-600">Status</th>
                <th className="px-6 py-3 font-medium text-gray-600">
                  Assignee
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets?.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition cursor-pointer" onClick={() => navigate(`/tickets/${ticket.id}`)}
                >

                  <td className="flex flex-col px-6 py-4  max-w-96">
                    <h1 className="font-medium">{ticket.title}</h1>
                    <p className="truncate">{ticket.description}</p>
                  </td>

                  <td className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${getAvatarColor(ticket.customer_name)} text-white rounded-full flex items-center justify-center text-xs font-semibold`}>
                        {initialCustomerName(ticket.customer_name)}
                      </div>

                      <p>{ticket.customer_name}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">{ticket.category}</td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md text-xs bg-gray-100">
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold bg-gray-100 ${statusBadge(ticket.status)}`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">{ticket?.assignedTo?.name ? ticket.assignedTo.name : <span className=" italic text-gray-400">Unassigned</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTickets?.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No tickets found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketPage;

const statusBadge = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-red-100 text-red-800";

    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-700";

    case "RESOLVED":
      return "bg-green-100 text-green-700";

    case "CLOSED":
      return "bg-gray-200 text-gray-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
};

const initialCustomerName = (customer_name: string) => {
  return customer_name
    .split(" ")
    .slice(0, 2)
    .map((name) => name[0])
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

  const index = Math.abs(hash) % colors.length;

  return colors[index];
};