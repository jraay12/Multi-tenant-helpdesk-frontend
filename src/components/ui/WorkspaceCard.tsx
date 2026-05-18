import { Users, FolderOpen } from "lucide-react";

type WorkspaceCardProps = {
  name: string;
  slug: string;
  description?: string | null;
  members: string;
  onClick: () => void;
  isActive: boolean;
};

const WorkspaceCard = (props: WorkspaceCardProps) => {
  return (
    <div
      onClick={props.onClick}
      className={`
        group relative flex flex-col w-full md:max-w-xs min-h-max cursor-pointer
        rounded-2xl border bg-white p-5 transition-all duration-200
        hover:shadow-md hover:-translate-y-0.5
        ${props.isActive
          ? "border-[#a5b4fc] shadow-sm shadow-[#d9e1fc]"
          : "border-gray-200 hover:border-[#c7d2fe]"
        }
      `}
    >
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between">
        <div className={`
          flex h-11 w-11 items-center justify-center rounded-xl
          ${props.isActive ? "bg-[#d9e1fc]" : "bg-gray-100 group-hover:bg-[#eef0fd]"}
          transition-colors duration-200
        `}>
          <FolderOpen
            className={`h-5 w-5 ${props.isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-indigo-400"} transition-colors`}
          />
        </div>

        {props.isActive && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#d9e1fc] px-2.5 py-1 text-[11px] font-semibold text-indigo-600 tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 inline-block" />
            Active
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-4 flex-1">
        <h2 className="text-base font-semibold text-gray-900 leading-snug truncate">
          {props.name}
        </h2>
        <p className="mt-0.5 text-xs text-gray-400 font-mono">@{props.slug}</p>
        <p className="mt-2.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
          {props.description ?? "No description provided."}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Users className="h-3.5 w-3.5" />
          <span className="text-xs">{props.members} members</span>
        </div>

        <span className={`
          text-xs font-medium transition-colors
          ${props.isActive ? "text-indigo-400" : "text-gray-300 group-hover:text-indigo-300"}
        `}>
          Open →
        </span>
      </div>
    </div>
  );
};

export default WorkspaceCard;