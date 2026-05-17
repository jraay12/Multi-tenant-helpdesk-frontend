type RecentTicketProps = {
  title: string;
  timeAgo: string;
  priority: string;
  status: string;
  customer_name: string;
  category: string;
};

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

const RecentTicketTable = (props: RecentTicketProps) => {
  const statusConfig =
    STATUS_CONFIG[props.status as keyof typeof STATUS_CONFIG];
  console.log(statusConfig);

  const priorityConfig =
    PRIORITY_CONFIG[props.priority as keyof typeof PRIORITY_CONFIG];

  return (
    <div className="border border-[#F0F0F0] min-h-14 bg-white rounded-2xl p-3">
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium">{props.title}</h1>

          <div className="flex gap-4 items-center flex-wrap">
            {/* STATUS */}
            <p
              className="ml-1 font-medium text-xs p-1 rounded-2xl px-2"
              style={{
                backgroundColor: statusConfig.bg,
                color: statusConfig.color,
              }}
            >
              {statusConfig.label}
            </p>

            {/* META */}
            <p className="text-[#BBBBBB] text-xs">
              {props.category} · {props.customer_name} · {props.timeAgo}
            </p>
          </div>
        </div>

        {/* PRIORITY */}
        <p
          className="font-medium text-xs p-1 rounded-2xl px-2 h-fit"
          style={{
            backgroundColor: priorityConfig.bg,
            color: priorityConfig.color,
          }}
        >
          {priorityConfig.label}
        </p>
      </div>
    </div>
  );
};

export default RecentTicketTable;
