import { useState, type ChangeEvent, useEffect } from "react";
import DynamicMap from "@/components/DynamicMap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProfile } from "@/store/authSlice";
import type { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [mapEditable, setMapEditable] = useState(false);
  const [position, setPosition] = useState({ lat: 35.52, lng: 35.8 });
  const [, setApiError] = useState<string | null>(null);

  const { user, loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const getPro = async() => {
      if (role === "user") {
        const resultAction = await dispatch(
          getProfile()
        );

        if (getProfile.fulfilled.match(resultAction)) {
          
        } else {
          const errMsg = (resultAction.payload as string) || "Login failed";
          setApiError(errMsg);
          toast.error(errMsg);
        }
      }
    }

    getPro();
  }, [dispatch, role]);


  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    fullname: "", // 🔥 أضفناه هون
    location: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    lat: 0,
    lng: 0,
  });



  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        fullname: user.fullname || "", // 🔥 أضفناه هون كمان
        location: user.location || "",
        address: user.address || "",
        phone: user.phone || "",
        city: user.city || "",
        state: user.state || "",
        lat: user.lat || 0,
        lng: user.lng || 0,
      });
      setPosition({
        lat: user.lat || 0,
        lng: user.lng || 0,
      });
    }
  }, [user]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePositionChange = (pos: { lat: number; lng: number }) => {
    if (mapEditable) {
      setPosition(pos);
      setProfileData((prev) => ({
        ...prev,
        lat: pos.lat,
        lng: pos.lng,
      }));
    }
  };

  const handleAddressChange = (addr: string) => {
    if (mapEditable) {
      setProfileData((prev) => ({
        ...prev,
        location: addr,
      }));
    }
  };

  const handleEditSave = () => {
    if (isEditing) {
      console.log("Saving profile data:", profileData);
    }
    setIsEditing(!isEditing);
    setMapEditable(false);
  };

  return (
    <div id="accountPage" className="page-content">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h2>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-2">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mr-6 bg-[#bbf7d0] relative">
            {user?.fullname && <span className="text-3xl font-bold text-[#166534]">{user?.fullname?.charAt(0).toUpperCase()}</span>}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{profileData.fullname}</h3>
            {/* تغيير الصورة لو بدك */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Username */}
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

          {/* Email */}
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

          {/* Phone */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location + map */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            {isEditing ? (
              <>
                <div className="flex justify-between items-center mb-1">
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300"
                    disabled={!mapEditable}
                  />
                  <button
                    type="button"
                    onClick={() => setMapEditable((prev) => !prev)}
                    className={`ml-3 px-4 py-2 rounded text-white ${
                      mapEditable ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {mapEditable ? "Confirm" : "Edit"}
                  </button>
                </div>

                <DynamicMap
                  address={profileData.location}
                  initialPosition={position}
                  onPositionChange={handlePositionChange}
                  onAddressChange={handleAddressChange}
                  isEditable={mapEditable}
                />
              </>
            ) : (
              <div className="bg-gray-50 p-3 rounded-lg text-gray-900 space-y-1">
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.location}</p>
              </div>
            )}
          </div>

          {/* Address field جنب الـ Location */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300"
                placeholder="Enter additional address info"
              />
            ) : (
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.address}</p>
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
