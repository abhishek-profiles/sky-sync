import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { MessageSquare, Bell, Shield, Moon } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Settings</h1>
        
        <div className="grid gap-6">
          {/* Appearance Section */}
          <div className="bg-base-300/50 backdrop-blur-xl rounded-2xl p-6 border border-base-300/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Moon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Appearance</h2>
                <p className="text-base-content/60 text-sm">Customize your interface</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-base-300/50 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Message Bubbles</p>
                    <p className="text-sm text-base-content/60">Show message timestamps</p>
                  </div>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-base-300/50 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-base-content/60">Message alerts</p>
                  </div>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-base-300/50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Privacy Mode</p>
                    <p className="text-sm text-base-content/60">Hide read receipts</p>
                  </div>
                </div>
                <input type="checkbox" className="toggle toggle-primary" />
              </div>
            </div>
          </div>

          {/* Chat Settings Section */}
          <div className="bg-base-300/50 backdrop-blur-xl rounded-2xl p-6 border border-base-300/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Chat Settings</h2>
                <p className="text-base-content/60 text-sm">Customize your chat experience</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-base-content/70">Message Font Size</label>
                <input type="range" className="range range-primary range-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-base-content/70">Chat Background Blur</label>
                <input type="range" className="range range-primary range-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
