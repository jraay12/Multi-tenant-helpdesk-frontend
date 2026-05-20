import { Bell, User2, HelpCircleIcon, InfoIcon, ArrowLeft } from "lucide-react";
import Button from "./Button";
import SearchComponent from "./Search";
import { useLocation, useNavigate, useParams } from "react-router";
import { useFetchMyWorkspaceById } from "../../features/workspace/hooks/useFetchMyWorkspaceById";
import { useGetTicketById } from "../../features/tickets/hooks/useGetTicketsById";
import UserMenu from "./UserMenu";
import { useState } from "react";

type HeaderProps = {
  onClick: () => void;
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
              {/* SEARCH (LIST PAGE ONLY) */}
              <div className="md:w-40 lg:w-80 hidden lg:block">
                <SearchComponent
                  placeholder="Search tickets"
                  onChange={() => null}
                  value=""
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* RIGHT SIDE */}
      {isWorkspacePage ? (
        <div className="flex items-center gap-3 justify-end w-full relative">
          <div
            className="h-7 w-7 cursor-pointer rounded-full bg-black"
            onClick={() => setOpen((prev) => !prev)}
          ></div>
          <UserMenu open={open} onClose={() => setOpen(false)} />
        </div>
      ) : (
        <div className="flex gap-5 items-center w-full lg:w-max justify-between lg:justify-start">
          <h1 className="lg:hidden text-[18px] font-medium">ResolvDesk</h1>
          <div>
            <Button button_name="Create Ticket" onClick={props.onClick} />{" "}
          </div>

          <div className="hidden lg:block border border-gray-300 rounded-full cursor-pointer">
            <Bell className="p-1 w-6 h-6" />
          </div>

          <div className="hidden lg:block border border-gray-300 rounded-full cursor-pointer">
            <InfoIcon className="p-1 w-6 h-6" />
          </div>

          <div className="hidden lg:block border-l border-gray-400 w-4 h-10"></div>

          <div className="hidden lg:flex items-center gap-4">
            <User2 />
            <div className="flex flex-col w-30 text-center font-medium">
              <h1 className="text-xs">Alex Rivera</h1>
              <p className="text-xs">{workspace?.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
