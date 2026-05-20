import { useFetchMyWorkspaceById } from "../../features/workspace/hooks/useFetchMyWorkspaceById";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Ticket,
  Bell,
  Users,
  BarChart3,
  Activity,
  Settings,
  Book,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useMyDetails } from "../../features/auth/hooks/useMyDetails";
import UserMenu from "./UserMenu";
import { useState } from "react";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeWorkspaceId = localStorage.getItem("workspace");
  const [open, setOpen] = useState(false);
  

  const { data } = useFetchMyWorkspaceById(activeWorkspaceId!);
  const { data: mydetails } = useMyDetails();

  const updatedMenu = [
    {
      MAIN: [
        {
          label: "Dashboard",
          value: "dashboard",
          icon: LayoutDashboard,
          path: "/",
        },
        {
          label: "All Tickets",
          value: "alltickets",
          icon: Ticket,
          path: "/tickets",
        },
        {
          label: "Notifications",
          value: "notification",
          icon: Bell,
          path: "/notifications",
        },
      ],
      MANAGE: [
        {
          label: "Team",
          value: "team",
          icon: Users,
          path: "/team",
        },
        {
          label: "Analytics",
          value: "analytics",
          icon: BarChart3,
          path: "/analytics",
        },
        {
          label: "Activity log",
          value: "activitylog",
          icon: Activity,
          path: "/activity-logs",
        },
      ],
      CONFIG: [
        {
          label: "Workspace",
          value: "workspace",
          icon: Settings,
          path: "/workspace",
        },
      ],
    },
  ];

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <div className="hidden w-full h-screen bg-[#ffffff] pt-6 md:flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center border border-gray-300 rounded-xl mx-4 h-14 bg-[#ebedf0] gap-4 cursor-pointer select-none" onClick={() => setOpen((prev) => !prev)}>
          <img
            src="https://i.pravatar.cc/40?img=47"
            alt="profile"
            className="w-10   h-10 rounded-full object-cover shrink-0 ml-4"
          />
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">{data?.workspace.name}</h1>
            <p className="text-xs text-black/50">Free plan</p>
          </div>
          <div className="flex flex-col ">
            <ChevronUp className="w-4"/>
            <ChevronDown className="w-4"/>
          </div>
          <UserMenu onClose={() => setOpen(false)} open={open} data={data}/>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-4">
        {updatedMenu.map((updatedMenu) =>
          Object.entries(updatedMenu).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <h1 className="hidden lg:block font-bold text-xs text-black/40">
                {key}
              </h1>

              <div className="space-y-2">
                {value.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.value}
                      onClick={() => navigate(item.path)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md w-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                        isActive(item.path)
                          ? "text-[#4F46E5] bg-[#EEF2FF]"
                          : "text-black/70 hover:bg-[#EEF2FF]"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="hidden lg:block">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )),
        )}
      </div>

      <div className="grow" />
      <div className="flex gap-4 py-10 items-center h-10 border-t border-gray-300">
        <img
          src="https://i.pravatar.cc/40?img=47"
          alt="profile"
          className="w-10   h-10 rounded-full object-cover shrink-0 ml-4"
        />
        <div className="flex flex-col">
          <h1 className="text-sm text-black">{mydetails?.name}</h1>
          <p className="text-xs text-black/50">{data?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
