import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";

const TicketNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[80vh] w-full">
      <div className="text-center max-w-md space-y-4 p-6">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Ticket Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed">
          The ticket you’re trying to access doesn’t exist, has been deleted,
          or you may not have permission to view it.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate("/tickets")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm cursor-pointer"
          >
            Back to Tickets
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition cursor-pointer"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default TicketNotFound;