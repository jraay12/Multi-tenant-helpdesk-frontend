import { useState } from "react";
import SearchComponent from "../../../components/ui/Search";
import SelectDropdown from "../../../components/ui/DropdownComponent";
import TableComponents from "../../../components/ui/TableComponents";
import { useFetchWorkspaceMemberNotPaginated } from "../../workspace/hooks/useFetchWorkspaceMembers";
import { useGetActivityLogs } from "../hooks/useGetActivityLogs";

/* ---------------- TYPES ---------------- */

type FilterComponentProps = {
  value: string;
  onChange: (value: string) => void;

  userOptions?: { label: string; value: string }[];
  userValue?: string;
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
          value={userValue!}
          onChange={userDropdown}
          data={userOptions!}
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
      <div className="hidden  flex-col gap-1 flex-1 w-full">
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

const ActivityLogsPage = () => {
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: members } = useFetchWorkspaceMemberNotPaginated();

  const {
    data: activityLogs,
    isLoading,
  } = useGetActivityLogs({
    search,
    userId: userFilter || undefined,
    action: eventFilter || undefined,
    page,
    limit,
  });

  const userOptions =
    members?.map((item) => ({
      value: item.userId,
      label: item.user.name,
    })) ?? [];

  const handleClearFilter = () => {
    setSearch("");
    setUserFilter("");
    setEventFilter("");
    setDateFilter("all");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-7 bg-[#F6F7F9] min-h-screen max-h-screen overflow-y-auto ">
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

      <div className="mt-10" />

      <TableComponents
        loading={isLoading}
        data={activityLogs?.data ?? []}
        columns={[
          {
            key: "user",
            header: "USER",
            render: (row) => (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                  {row.user?.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-medium">
                    {row.user?.name ?? "Unknown User"}
                  </p>
                  <p className="text-sm text-black/50">
                    {row.user?.email}
                  </p>
                </div>
              </div>
            ),
          },

          {
            key: "description",
            header: "ACTION DESCRIPTION",
            render: (row) => (
              <div>
                <p className="font-medium">
                  {row.description}
                </p>

                {row.ticket && (
                  <p className="text-sm text-black/50">
                    Ticket: {row.ticket.title}
                  </p>
                )}
              </div>
            ),
          },

          {
            key: "createdAt",
            header: "TIMESTAMP",
            render: (row) => (
              <div className="text-sm text-black/60">
                {row.createdAt}
              </div>
            ),
          },
        ]}

        pagination={{
          page: activityLogs?.meta.page ?? 1,
          totalPages: activityLogs?.meta.totalPages ?? 1,
          total: activityLogs?.meta.total ?? 0,
          limit,

          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default ActivityLogsPage;
