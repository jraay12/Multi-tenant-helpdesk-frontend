import { useState } from "react";
import { Bell, User2 } from "lucide-react";
import Button from "./Button";

const Header = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { label: "All Tickets", value: "all" },
    { label: "My Tasks", value: "my" },
    { label: "Unassigned", value: "unassigned" },
  ];

  return (
    <div className="border-b border-gray-300 px-4 py-2 flex items-center justify-between">
      
      {/* Left */}
      <div className="flex gap-6 items-center">
        <h1 className="font-bold">Workspace</h1>

        {/* Tabs */}
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`text-sm font-medium transition cursor-pointer ${
              activeTab === tab.value
                ? "border-b-2 border-blue-500 pb-1 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex gap-2 items-center">
        <div className="border border-gray-300 rounded-full cursor-pointer">
          <Bell className="p-1 w-6 h-6" />
        </div>

        <div className="border border-gray-300 rounded-full cursor-pointer">
          <User2 className="p-1 w-6 h-6" />
        </div>

        <Button button_name="Create Ticket" />
      </div>
    </div>
  );
};

export default Header;