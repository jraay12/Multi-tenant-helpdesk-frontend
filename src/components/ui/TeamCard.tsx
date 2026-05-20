import { User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TeamCardProps = {
  title: string;
  count: number;
  growthText?: string;
  growthValue?: number;
  Icon?: LucideIcon;
};

const TeamCard = ({
  title,
  count,
  growthText,
  growthValue,
  Icon = User,
}: TeamCardProps) => {
  const hasBadge = !!growthText; // 👈 growthText decides visibility
  const isPositive =
    typeof growthValue === "number" ? growthValue >= 0 : true;

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-5">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-medium text-black/70">
            {title}
          </h1>

          <div className="text-gray-500">
            <Icon size={18} />
          </div>
        </div>

        {/* Body */}
        <div className="flex items-end gap-3 mt-10">
          <h2 className="text-2xl font-bold">{count}</h2>

          {/* Badge only depends on growthText */}
          {hasBadge && (
            <p
              className={`font-bold text-xs rounded-2xl px-2 py-1 ${
                typeof growthValue === "number"
                  ? isPositive
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
                  : "text-[#4F46E5] bg-[#e4e8f0]"
              }`}
            >
              {typeof growthValue === "number" &&
              growthValue > 0
                ? "+"
                : ""}
              {typeof growthValue === "number"
                ? growthValue
                : ""}
              {growthValue !== undefined && " "}
              {growthText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;