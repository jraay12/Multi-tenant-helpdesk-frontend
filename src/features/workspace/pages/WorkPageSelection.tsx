import Header from "../../../components/ui/Header";
import Button from "../../../components/ui/Button";
import WorkspaceCard from "../../../components/ui/WorkspaceCard";
import Footer from "../../../components/ui/Footer";
import { useFetchMyWorkspace } from "../hooks/useFetchMyWorkspace";
import { useNavigate } from "react-router";

const WorkspacePageSelection = () => {
  const navigate = useNavigate();
  const activateWorkspaceId = localStorage.getItem("workspace");

  const handleClickWorkspace = (id: string) => {
    localStorage.setItem("workspace", id);
    navigate("/", { replace: true });
  };

  const { data, isLoading } = useFetchMyWorkspace();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafaff] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#d9e1fc] border-t-indigo-400 animate-spin" />
          <p className="text-sm text-gray-400">Loading workspaces…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafaff] min-h-screen flex flex-col">
      <Header onClick={() => null} />

      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold text-indigo-400 tracking-widest uppercase mb-2">
              Workspaces
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Select your workspace
            </h1>
            <p className="mt-1.5 text-sm text-gray-500 max-w-md">
              Choose an existing workspace or create a new one to start resolving tickets.
            </p>
          </div>

          <div className="shrink-0">
            <Button button_name="+ Create New Workspace" onClick={() => null} />
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 mb-8 h-px bg-gray-200" />

        {/* Cards grid */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                name={workspace.name}
                description={workspace.description}
                members={workspace._count.members}
                slug={workspace.slug}
                onClick={() => handleClickWorkspace(workspace.id)}
                isActive={activateWorkspaceId === workspace.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-14 w-14 rounded-2xl bg-[#d9e1fc] flex items-center justify-center mb-4">
              <span className="text-2xl">📂</span>
            </div>
            <p className="text-gray-700 font-medium">No workspaces yet</p>
            <p className="text-sm text-gray-400 mt-1">Create your first workspace to get started.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WorkspacePageSelection;