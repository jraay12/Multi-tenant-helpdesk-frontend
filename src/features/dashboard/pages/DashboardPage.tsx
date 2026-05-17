// DashboardPage.tsx
import StatsCard from "../../../components/ui/StatsCard";
import { useDashboardStatistics } from "../hooks/useDashboardStatistics";
const statsData = [
  {
    title: "OPEN",
    total: 12,
    today: 3,
  },
  {
    title: "IN PROGRESS",
    total: 7,
    today: 1,
  },
  {
    title: "RESOLVED",
    total: 20,
    percent: 85,
  },
  {
    title: "CLOSED",
    total: 30,
  },
];

const DashboardPage = () => {
  const { data: stats } = useDashboardStatistics();
  console.log(stats);
  return (
    <div className="p-7 bg-[#F6F7F9] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats &&
          Object.entries(stats).map(([key, value]) => (
            <StatsCard
              total={value.total}
              title={key}
              today={value.today}
              percent={value.thisWeek}
            />
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;
