import { Check, LogOut, Settings, User, X } from "lucide-react";

type UserMenuProps = {
  open: boolean;
  onClose: () => void;
  data?: {
    workspace: {
      name: string;
    };
    user?: {
      name: string;
      email: string;
      avatar?: string;
    };
  };
};

const UserMenu = ({ open, onClose, data }: UserMenuProps) => {
  if (!open) return null;

  return (
    <>
    
      <div className="absolute left-0 top-18 w-60 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">
        {/* Workspace */}
        <div className="p-3" >
          <div className="flex items-center justify-between bg-[#f4f8fc] rounded-xl p-2">
            <div className="flex items-center gap-2">
              <img
                src={data?.user?.avatar || "https://i.pravatar.cc/100?img=47"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />

              <div>
                <p className="text-xs  font-medium text-gray-900">
                  {data?.workspace?.name || "My Workspace"}
                </p>
              </div>
            </div>

            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
