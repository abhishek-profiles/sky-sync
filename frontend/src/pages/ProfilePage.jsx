import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">Your Profile</h1>
        
        {/* Profile Card with split layout */}
        <div className="bg-base-300/50 backdrop-blur-xl rounded-3xl border border-base-300/30 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 p-6">
            {/* Left side - Profile Picture */}
            <div className="p-8 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl">
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                  <div className="relative">
                    <img
                      src={selectedImg || authUser.profilePic || "/avatar.png"}
                      alt="Profile"
                      className="size-64 rounded-2xl object-cover border-4 border-base-100 shadow-xl"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className={`absolute bottom-4 right-4 bg-primary hover:bg-primary/90 p-3 rounded-xl cursor-pointer transition-all duration-200 shadow-lg ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                    >
                      <Camera className="w-6 h-6 text-base-100" />
                      <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile} />
                    </label>
                  </div>
                </div>
                <p className="text-base text-base-content/60 text-center">
                  {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                </p>
              </div>
            </div>

            {/* User Information Grid */}
            <div className="grid gap-6">
              <div className="p-4 bg-base-200/50 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-base-content/70 mb-1">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <div className="text-lg font-semibold">{authUser?.fullName}</div>
              </div>

              <div className="p-4 bg-base-200/50 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-base-content/70 mb-1">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <div className="text-lg font-semibold">{authUser?.email}</div>
              </div>

              <div className="p-4 bg-base-200/50 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-base font-semibold">
                  <Shield className="w-5 h-5 text-primary" />
                  Account Information
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-base-300/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-base-content/70">Member Since</span>
                    </div>
                    <span className="font-medium">{authUser.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-base-content/70">Account Status</span>
                    <span className="text-emerald-500 font-medium">Active</span>
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

export default ProfilePage;
