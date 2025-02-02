import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <div className="p-4 lg:p-5 border-b border-base-300 bg-gradient-to-r from-base-200/90 to-base-300/50 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="avatar cursor-pointer" onClick={() => setShowProfileModal(true)}>
              <div className="size-12 rounded-2xl ring-2 ring-base-300 hover:ring-accent shadow-lg overflow-hidden transition-all transform hover:scale-105">
                <img 
                  src={selectedUser.profilePic || "/avatar.png"} 
                  alt={selectedUser.fullName}
                  className="object-cover" 
                />
              </div>
            </div>

            {/* User info */}
            <div>
              <div
                className="group cursor-pointer"
                onClick={() => setShowProfileModal(true)}
              >
                <h3 className="text-lg font-bold text-base-content hover:text-accent transition-colors">
                  {selectedUser.fullName}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`size-2 rounded-full ${onlineUsers.includes(selectedUser._id) ? "bg-success" : "bg-base-content/30"}`} />
                  <p className="text-sm text-base-content/70 group-hover:text-base-content/90 transition-colors">
                    {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button 
            onClick={() => setSelectedUser(null)}
            className="btn btn-sm btn-ghost btn-circle hover:bg-base-300/50"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Profile Picture Modal */}
      {showProfileModal && (
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
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
