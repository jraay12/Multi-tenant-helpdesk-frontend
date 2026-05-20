import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import { useCreateWorkspace } from "../../features/workspace/hooks/useCreateWorkspace";
import { useNavigate } from "react-router";

// ── types ──────────────────────────────────────────────────────────────────
interface AvatarColor {
  bg: string;
  text: string;
  ring: string;
}

interface FormValues {
  name: string;
  description: string;
}


// ── constants ──────────────────────────────────────────────────────────────
const AVATAR_COLORS: AvatarColor[] = [
  { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-400" },
  { bg: "bg-green-50", text: "text-green-700", ring: "ring-green-400" },
  { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-400" },
  { bg: "bg-fuchsia-50", text: "text-fuchsia-700", ring: "ring-fuchsia-400" },
  { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-400" },
  { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-400" },
  { bg: "bg-gray-100", text: "text-gray-600", ring: "ring-gray-400" },
];

const DEFAULT_COLOR = AVATAR_COLORS[0];

// ── helpers ────────────────────────────────────────────────────────────────
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ── sub components (UNCHANGED) ─────────────────────────────────────────────
interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}

const FieldLabel = ({ htmlFor, required, optional, children }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className="block text-xs font-medium text-gray-700 mb-1.5"
  >
    {children}
    {required && <span className="text-red-500 ml-0.5">*</span>}
    {optional && (
      <span className="text-gray-400 font-normal ml-1">(optional)</span>
    )}
  </label>
);

interface HintProps {
  children: React.ReactNode;
  variant?: "default" | "error";
}

const FieldHint = ({ children, variant = "default" }: HintProps) => (
  <p
    className={`mt-1.5 text-xs ${variant === "error" ? "text-red-600" : "text-gray-400"}`}
  >
    {children}
  </p>
);


const WorkspaceCreation = () => {
  const createWorkspaceMutation = useCreateWorkspace();
  const navigate = useNavigate();

  const [avatarColor, setAvatarColor] = useState<AvatarColor>(DEFAULT_COLOR);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const nameValue = watch("name");
  const initials = getInitials(nameValue || "");

  const handleColorPick = useCallback((color: AvatarColor) => {
    setAvatarColor(color);
  }, []);

  const onSubmit = (data: FormValues) => {
    // console.log(data)
    createWorkspaceMutation.mutate(data, {
      onSuccess: () => {
        navigate("/workspace");
      },
    });
  };

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col">
      <Header onClick={() => null} />

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-120 bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* step indicator */}
          <div className="flex items-center px-7 pt-6 pb-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold ring-4 ring-indigo-100">
                1
              </div>
              <span className="text-xs font-medium text-indigo-600 whitespace-nowrap">
                Workspace info
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-3" />
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-7 pt-6 pb-7">
              <h1 className="text-[17px] font-semibold text-gray-900 mb-1">
                Set up your workspace
              </h1>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                This will be your team's home for managing support tickets.
              </p>

              {/* workspace name */}
              <div className="mb-4">
                <FieldLabel htmlFor="ws-name" required>
                  Workspace name
                </FieldLabel>

                <input
                  id="ws-name"
                  type="text"
                  placeholder="e.g. Acme Corp"
                  {...register("name", {
                    required: "Workspace name is required.",
                    maxLength: {
                      value: 50,
                      message: "Workspace name must not exceed 50 characters.",
                    },
                  })}
                  className={`w-full px-3 py-2.5 text-sm text-gray-900 border rounded-lg outline-none transition-all placeholder:text-gray-300 ${
                    errors.name
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
                />

                {errors.name ? (
                  <FieldHint variant="error">{errors.name.message}</FieldHint>
                ) : (
                  <FieldHint>
                    Your company or team name, visible to all members.
                  </FieldHint>
                )}
              </div>

              {/* avatar color */}
              <div className="mb-4">
                <FieldLabel>Workspace avatar</FieldLabel>

                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold tracking-tight shrink-0 transition-all ${avatarColor.bg} ${avatarColor.text}`}
                  >
                    {initials}
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-2">Pick a color</p>
                    <div className="flex gap-2 flex-wrap">
                      {AVATAR_COLORS.map((color, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleColorPick(color)}
                          className={`w-8 h-8 rounded-lg transition-transform hover:scale-110 ${color.bg} ${
                            avatarColor === color
                              ? `ring-2 ring-offset-1 ${color.ring}`
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* description */}
              <div className="mb-6">
                <FieldLabel htmlFor="ws-desc" optional>
                  Description
                </FieldLabel>

                <textarea
                  id="ws-desc"
                  rows={2}
                  placeholder="What does your team do?"
                  {...register("description", {
                    maxLength: {
                      value: 100,
                      message: "Description must not exceed 100 characters.",
                    },
                  })}
                  className="w-full px-3 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-300 leading-relaxed"
                />

                {errors.description && (
                  <FieldHint variant="error">
                    {errors.description.message}
                  </FieldHint>
                )}
              </div>

              {/* actions */}
              <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                {/* left side */}
                <button
                  type="button"
                  onClick={() => navigate("/workspace")}
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:scale-[.98]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back
                </button>

                {/* right side */}
                <div className="flex items-center gap-3">
                  {/* <span className="text-xs text-gray-400">Step 1 of 3</span> */}

                  <button
                    type="submit"
                    className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[.98] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCreation;
