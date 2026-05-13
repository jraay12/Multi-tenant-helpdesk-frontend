import { Outlet } from "react-router";
import Header from "../../components/ui/Header";
import SideBar from "../../components/ui/SideBar";

const AppLayout = () => {
  return (
    <div className="h-screen grid grid-cols-[240px_1fr] grid-rows-[60px_1fr]">
      {/* Sidebar */}
      <aside className="row-span-2 border-r">
        <SideBar />
      </aside>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
