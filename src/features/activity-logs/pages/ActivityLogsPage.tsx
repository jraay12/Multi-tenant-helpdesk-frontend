import { useState } from "react";
import SearchComponent from "../../../components/ui/Search";
import SelectDropdown from "../../../components/ui/DropdownComponent";
import { useFetchWorkspaceMember } from "../../workspace/hooks/useFetchWorkspaceMembers";
import TableComponents from "../../../components/ui/TableComponents";

/* ---------------- TYPES ---------------- */

type FilterComponentProps = {
  value: string;
  onChange: (value: string) => void;

  userOptions: { label: string; value: string }[];
  userValue: string;
  userDropdown: (value: string) => void;

  eventValue: string;
  eventDropdown: (value: string) => void;

  dateValue: string;
  dateDropdown: (value: string) => void;

  clearFilter: () => void;
};

/* ---------------- EVENT OPTIONS ---------------- */

export const activityActionOptions: {
  label: string;
  value: string;
}[] = [
  { label: "Ticket Created", value: "TICKET_CREATED" },
  { label: "Ticket Updated", value: "TICKET_UPDATED" },
  { label: "Status Changed", value: "STATUS_CHANGED" },
  { label: "Ticket Assigned", value: "TICKET_ASSIGNED" },
  { label: "Comment Added", value: "COMMENT_ADDED" },
  { label: "Priority Changed", value: "PRIORITY_CHANGED" },
];

/* ---------------- DATE OPTIONS ---------------- */

export const dateRangeOptions: {
  label: string;
  value: string;
}[] = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
];

/* ---------------- FILTER COMPONENT ---------------- */

function FilterComponent({
  value,
  onChange,
  userOptions,
  userValue,
  userDropdown,
  eventValue,
  eventDropdown,
  dateValue,
  dateDropdown,
  clearFilter,
}: FilterComponentProps) {
  return (
    <div className="border border-gray-300 bg-white rounded-2xl mt-10 p-4 flex gap-6 flex-wrap justify-between items-center flex-col lg:flex-row ">
      {/* SEARCH */}
      <div className=" flex flex-col gap-1 flex-1 w-full">
        <label className="font-medium">Search Event</label>

        <SearchComponent
          placeholder="Search activity..."
          value={value}
          onChange={onChange}
        />
      </div>

      {/* USER FILTER */}
      <div className="flex flex-col gap-1 flex-1 w-full">
        <label className="font-medium">User</label>

        <SelectDropdown
          value={userValue}
          onChange={userDropdown}
          data={userOptions}
          placeholder="All Users"
        />
      </div>

      {/* EVENT FILTER */}
      <div className=" flex flex-col gap-1 flex-1 w-full">
        <label className="font-medium">Event Type</label>

        <SelectDropdown
          value={eventValue}
          onChange={eventDropdown}
          data={activityActionOptions}
          placeholder="All Events"
        />
      </div>

      {/* DATE FILTER */}
      <div className="flex flex-col gap-1 flex-1 w-full">
        <label className="font-medium">Date Range</label>

        <SelectDropdown
          value={dateValue}
          onChange={dateDropdown}
          data={dateRangeOptions}
          placeholder="All Time"
        />
      </div>
      <button
        className="border border-[#6399d6] h-8 px-10 w-full lg:w-40 text-[#6399d6] cursor-pointer mt-7 transition-all duration-300 hover:bg-[#6399d6] hover:text-white hover:shadow-md"
        onClick={() => clearFilter()}
      >
        Clear Filter
      </button>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export const sampleActivityLogs = [
  {
    id: "1",
    action: "TICKET_CREATED",
    user: { name: "Jane Doe" },
    ticket: { ticket_number: "TICK-0001" },
    createdAt: new Date("2026-05-20T08:30:00Z"),
    metadata: {
      title: "Login page bug",
    },
  },
  {
    id: "2",
    action: "STATUS_CHANGED",
    user: { name: "John Smith" },
    ticket: { ticket_number: "TICK-0002" },
    createdAt: new Date("2026-05-20T09:10:00Z"),
    metadata: {
      from: "OPEN",
      to: "IN_PROGRESS",
    },
  },
  {
    id: "3",
    action: "COMMENT_ADDED",
    user: { name: "Alice Brown" },
    ticket: { ticket_number: "TICK-0003" },
    createdAt: new Date("2026-05-19T14:45:00Z"),
    metadata: {
      message: "I’m working on this issue now",
    },
  },
  {
    id: "4",
    action: "TICKET_ASSIGNED",
    user: { name: "System" },
    ticket: { ticket_number: "TICK-0004" },
    createdAt: new Date("2026-05-18T12:00:00Z"),
    metadata: {
      assignedTo: "John Smith",
    },
  },
  {
    id: "5",
    action: "PRIORITY_CHANGED",
    user: { name: "Jane Doe" },
    ticket: { ticket_number: "TICK-0005" },
    createdAt: new Date("2026-05-18T15:20:00Z"),
    metadata: {
      from: "LOW",
      to: "HIGH",
    },
  },
];

const ActivityLogsPage = () => {
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const { data: members } = useFetchWorkspaceMember();

  const userOptions =
    members?.map((item) => ({
      value: item.user.name,
      label: item.user.name,
    })) ?? [];

  const handleClearFilter = () => {
    setSearch("");
    setUserFilter("");
    setEventFilter("");
    setDateFilter("");
  };

  return (
    <div className="p-7 bg-[#F6F7F9] min-h-screen max-h-screen">
      <h1 className="text-4xl font-medium">Activity Logs</h1>

      <p className="text-black/60 mt-2">
        Track all system events and audit trail across your organization
      </p>

      <FilterComponent
        value={search}
        onChange={setSearch}
        userOptions={userOptions}
        userValue={userFilter}
        userDropdown={setUserFilter}
        eventValue={eventFilter}
        eventDropdown={setEventFilter}
        dateValue={dateFilter}
        dateDropdown={setDateFilter}
        clearFilter={handleClearFilter}
      />
      <div className="mt-10"/>
      <TableComponents
        data={sampleActivityLogs}
        columns={[
          {
            key: "action",
            header: "Action",
          },
          {
            key: "user",
            header: "User",
            render: (row) => row.user?.name,
          },
          {
            key: "ticket",
            header: "Ticket",
            render: (row) => row.ticket?.ticket_number,
          },
          {
            key: "createdAt",
            header: "Date",
            render: (row) => new Date(row.createdAt).toLocaleString(),
          },
        ]}
      />
    </div>
  );
};

export default ActivityLogsPage;
