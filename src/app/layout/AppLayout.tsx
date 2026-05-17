import { Outlet } from "react-router";
import Header from "../../components/ui/Header";
import SideBar from "../../components/ui/SideBar";
import TicketDrawer from "../../components/ui/TicketDrawer";
import { useState } from "react";
const AppLayout = () => {
  const [isTicketOpen, setIsTicketOpen] = useState<boolean>(false);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-[240px_1fr] grid-rows-[60px_1fr] ">
      {/* Sidebar */}
      <aside className="hidden md:block row-span-2 border-r">
        <SideBar />
      </aside>

      {/* Header */}
      <Header onClick={() => setIsTicketOpen(true)} />

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      <TicketDrawer
        open={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
      />
    </div>
  );
};

export default AppLayout;
