import { MessageCircleHeart, Users } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-1 flex-col items-center justify-center p-8 bg-gradient-to-br from-base-200/50 via-base-100/30 to-base-200/50 backdrop-blur-lg">
      <div className="max-w-lg text-center space-y-12 transform hover:scale-[1.01] transition-transform duration-500">
        <div className="flex justify-center gap-8">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-[2rem] blur opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
            <div className="w-24 h-24 rounded-[2rem] bg-base-100 shadow-xl flex items-center justify-center relative">
              <MessageCircleHeart className="w-12 h-12 text-accent group-hover:text-primary transition-colors duration-300" />
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2rem] blur opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
            <div className="w-24 h-24 rounded-[2rem] bg-base-100 shadow-xl flex items-center justify-center relative">
              <Users className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">
            Welcome to SkySync!
          </h2>
          <p className="text-base-content/70 text-xl font-medium leading-relaxed">
            Connect with friends and start meaningful conversations.
            <br />
            Select a contact from the sidebar to begin your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
