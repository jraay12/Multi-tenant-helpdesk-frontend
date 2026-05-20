import { File } from "lucide-react";

type TicketCommentCardProps = {
  description?: string;
  customer_name?: string;
  agent_name?: string | null;
  isOriginal?: boolean;
  prefix?: string;
  isMe?: boolean;
  createdAt?: Date | undefined;
  commentsCreatedAt?: Date | undefined;
};

const getAvatarColor = (name?: string) => {
  if (!name) return "bg-gray-200 text-gray-700";

  const colors = [
    "bg-red-100 text-red-700",
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-indigo-100 text-indigo-700",
  ];

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

const TicketCommentCard = (props: TicketCommentCardProps) => {
  const displayName = props.customer_name || props.agent_name || "";

  const avatarColor = getAvatarColor(displayName);

  return (
    <div
      className={`w-full flex ${
        props.isMe ? "justify-end" : "justify-start"
      } mb-6`}
    >
      {/* ORIGINAL COMMENT */}
      {props.isOriginal ? (
        <div className="w-full h-max border-2 border-gray-300 p-4 rounded-2xl bg-white">
          <div className="flex">
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-6 shrink-0 ${avatarColor}`}
            >
              <h1 className="font-medium">{props.prefix ?? ""}</h1>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-medium text-sm">{displayName}</h1>

                <p className="text-xs text-black/50">
                  Opened this ticket •{" "}
                  {new Date(props.createdAt!).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <p className="mt-6 text-sm text-gray-700 leading-7">
                {props.description}
              </p>
            </div>

            {/* Badge */}
            <div className="ml-4">
              <p className="text-xs bg-[#e6e9f2] rounded-full px-3 py-1 font-medium text-[#002470] whitespace-nowrap">
                Original Description
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* REPLY COMMENT */
        <div className="w-full flex gap-4">
          {/* PREFIX OUTSIDE */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 ${avatarColor}`}
          >
            <h1 className="font-medium">{props.prefix ?? ""}</h1>
          </div>

          {/* MESSAGE CARD */}
          <div className="flex-1 border border-gray-200 bg-white rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex">
                <h1 className="font-medium text-sm">{displayName}</h1>
                <div className="text-xs ml-4 rounded-md bg-[#002470] text-white font-bold px-2 py-1">Support Agent</div>
              </div>
              <div className="grow" />
              <p className="text-xs text-black/50">
                {new Date(props.commentsCreatedAt!).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            <p className="mt-5 text-sm text-gray-700 leading-7">
              {props.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketCommentCard;
