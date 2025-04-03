import React, { useContext, useState, useRef } from "react";
import axios from "axios";
import { AppContent } from "../../context/AppContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { backendUrl, userData, setUserData } = useContext(AppContent);
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [bio, setBio] = useState(userData?.bio || "");

  const fileInputRef = useRef(null);

  // If you want to re-fetch user details from backend:
  // const fetchProfile = async () => {
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/profile/profile`, {
  //       withCredentials: true,
  //     });
  //     if (data.success) {
  //       setUserData(data.user);
  //       setName(data.user.name);
  //       setEmail(data.user.email);
  //       setBio(data.user.bio || "");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await axios.post(
        `${backendUrl}/profile/upload-profile`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Profile image updated!");
        // update userData with new image path
        setUserData({ ...userData, profileImage: res.data.profileImage });
      }
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Optionally handle saving other profile info (like name, bio)
  const handleSaveProfile = async () => {
    // e.g. call an endpoint /profile/updateProfile to save name, bio, etc.
    toast.info("Profile updated (not fully implemented)!");
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="flex flex-col items-center mb-4">
        <img
          src={
            userData?.profileImage
              ? `${backendUrl}${userData.profileImage}`
              : "https://via.placeholder.com/80"
          }
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <button
          onClick={handleUploadClick}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Change Photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      {/* Basic Info */}
      <label className="block text-gray-700 mb-1">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border w-full px-2 py-1 rounded mb-3"
      />

      <label className="block text-gray-700 mb-1">Email</label>
      <input
        type="email"
        value={email}
        disabled // typically email is not changed or done via a special flow
        className="border w-full px-2 py-1 rounded mb-3"
      />

      <label className="block text-gray-700 mb-1">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="border w-full px-2 py-1 rounded mb-3"
      />

      <button
        onClick={handleSaveProfile}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
