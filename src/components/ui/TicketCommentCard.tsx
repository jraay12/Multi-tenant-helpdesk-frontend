import { File } from "lucide-react";

type TicketCommentCardProps = {
  description?: string;
  customer_name?: string;
  agent_name?: string | null;
  isOriginal?: boolean;
  prefix?: string;
  isMe?: boolean;
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
    <div className={`w-full flex ${props.isMe ? "justify-end" : "justify-start"} mb-4`}>
      
      {/* ROW container */}
      <div className={`flex items-start max-w-[70%] ${props.isMe ? "flex-row-reverse" : ""}`}>

        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${avatarColor}
          ${props.isMe ? "ml-3" : "mr-3"}`}
        >
          <h1 className="font-medium">{props.prefix ?? ""}</h1>
        </div>

        {/* Message */}
        <div
          className={`
            border border-gray-200 p-4 rounded-lg space-y-2
            ${props.isMe ? "bg-indigo-100" : "bg-gray-50"}
          `}
        >

          {/* Header text */}
          <div className="text-sm font-bold text-gray-800">
            {props.agent_name ?? "Ticket Request — "}
            {props.customer_name && (
              <span className="font-medium text-xs text-gray-500 ml-2">
                ({props.customer_name})
              </span>
            )}
          </div>

          {/* Original label */}
          {props.isOriginal && (
            <div className="flex items-center gap-2">
              <File className="text-indigo-600 w-4 h-4" />
              <h1 className="text-xs text-indigo-600 font-medium">
                Original Description
              </h1>
            </div>
          )}

          {/* Content */}
          <p className="text-sm text-gray-700">
            {props.description}
          </p>

        </div>
      </div>
    </div>
  );
};

export default TicketCommentCard;