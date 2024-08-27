import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setAvatar } from "../../lib/Slices/userSlice";
import apiRequest from "../../lib/utils/apiRequest";

const avatarMap = [
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619707/avatars/um7huhxwczbeikjlgwl3.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/pxtago3qjlvicif9mbya.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/ekxely0wscznef87qoci.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/xba9fjk3et0lxnn2oe4c.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/j9g2r7wnooq1s3jh5tnc.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/t84v2o60lrdmmouy7kec.jpg",
];

const ChooseAvatarComponent = ({ selectedImage, setSelectedImage }) => {
  return (
    <div className="w-full h-48 flex justify-center gap-4 mt-6">
      {avatarMap.map((item, index) => (
        <img
          key={index}
          src={item}
          alt={"avatar" + (index + 1)}
          className={`w-24 h-24 rounded-full shadow-md cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform 
    ${
      item === selectedImage
        ? "ring-4 ring-yellow-500"
        : "ring-2 ring-transparent"
    }`}
          onClick={() => setSelectedImage(item)}
        />
      ))}
    </div>
  );
};

const ProfilePage = () => {
  const { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const uploadImage = async () => {
    setSuccess("");
    if (!selectedImage) {
      setError("Please select an avatar image.");
      return;
    }
    setUploading(true);
    try {
      await apiRequest.post("/upload/uploadAvatar", { avatar: selectedImage });
      dispatch(setAvatar(selectedImage));
      setError(null);
      setSuccess("Avatar updated successfully!");
      setTimeout(() => {
        setSuccess("");
        setSelectedImage(null);
      }, 2000);
    } catch (error) {
      setError("Failed to upload avatar. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (status === "Loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-gray-300">Loading...</h1>
      </div>
    );
  }

  return (
    <section className="p-8 bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-100 mb-4">Profile Page</h1>
      <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full border-4 border-gray-700 shadow-md"
            />
            <div>
              <p className="text-lg font-medium">Username: {user.username}</p>
              <p className="text-lg font-medium">Email: {user.email}</p>
            </div>
          </div>
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
        <ChooseAvatarComponent
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-200"
          onClick={uploadImage}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Update Avatar"}
        </button>
        {error && (
          <p className="text-red-500 mt-2 bg-red-100 p-2 rounded-lg">{error}</p>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-6"
      >
        Log Out
      </button>
    </section>
  );
};

export default ProfilePage;
