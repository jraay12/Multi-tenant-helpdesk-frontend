// DashboardPage.tsx
import RecentTicketTable from "../../../components/ui/RecentTicketTable";
import StatsCard from "../../../components/ui/StatsCard";
import { useRecentTickets } from "../hooks/useGetRecentTIcket";
import { useDashboardStatistics } from "../hooks/useDashboardStatistics";

const DashboardPage = () => {
  const { data: stats } = useDashboardStatistics();
  const { data: recentTickets } = useRecentTickets();

  return (
    <div className="p-7 bg-[#F6F7F9] min-h-screen overflow-scroll max-h-screen">
      {/* Overview */}
      <h1 className="mb-4 font-medium text-xl">Dashboard Overview</h1>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats &&
          Object.entries(stats).map(([key, value]) => (
            <StatsCard
              key={key}
              total={value.total}
              title={key}
              today={value.today}
              percent={value.thisWeek}
            />
          ))}
      </div>

      {/* Dashboard Grid */}
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-12 gap-5 mb-10">
        {/* Tickets This Week */}
        <div className="xl:col-span-8 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm min-h-[320px]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Tickets This Week</h2>

            <button className="text-sm text-blue-600 hover:underline">
              View Report
            </button>
          </div>

          <div className="mt-5 h-[240px] rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>

        {/* Agent Performance */}
        <div className="xl:col-span-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm min-h-[320px]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Agent Performance</h2>

            <button className="text-sm text-blue-600 hover:underline">
              See All
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200"
              >
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-gray-500">24 Tickets Resolved</p>
                </div>

                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="xl:col-span-12 min-h-[350px]">
          <h1 className="font-medium mb-2 text-[18px]">Recent Tickets</h1>

          <div className="space-y-3">
            {recentTickets?.length ? (
              recentTickets.map((ticket) => (
                <RecentTicketTable
                  key={ticket.id}
                  category={ticket.category}
                  customer_name={ticket.customer_name}
                  priority={ticket.priority}
                  status={ticket.status}
                  timeAgo={ticket.timeAgo}
                  title={ticket.title}
                />
              ))
            ) : (
              <div className="text-gray-500 text-sm">
                No Recent Tickets Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
