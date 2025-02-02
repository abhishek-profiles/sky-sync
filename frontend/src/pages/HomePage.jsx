import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="container mx-auto px-4 h-screen pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-full pb-6">
          {/* Sidebar with enhanced glassmorphism effect */}
          <div className="hidden lg:block bg-base-100/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-base-200/30 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Sidebar />
          </div>

          {/* Mobile sidebar - shown only on small screens */}
          <div className="lg:hidden bg-base-100/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-base-200/30 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Sidebar />
          </div>

          {/* Main chat area with enhanced visual design */}
          <div className="bg-base-100/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-base-200/30 overflow-hidden relative hover:shadow-xl transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
            <div className="relative h-full">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
