import { useNavigate } from "react-router";

type UserMenuProps = {
  open: boolean;
  onClose: () => void;
};

const UserMenu = ({ open, onClose }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="absolute right-0 mt-2 w-60 top-8 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
      
      {/* User info */}
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">John Doe</p>
        <p className="text-xs text-gray-500">john@example.com</p>
      </div>

      {/* Menu items */}
      <button
        onClick={() => {
          navigate("/profile");
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Profile
      </button>

      <button
        onClick={() => {
          navigate("/settings");
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Settings
      </button>

      <div className="border-t border-gray-100" />

      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;