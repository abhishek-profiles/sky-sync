import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="max-w-md w-full p-8 rounded-3xl bg-base-100/50 backdrop-blur-xl border border-base-200/50 shadow-2xl text-center space-y-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 animate-pulse duration-1000"></div>
            <div className="relative size-20 mx-auto transform hover:scale-105 transition-transform">
              <Loader className="w-full h-full animate-spin text-accent" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Starting SkySync</h2>
            <p className="text-base-content/70 font-medium">
            Please wait a moment while the servers wake up
              <br />
              <span className="text-sm text-base-content/50">
                (This may take up to a minute on the first load)
              </span>
            </p>
          </div>
          <div className="w-full max-w-[200px] mx-auto h-1.5 rounded-full bg-base-300/50 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
