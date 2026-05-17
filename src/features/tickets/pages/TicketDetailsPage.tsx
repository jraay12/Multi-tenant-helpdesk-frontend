import { useParams } from "react-router";
import { useGetTicketById } from "../hooks/useGetTicketsById";
import { useUpdateTicketStatus } from "../hooks/useUpdateTicketStatus";
import { useUpdateTicketPriority } from "../hooks/useUpdateTicketPriority";
import TicketNotFound from "../../../components/ui/TicketNotFound";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AssignTicketModal from "../../../components/ui/AssignTicketModal";
import {
  UserCircle,
  ChevronDown,
  Save,
  ArrowLeft,
  PanelRightOpen,
  PanelRightClose,
  Tag,
  AlertCircle,
} from "lucide-react";

type TicketForm = {
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
};

const statusBadge = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-red-50 text-red-600 border-red-200";
    case "IN_PROGRESS":
      return "bg-amber-50 text-amber-600 border-amber-200";
    case "RESOLVED":
      return "bg-green-50 text-green-700 border-green-200";
    case "CLOSED":
      return "bg-gray-100 text-gray-500 border-gray-200";
    default:
      return "bg-gray-100 text-gray-500 border-gray-200";
  }
};

const priorityDot = (priority: string) => {
  switch (priority) {
    case "URGENT":
      return "bg-red-500";
    case "HIGH":
      return "bg-orange-400";
    case "MEDIUM":
      return "bg-indigo-400";
    case "LOW":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const TicketDetailsPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetTicketById(id!);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Controls the right panel on mobile/tablet (slide-over drawer)
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<TicketForm>();
  const currentStatus = watch("status");
  const currentPriority = watch("priority");
  const updateTicketStatusMutation = useUpdateTicketStatus();
  const updateTicketPriorityMutation = useUpdateTicketPriority();
  const isClosed = currentStatus === "CLOSED";

  useEffect(() => {
    if (data) reset({ priority: data.priority, status: data.status });
  }, [data, reset]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fafaff]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 rounded-full border-2 border-[#d9e1fc] border-t-indigo-400 animate-spin" />
          <p className="text-sm text-gray-400">Loading ticket…</p>
        </div>
      </div>
    );
  }

  if (isError || !data) return <TicketNotFound />;

  const handleUpdateStatus = (value: TicketForm["status"]) => {
    updateTicketStatusMutation.mutate({ status: value, ticketId: id! });
  };

  const handleUpdatePriority = (value: TicketForm["priority"]) => {
    updateTicketPriorityMutation.mutate({ priority: value, ticketId: id! });
  };

  const RightPanel = () => (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-5 space-y-4 flex-1">
        {/* Panel Header */}
        <div className="pb-4 border-b border-gray-100">
          <p className="text-[10px] font-semibold text-indigo-400 tracking-widest uppercase mb-1">
            Details
          </p>
          <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
            Ticket Details
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage info and assignment.
          </p>
        </div>

        {/* Ticket ID + quick status badge */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-gray-400">
            #{data.id?.slice(0, 8)}
          </span>
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusBadge(currentStatus)}`}
          >
            {currentStatus?.replace("_", " ")}
          </span>
        </div>

        {/* STATUS */}
        <div className="rounded-xl border border-gray-100 p-4 bg-[#fafaff]">
          <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-2">
            Status
          </label>
          <div className="relative">
            <select
              {...register("status", {
                onChange: (e) => handleUpdateStatus(e.target.value),
              })}
              disabled={isClosed}
              className={`w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none bg-white
    focus:border-indigo-300 focus:ring-2 focus:ring-[#d9e1fc] transition-all pr-8
    ${isClosed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* PRIORITY */}
        <div className="rounded-xl border border-gray-100 p-4 bg-[#fafaff]">
          <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-2">
            Priority
          </label>
          <div className="relative">
            <select
              {...register("priority", {
                onChange: (e) => handleUpdatePriority(e.target.value),
              })}
              disabled={isClosed}
              className={`w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none bg-white
    focus:border-indigo-300 focus:ring-2 focus:ring-[#d9e1fc] transition-all pr-8
    ${isClosed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
          <div className="flex items-center gap-2 mt-2.5">
            <span
              className={`h-2 w-2 rounded-full ${priorityDot(currentPriority)}`}
            />
            <span className="text-xs text-gray-400">
              {currentPriority} priority selected
            </span>
          </div>
        </div>

        {/* ASSIGNEE */}
        <div className="rounded-xl border border-gray-100 p-4 bg-[#fafaff]">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              Assigned To
            </label>
            <button
              type="button"
              disabled={isClosed}
              onClick={() => setIsModalOpen(true)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all
    ${
      isClosed
        ? "text-gray-400 bg-gray-100 cursor-not-allowed opacity-60"
        : "text-indigo-500 hover:text-indigo-700 bg-[#d9e1fc] hover:bg-indigo-200"
    }`}
            >
              {data?.assignedTo ? "Change" : "Assign"}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-700 flex-shrink-0">
              {data?.assignedTo?.name?.charAt(0) ?? (
                <UserCircle size={18} className="text-indigo-300" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 leading-none">
                {data?.assignedTo?.name ?? "Unassigned"}
              </p>
              {/* {data?.assignedTo?.email && (
                <p className="text-xs text-gray-400 mt-0.5">{data.assignedTo.email}</p>
              )} */}
            </div>
          </div>
        </div>

        {/* Ticket meta info */}
        {data.category && (
          <div className="rounded-xl border border-gray-100 p-4 bg-[#fafaff]">
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-2">
              Category
            </label>
            <div className="flex items-center gap-2">
              <Tag size={12} className="text-indigo-400" />
              <span className="text-sm text-gray-700">{data.category}</span>
            </div>
          </div>
        )}
      </div>

      {/* SAVE BUTTON */}
      <div className="sticky bottom-0 p-5 border-t border-gray-100 bg-white">
        <button
          onClick={handleSubmit((formData) => console.log(formData))}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold
            hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm shadow-indigo-200"
        >
          <Save size={14} />
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative h-screen flex flex-col bg-[#fafaff] overflow-hidden">
      {/* ── MOBILE / TABLET TOP BAR ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 md:hidden">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusBadge(currentStatus)}`}
          >
            {currentStatus?.replace("_", " ")}
          </span>
          <button
            onClick={() => setIsPanelOpen(true)}
            className="h-8 w-8 rounded-lg border border-gray-200 bg-[#fafaff] flex items-center justify-center text-gray-500 hover:bg-[#d9e1fc] hover:text-indigo-600 transition-all"
          >
            <PanelRightOpen size={15} />
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-1 min-h-0">
        {/* LEFT — Chat */}
        <div className="flex flex-col flex-1 min-w-0 min-h-0">
          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="text-sm text-gray-400">Chat / Messages</div>
          </div>

          {/* Input area */}
          <div className="h-36 md:h-40 border-t border-gray-200 p-3 bg-white shrink-0">
            <div className="text-sm text-gray-400">Input / Actions</div>
          </div>
        </div>

        {/* RIGHT PANEL — Desktop sidebar (always visible ≥ md) */}
        <div className="hidden md:flex flex-col w-72 lg:w-80 border-l border-gray-200 bg-white shrink-0">
          <RightPanel />
        </div>
      </div>

      {/* ── MOBILE / TABLET DRAWER OVERLAY ── */}
      {/* Backdrop */}
      <div
        onClick={() => setIsPanelOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300
          ${isPanelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Slide-over panel */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-white shadow-2xl md:hidden
          w-[85vw] max-w-sm flex flex-col
          transition-transform duration-300 ease-out
          ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <p className="text-sm font-semibold text-gray-900">Ticket Details</p>
          <button
            onClick={() => setIsPanelOpen(false)}
            className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition"
          >
            <PanelRightClose size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <RightPanel />
        </div>
      </div>

      {/* ASSIGN MODAL */}
      <AssignTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticketDetails={data}
      />
    </div>
  );
};

export default TicketDetailsPage;
