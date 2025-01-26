import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, LucideMessageCircleHeart, MessageCircle, MessageCircleHeart, MessageCircleHeartIcon, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto h-16 px-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <LucideMessageCircleHeart className="size-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold hidden sm:block">SkySync</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {authUser && (
              <div className="flex items-center gap-3 mr-2">
                <div className="avatar">
                  <div className="size-8 rounded-full ring-2 ring-base-300">
                    <img
                      src={authUser.profilePic || "/avatar.png"}
                      alt="profile"
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="font-medium hidden sm:inline">{authUser.fullName}</span>
              </div>
            )}

            <Link
              to="/settings"
              className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition-colors"
            >
              <Settings className="size-4" />
              <span className="hidden sm:inline">Theme</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to="/profile" 
                  className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition-colors"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition-colors" 
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
