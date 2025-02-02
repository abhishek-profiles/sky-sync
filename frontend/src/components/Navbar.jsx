import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, LucideMessageCircleHeart } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="bg-base-100/95 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto h-16 px-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all">
              <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors">
                <LucideMessageCircleHeart className="size-5 text-accent" />
              </div>
              <h1 className="text-xl font-bold hidden sm:block text-base-content/90">SkySync</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {authUser && (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-3 hover:opacity-90 transition-all">
                  <div className="avatar">
                    <div className="size-9 rounded-full ring-2 ring-accent/20">
                      <img
                        src={authUser.profilePic || "/avatar.png"}
                        alt="profile"
                        className="object-cover"
                      /> 
                    </div>
                  </div>
                  <span className="font-medium hidden sm:inline text-base-content/80">{authUser.fullName}</span>
                </Link>
              </div>
            )}

            {authUser && (
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                className="btn btn-sm btn-ghost gap-2 hover:bg-base-200/80 transition-colors text-base-content/70 hover:text-base-content"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
