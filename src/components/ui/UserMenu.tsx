import { useNavigate } from "react-router";

type UserMenuProps = {
  open: boolean;
  onClose: () => void;
  data?: any
};

const UserMenu = ({ open, onClose, data }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="absolute right-2 mt-6 w-60 top-8 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
      
      {/* User info */}
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">{data?.name}</p>
        <p className="text-xs text-gray-500 font-bold">{data?.role}</p>
      </div>
      <div className="border-t border-gray-100" />

      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;