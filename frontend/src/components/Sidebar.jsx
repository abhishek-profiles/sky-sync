import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => showOnlineOnly ? onlineUsers.includes(user._id) : true)
    .filter((user) => 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-24 lg:w-80 border-r border-base-300 flex flex-col bg-base-200/50">
      <div className="p-3 lg:p-4 border-b border-base-300">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="size-4 lg:size-5 text-primary" />
            </div>
            <h2 className="font-semibold text-sm lg:text-base hidden lg:block">Contacts</h2>
          </div>
          <div className="flex items-center">
            <label className="cursor-pointer flex items-center gap-1.5 lg:gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-xs lg:checkbox-sm checkbox-primary"
              />
              <span className="text-xs lg:text-sm hidden lg:inline">Online only</span>
            </label>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="input input-xs lg:input-sm input-bordered w-full pl-7 lg:pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 size-3 lg:size-4 text-base-content/40" />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-2 lg:p-3 flex items-center gap-2 lg:gap-3 relative
              hover:bg-base-300/50 transition-all duration-200
              ${selectedUser?._id === user._id ? "bg-base-300/50 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-10 lg:size-12 object-cover rounded-full ring-2 ring-base-300"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0.5 right-0.5 size-2 lg:size-3 bg-emerald-500
                  rounded-full ring-2 ring-base-200"
                />
              )}
            </div>

            <div className="hidden lg:block text-left flex-1 min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-base-content/60 flex items-center gap-1.5">
                <span className={`size-1.5 rounded-full ${onlineUsers.includes(user._id) ? "bg-emerald-500" : "bg-base-content/20"}`} />
                {onlineUsers.includes(user._id) ? "Active now" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/60 py-4">
            {searchQuery ? "No contacts found" : "No contacts available"}
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
