import { useState, type ChangeEvent } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    username: "ecofactory_admin",
    email: "admin@ecofactory.com",
    location: "Industrial Zone, Green City",
    phone: "+1 555-ECO-FACT",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImageUrl(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    if (isEditing) {
      console.log("Saving profile data:", profileData);
      if (profileImage) {
        console.log("New profile image file:", profileImage);
      }
    }
    setIsEditing(!isEditing);
  };

  const initials = profileData.username
    .split("_")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div id="accountPage" className="page-content">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h2>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-2">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mr-6 bg-[#bbf7d0] relative">
            {profileImageUrl ? (
              <>
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
                {isEditing && (
                  <button
                    onClick={handleRemoveImage}
                    className="absolute bottom-1 right-1 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold hover:bg-red-600 transition"
                    title="Remove image"
                    type="button"
                  >
                    ×
                  </button>
                )}
              </>
            ) : (
              <span className="text-3xl font-bold text-[#166534]">{initials}</span>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Mohammed</h3>

            {/* زر تغيير الصورة تحت كلمة Factory Owner */}
            {isEditing && (
              <label
                htmlFor="image-upload"
                className="mt-2 inline-block cursor-pointer text-sm text-[#4ade80] hover:text-[#16a34a] font-semibold"
                title="Change Profile Picture"
              >
                Change Picture
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            ) : (
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.username}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            ) : (
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            ) : (
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.location}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            ) : (
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.phone}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleEditSave}
            className={`px-6 py-2 rounded-lg text-white transition-colors ${
              isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-[#4ade80] hover:bg-[#16a34a]"
            }`}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Profile;
