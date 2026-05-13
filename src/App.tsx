import "./App.css";
import { Route, Routes } from "react-router";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProtectedRoute from "./app/router/ProtectedRoutes";
import PublicRoute from "./app/router/PublicRoutes";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import AppLayout from "./app/layout/AppLayout";
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
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
