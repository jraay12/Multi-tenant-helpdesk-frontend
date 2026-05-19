import { ArrowRight } from "lucide-react";
import { useCreateTicketComment } from "../../features/tickets/hooks/useCreateTicketComments";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type FormValues = {
  message: string;
};

const ReplyComponent = () => {
  const createTicketMutation = useCreateTicketComment();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
     createTicketMutation.mutate({
      message: data.message,
      ticketId: id!,
    });
    setValue("message", "");
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full bg-white mb-10 rounded-2xl border border-gray-300 shadow overflow-hidden"
    >
      {/* HEADER */}
      <div className="bg-[#edeef7] px-5 h-14 flex items-center border-b border-gray-200">
        <h1 className="text-sm font-semibold text-gray-700">Reply to Ticket</h1>
      </div>

      {/* TEXTAREA */}
      <textarea
        {...register("message", {
          required: "Message is required",
          maxLength: {
            value: 1000,
            message: "Message must be at most 1000 characters",
          },
        })}
        className="w-full min-h-37.5 outline-none p-5 resize-none text-sm text-gray-700 placeholder:text-gray-400"
        placeholder="Type your response here..."
      />

      {/* ERROR */}
      {errors.message && (
        <p className="text-red-500 text-xs px-5 pb-2">
          {errors.message.message}
        </p>
      )}

      {/* FOOTER */}
      <div className="flex justify-end items-center bg-[#edeef7] px-5 h-16 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting || createTicketMutation.isPending}
          className="flex items-center gap-2 rounded-lg bg-[#0059bf] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50"
        >
          Send Reply
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
};

export default ReplyComponent;
