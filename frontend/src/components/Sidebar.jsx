import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, X } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => a.fullName.localeCompare(b.fullName));

  const handleProfileClick = (e, user) => {
    e.stopPropagation();
    setSelectedProfile(user);
    setShowProfileModal(true);
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      <aside className="h-full w-24 lg:w-80 flex flex-col bg-base-200/80 backdrop-blur-xl shadow-lg">
        <div className="p-4 lg:p-5 border-b border-base-300/50 bg-gradient-to-r from-base-200/90 to-base-300/50">
          <h2 className="font-bold text-base lg:text-lg mb-4 lg:mb-5 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Contacts</h2>

          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm w-full bg-base-300/50 placeholder:text-base-content/30 text-base-content/90 border-none focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-base-content/30" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all ${selectedUser?._id === user._id ? "bg-accent/10 text-accent" : "hover:bg-base-300/50 text-base-content/70 hover:text-base-content"}`}
            >
              <div className="avatar group" onClick={(e) => handleProfileClick(e, user)}>
                <div className={`size-8 lg:size-10 rounded-full ring-2 cursor-pointer transition-all transform hover:scale-105 ${onlineUsers.includes(user._id) ? "ring-success hover:ring-success/70" : "ring-base-300 hover:ring-accent"}`}>
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt="user avatar"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="hidden lg:block text-left group-hover:translate-x-1 transition-transform">
                <h3 className="font-medium text-sm text-base-content/90 group-hover:text-base-content transition-colors">{user.fullName}</h3>
                {onlineUsers.includes(user._id) && (
                  <p className="text-xs text-success group-hover:text-success/90 transition-colors">Online</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Profile Picture Modal */}
      {showProfileModal && selectedProfile && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setShowProfileModal(false)}
        >
          <div className="relative max-w-2xl w-full mx-4">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white"
            >
              <X className="size-6" />
            </button>
            <img
              src={selectedProfile.profilePic || "/avatar.png"}
              alt={selectedProfile.fullName}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
