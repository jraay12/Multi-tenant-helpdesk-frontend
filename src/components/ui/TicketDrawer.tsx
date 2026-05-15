import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateTicket } from "../../features/tickets/hooks/useCreateTicket";
type TicketDrawerProps = {
  onClose: () => void;
  open: boolean;
};

type TicketForm = {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT" ;
  category: string;
  customer_name: string
};

const TicketDrawer = ({ open, onClose }: TicketDrawerProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketForm>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      priority: "LOW",
      customer_name: ""
    },
  });

  const createTicketMutation = useCreateTicket();

  const onSubmit = (data: TicketForm) => {
    createTicketMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
    reset();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-20 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`flex flex-col absolute right-0 top-0 h-full w-96 bg-[#fafaff] shadow-xl transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h1>Create New Ticket</h1>
          <button
            onClick={onClose}
            className=" rounded hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col p-5 flex-1">
          {/* FORM (ONLY ADDED INSIDE YOUR DESIGN) */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col h-full"
          >
            {/* Title */}
            <div>
              <label className="text-sm ">TICKET SUBJECT</label>
              <input
                {...register("title", {
                  required: "Ticket Subject is required",
                })}
                className="w-full mt-1 border outline-none border-gray-300 rounded-md px-3 py-2 text-sm bg-[#f2f3fc]"
                placeholder="Brief summary of the issue"
              />
              {errors.title && (
                <span className="text-red-500 text-xs ">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Customer Name */}
            <div>
              <label className="text-sm ">CUSTOMER NAME</label>
              <input
                {...register("customer_name", {
                  required: "Customer Name is required",
                })}
                className="w-full mt-1 border outline-none border-gray-300 rounded-md px-3 py-2 text-sm bg-[#f2f3fc]"
                placeholder="John Doe"
              />
              {errors.customer_name && (
                <span className="text-red-500 text-xs ">
                  {errors.customer_name.message}
                </span>
              )}
            </div>

            <div className="flex justify-evenly gap-4">
              <div>
                <label className="text-sm">PRIORITY</label>
                <select
                  {...register("priority", {
                    required: "Priority is required",
                  })}
                  className="w-full mt-1 border rounded-md px-3 outline-none border-gray-300 py-2 text-sm bg-[#f2f3fc]"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </select>
                {errors.priority && (
                  <span className="text-red-500 text-xs ">
                    {errors.priority.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-sm ">CATEGORY</label>
                <input
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full mt-1 border border-gray-300 outline-none rounded-md px-3 py-2 text-sm bg-[#f2f3fc]"
                  placeholder="e.g. Authentication"
                />
                {errors.category && (
                  <span className="text-red-500 text-xs ">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm ">DESCRIPTION</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full mt-1 border rounded-md outline-none border-gray-300 px-3 py-2 text-sm min-h-25 bg-[#f2f3fc]"
                placeholder="Detailed explaination of the request..."
              />
              {errors.description && (
                <span className="text-red-500 text-xs ">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex-1"></div>
            {/* cancel */}
            <div className="flex gap-5">
              <button
                type="button"
                onClick={onClose}
                className="w-full border mt-4 border-gray-300 py-2 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-4 bg-blue-900 text-white py-2 rounded-md text-sm cursor-pointer"
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketDrawer;
