import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

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
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-base-300 rounded-2xl overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center relative">
            <h1 className="text-2xl font-bold mb-2">Profile</h1>
            <p className="text-base-content/70">Manage your personal information</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 border-base-100 shadow-lg"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-primary hover:bg-primary/90
                    p-2 rounded-full cursor-pointer 
                    transition-all duration-200 shadow-md
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-5 h-5 text-base-100" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-base-content/60">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* User Information Section */}
            <div className="grid gap-6">
              <div className="space-y-2">
                <div className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <div className="px-4 py-3 bg-base-200 rounded-xl border border-base-300">
                  {authUser?.fullName}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <div className="px-4 py-3 bg-base-200 rounded-xl border border-base-300">
                  {authUser?.email}
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div className="bg-base-200 rounded-xl p-6 border border-base-300">
              <h2 className="text-lg font-semibold mb-4">Account Information</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-base-300">
                  <span className="text-base-content/70">Member Since</span>
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
  );
};
export default ProfilePage;
