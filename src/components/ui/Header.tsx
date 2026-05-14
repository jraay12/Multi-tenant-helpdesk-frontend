import { Bell, User2, HelpCircleIcon, InfoIcon } from "lucide-react";
import Button from "./Button";
import SearchComponent from "./Search";
import { useLocation } from "react-router";

const Header = () => {
  const location = useLocation();

  return (
    <div className="border-b border-gray-300 px-4 py-2 flex items-center justify-between">
      {/* Left */}
      {location.pathname === "/workspace" && (
        <div className="flex gap-6 items-center">
          <h1 className="font-bold">ResolvDesk</h1>
        </div>
      )}

      {location.pathname !== "/workspace" && (
        <>
          <div className="w-1/3">
            <SearchComponent placeholder="Search tickets, customer, or internat docs..." />
          </div>

          <div className="flex gap-5 items-center">
            <Button button_name="Create Ticket" />
            <div className="border border-gray-300 rounded-full cursor-pointer">
              <Bell className="p-1 w-6 h-6" />
            </div>

            <div className="border border-gray-300 rounded-full cursor-pointer">
              <InfoIcon className="p-1 w-6 h-6" />
            </div>
            <div className="border-l border-gray-400 w-4 h-10"></div>
            <div className="flex items-center gap-4">
              <User2 />
              <div className="flex-col flex w-30 text-center">
                <h1 className="text-x1s">Alex Rivera</h1>
                <p className="text-xs">LEAD ARCHITECT</p>
              </div>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/workspace" && (
        <div className="flex items-center gap-3">
          <HelpCircleIcon className="text-gray-500" />
          <div className="h-7 w-7 cursor-pointer rounded-full bg-black"></div>
        </div>
      )}
    </div>
  );
};

export default Header;
