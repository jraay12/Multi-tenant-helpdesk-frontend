import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  if (token) return null;

  return children;
}
