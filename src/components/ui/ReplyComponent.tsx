import { ArrowRight } from "lucide-react";

const ReplyComponent = () => {
  return (
    <div className="flex flex-col w-full bg-white mb-10 rounded-2xl border border-gray-300 shadow overflow-hidden">
      {/* HEADER */}
      <div className="bg-[#edeef7] px-5 h-14 flex items-center border-b border-gray-200">
        <h1 className="text-sm font-semibold text-gray-700">
          Reply to Ticket
        </h1>
      </div>

      {/* TEXTAREA */}
      <textarea
        className="w-full min-h-[150px] outline-none p-5 resize-none text-sm text-gray-700 placeholder:text-gray-400"
        placeholder="Type your response here..."
      />

      {/* FOOTER */}
      <div className="flex justify-end items-center bg-[#edeef7] px-5 h-16 border-t border-gray-200">
        <button
          className="flex items-center gap-2 rounded-lg bg-[#0059bf] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 active:scale-[0.98]"
        >
          Send Reply
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ReplyComponent;