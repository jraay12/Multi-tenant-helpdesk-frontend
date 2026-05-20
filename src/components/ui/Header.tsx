import {
  Bell,
  InfoIcon,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Button from "./Button";
import { useLocation, useNavigate, useParams } from "react-router";
import { useFetchMyWorkspaceById } from "../../features/workspace/hooks/useFetchMyWorkspaceById";
import { useGetTicketById } from "../../features/tickets/hooks/useGetTicketsById";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useMyDetails } from "../../features/auth/hooks/useMyDetails";

type HeaderProps = {
  onClick: () => void;
  ticketCount: number;
};

const Header = (props: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const activeWorkspaceId = localStorage.getItem("workspace");
  const { data: workspace } = useFetchMyWorkspaceById(activeWorkspaceId!);

  const isWorkspacePage =
    location.pathname === "/workspace" ||
    location.pathname === "/workspace/create";

  // only fetch when viewing ticket details
  const { data: ticket } = useGetTicketById(id!);
  const isTicketDetails = !!id;

  return (
    <div className="border-b border-gray-300 px-4 py-2 flex items-center justify-start lg:justify-between">
      {/* LEFT SIDE */}
      {isWorkspacePage ? (
        <div className="flex gap-6 items-center">
          <h1 className="font-bold">ResolvDesk</h1>
        </div>
      ) : (
        <div className="flex items-center gap-4 ">
          {/* BACK BUTTON + TITLE (DETAIL PAGE) */}
          {isTicketDetails ? (
            <>
              <button
                onClick={() => navigate("/tickets")}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer text-black/40 hover:text-black/60"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Tickets
              </button>
              <div className="border-r border-gray-400 w-2 h-10"></div>

              <h1 className="text-lg font-semibold">{ticket?.title ?? ""}</h1>
            </>
          ) : (
            <>
              {location.pathname === "/tickets" && (
                <div className="flex items-center gap-2">
                  <h1 className="text-[#1d3785] font-bold text-2xl">Tickets</h1>

                  <span className="bg-[#1d3785] text-white rounded-full px-2 py-[2px] text-xs font-semibold min-w-6 text-center">
                    {props.ticketCount ?? 0}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* RIGHT SIDE */}
      {isWorkspacePage ? (
        <div
          className="flex items-center gap-3 justify-end w-full relative cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <img
            src="https://i.pravatar.cc/40?img=47"
            alt="profile"
            className="w-6 h-6 rounded-full object-cover shrink-0"
          />
          <UserMenu
            open={open}
            onClose={() => setOpen(false)}
            data={workspace}
          />
        </div>
      ) : (
        <div className="flex gap-5 items-center w-full lg:w-max justify-between lg:justify-start">
          <div className="lg:hidden text-[18px] font-medium"></div>
          <div>
            <Button button_name="Create Ticket" onClick={props.onClick} />{" "}
          </div>

          <div className="hidden lg:block border border-gray-300 rounded-full cursor-pointer">
            <Bell className="p-1 w-6 h-6" />
          </div>

          <div className="hidden lg:block border border-gray-300 rounded-full cursor-pointer">
            <InfoIcon className="p-1 w-6 h-6" />
          </div>

          {/* <div className="hidden lg:block border-l border-gray-400 w-4 h-10"></div> */}

          {/* <div className="border border-[#16377d] p-1 rounded-full cursor-pointer">
            <div
              className="flex items-center select-none gap-3"
              onClick={() => setOpen((prev) => !prev)}
            >
              <img
                src="https://i.pravatar.cc/40?img=47"
                alt="profile"
                className="w-6 h-6 rounded-full object-cover shrink-0"
              />
              {open ? <ChevronUp /> : <ChevronDown />}
            </div>
            <UserMenu
              open={open}
              onClose={() => setOpen(false)}
              data={workspace}
            />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Header;
