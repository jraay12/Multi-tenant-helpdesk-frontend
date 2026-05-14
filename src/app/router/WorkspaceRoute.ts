import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function WorkspaceRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");
  const workspaceId = localStorage.getItem("workspace");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (workspaceId) {
      navigate("/", { replace: true });
    }
  }, [token, workspaceId, navigate]);

  if (!token) return null;
  if (workspaceId) return null;

  return children;
}
