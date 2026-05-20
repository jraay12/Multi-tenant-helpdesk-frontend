// StatsCard.tsx
import {
  CircleDashed,
  Clock3,
  CheckCircle2,
  Archive,
  TrendingUp,
  Percent,
} from "lucide-react";

type StatsCardProps = {
  title: string;
  total: number;
  today?: number;
  percent?: number;
};

const iconMap = {
  OPEN: <CircleDashed size={18} />,
  "IN PROGRESS": <Clock3 size={18} />,
  RESOLVED: <CheckCircle2 size={18} />,
  CLOSED: <Archive size={18} />,
};

const numberColorMap = {
  OPEN: "text-blue-600",
  "IN PROGRESS": "text-yellow-500",
  RESOLVED: "text-green-600",
  CLOSED: "text-gray-700",
};

const StatsCard = ({
  title,
  total,
  today,
  percent,
}: StatsCardProps) => {
  
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-5">
      <div className="flex flex-col gap-3">

        <div className="flex items-center gap-2 text-gray-600">
          {iconMap[title as keyof typeof iconMap]}

          <h2 className="text-sm font-medium">
            {title}
          </h2>
        </div>

        <p
          className={`text-3xl font-bold ${
            numberColorMap[title as keyof typeof numberColorMap]
          }`}
        >
          {total}
        </p>

        {/* OPEN / IN PROGRESS */}
        {today !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              today > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {today > 0 ? (
              <>
                <TrendingUp size={16} />
                <span>{today} today</span>
              </>
            ) : (
              <>
                <span>Steady</span>
              </>
            )}
          </div>
        )}

        {/* RESOLVED */}
        {percent !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              percent > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {percent > 0 ? (
              <>
                <Percent size={16} />
                <span>{percent}% week</span>
              </>
            ) : (
              <>
                <span>Steady</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;