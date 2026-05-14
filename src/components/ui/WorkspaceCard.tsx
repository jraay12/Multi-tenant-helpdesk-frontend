import { File, User } from "lucide-react";

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
      className="flex grow min-h-max max-w-100 border rounded-xl border-gray-300 bg-white p-4 cursor-pointer"
      onClick={props.onClick}
    >
      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <File className="w-12 h-12" />
          {props.isActive && (
            <p className="text-xs bg-[#d9e1fc] px-3 max-h-max py-1 rounded-full font-bold">
              Active
            </p>
          )}
        </div>

        <div className="mt-4">
          <h1 className="font-medium text-2xl">{props.name}</h1>

          {/* added slug */}
          <p className="text-xs text-black/50 mt-1">@{props.slug}</p>

          {/* only fallback added */}
          <p className="text-sm mt-2 text-black/60 ">
            {props.description ?? "---"}
          </p>
        </div>

        <div className="w-full border-b border-gray-200 mt-4"></div>

        <div className="flex mt-4 justify-end items-center gap-2">
          <User className="h-4 w-4" />
          <p className="text-xs text-black/70">{props.members}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
