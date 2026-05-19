import "./App.css";
import { Route, Routes } from "react-router";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProtectedRoute from "./app/router/ProtectedRoutes";
import PublicRoute from "./app/router/PublicRoutes";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import AppLayout from "./app/layout/AppLayout";
import WorkPageSelection from "./features/workspace/pages/WorkPageSelection";
import WorkspaceRoute from "./app/router/WorkspaceRoute";
import TicketPage from "./features/tickets/pages/TicketPage";
import TicketDetailsPage from "./features/tickets/pages/TicketDetailsPage";
import WorkspaceCreation from "./components/ui/WorkspaceCreation";
import TeamPage from "./features/team/pages/TeamPage";
import ActivityLogsPage from "./features/activity-logs/pages/ActivityLogsPage";
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/workspace/create"
        element={
          <WorkspaceRoute>
            <WorkspaceCreation />
          </WorkspaceRoute>
        }
      />
      <Route
        path="/workspace"
        element={
          <WorkspaceRoute>
            <WorkPageSelection />
          </WorkspaceRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="/tickets" element={<TicketPage />} />
        <Route path="/tickets/:id" element={<TicketDetailsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/activity-logs" element={<ActivityLogsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
