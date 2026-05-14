import { useState } from "react";
import Button from "./Button";
import {
  LayoutDashboard,
  Ticket,
  Users,
  UserRound,
  Settings,
  LifeBuoy,
  Moon,
  WorkflowIcon,
} from "lucide-react";
import { useFetchMyWorkspaceById } from "../../features/workspace/hooks/useFetchMyWorkspaceById";
import { useNavigate } from "react-router";

const SideBar = () => {
  const [active, setActive] = useState("dashboard");
  const activeWorkspaceId = localStorage.getItem("workspace")
  const {data} = useFetchMyWorkspaceById(activeWorkspaceId!) 
  const navigate = useNavigate();
  const menus = [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    { label: "Ticket Queue", value: "tickets", icon: Ticket, path: "/tickets" },
    { label: "Customers", value: "customers", icon: Users },
    { label: "Members", value: "members", icon: UserRound },
    { label: "Settings", value: "settings", icon: Settings },
    { label: "Workspace", value: "workspace", icon: WorkflowIcon },
  ];

  return (
    <div className="w-full h-screen bg-[#213145] py-6 flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="font-bold text-2xl text-center text-white tracking-wide">
          {data?.workspace.name}
        </h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 px-4">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              onClick={() => {
                setActive(item.value);
                navigate(`${item.path}`);
              }}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                active === item.value
                  ? "bg-[#206ee3] text-white shadow-md"
                  : "text-white/80 hover:bg-[#2b3f5a] hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="grow"></div>

      {/* Bottom actions */}
      <div className="px-4 flex flex-col gap-2">
        <div className="text-center">
          <Button button_name="Invite Team" />
        </div>

        <div className="border-t border-white/10 mt-2 pt-2 flex flex-col gap-1">
          <button className="flex items-center gap-2 text-white/80 hover:text-white text-sm px-2 py-2 rounded-md hover:bg-[#2b3f5a]">
            <LifeBuoy className="w-4 h-4" />
            Support
          </button>

          <button className="flex items-center gap-2 text-white/80 hover:text-white text-sm px-2 py-2 rounded-md hover:bg-[#2b3f5a]">
            <Moon className="w-4 h-4" />
            Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
