import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette, MessageSquare } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-screen-2xl mx-auto h-[calc(100vh-7rem)]">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Theme Selection Section */}
          <div className="flex-1 lg:max-w-md h-full">
            <div className="bg-base-300 rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-base-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Theme</h1>
                    <p className="text-sm text-base-content/70">
                      Choose your style
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {THEMES.map((t) => (
                    <button
                      key={t}
                      className={`
                        relative group flex flex-col items-center gap-3 p-4 rounded-xl transition-all
                        hover:scale-102 hover:shadow-lg
                        ${
                          theme === t
                            ? "bg-base-100 shadow-md ring-2 ring-primary"
                            : "hover:bg-base-200"
                        }
                      `}
                      onClick={() => setTheme(t)}
                    >
                      <div
                        className="relative w-full aspect-video rounded-lg overflow-hidden shadow-inner"
                        data-theme={t}
                      >
                        <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
                          <div className="space-y-2">
                            <div className="h-3 rounded bg-primary"></div>
                            <div className="h-3 rounded bg-secondary"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 rounded bg-accent"></div>
                            <div className="h-3 rounded bg-neutral"></div>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-medium">
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </span>
                      {theme === t && (
                        <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex-[2] h-full">
            <div className="bg-base-300 rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-base-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Preview</h2>
                    <p className="text-sm text-base-content/70">
                      Live chat interface preview
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden border border-base-300 h-full flex flex-col">
                  {/* Chat Header */}
                  <div className="px-6 py-4 border-b border-base-200 bg-base-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-base-200">
                        <span className="text-primary font-medium text-lg">
                          J
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Batman</h3>
                        <div className="flex items-center gap-2 text-base-content/70">
                          <span className="size-2 rounded-full bg-emerald-500" />
                          <span className="text-sm">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-2xl px-5 py-3 shadow-md
                            ${
                              message.isSent
                                ? "bg-primary text-primary-content"
                                : "bg-base-200"
                            }
                          `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                              text-[10px] mt-1.5
                              ${
                                message.isSent
                                  ? "text-primary-content/70"
                                  : "text-base-content/70"
                              }
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-200 bg-base-100">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary px-6">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
