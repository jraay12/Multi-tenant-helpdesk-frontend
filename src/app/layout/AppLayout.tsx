import { Outlet } from "react-router";
import Header from "../../components/ui/Header";
import SideBar from "../../components/ui/SideBar";
import TicketDrawer from "../../components/ui/TicketDrawer";
import { useState } from "react";

const AppLayout = () => {
  const [isTicketOpen, setIsTicketOpen] = useState<boolean>(false);
  const [ticketCount, setTicketCount] = useState<number | undefined>();

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-[80px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] grid-rows-[60px_1fr] overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:block row-span-2 border-r border-gray-300">
        <SideBar />
      </aside>

      {/* Header */}
      <header className="min-w-0">
        <Header onClick={() => setIsTicketOpen(true)} ticketCount={ticketCount!}/>
      </header>

      {/* Main Content */}
      <main className="min-w-0 overflow-y-hidden bg-[#f5f7fa]">
        <Outlet context={{ticketCount, setTicketCount}}/>
      </main>

      <TicketDrawer
        open={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
      />
    </div>
  );
};

export default AppLayout;