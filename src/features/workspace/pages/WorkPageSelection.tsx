import Header from "../../../components/ui/Header";
import Button from "../../../components/ui/Button";
import WorkspaceCard from "../../../components/ui/WorkspaceCard";
import Footer from "../../../components/ui/Footer";
import { useFetchMyWorkspace } from "../hooks/useFetchMyWorkspace";
import { useNavigate } from "react-router";
const WorkPageSelection = () => {
  const navigate = useNavigate()
  const activateWorkspaceId = localStorage.getItem('workspace')

  const handleClickWorkspace = (id: string) => {
    localStorage.setItem("workspace", id);
    navigate("/", {replace: true})
  };
  const { data, isLoading } = useFetchMyWorkspace();
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-[#fafaff] min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-5">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="text-4xl font-medium">Select your workspace</h1>

            <p className="text-sm">
              Choose an existing workspace or create a new environment to start
              resolving tickets
            </p>
          </div>

          <div className="w-full md:w-50 mt-4">
            <Button button_name="+ Create New Workspace" />
          </div>
        </div>

        <div className="flex gap-6 mt-10 flex-wrap">
          {data?.map((workspace) => (
            <WorkspaceCard
              name={workspace.name}
              description={workspace.description}
              members={workspace._count.members}
              slug={workspace.slug}
              onClick={() => handleClickWorkspace(workspace.id)}
              isActive={activateWorkspaceId === workspace.id}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorkPageSelection;
