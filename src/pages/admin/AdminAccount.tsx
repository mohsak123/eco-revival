import { useState, useEffect, type ChangeEvent } from "react";
import DynamicMap from "@/components/DynamicMap";
import { useDispatch, useSelector } from "react-redux";
import { getProfileCompany } from "@/store/authSlice";
import type { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";

const AdminAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [mapEditable, setMapEditable] = useState(false);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [, setApiError] = useState<string | null>(null);

  const { user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const result = await dispatch(getProfileCompany());

      if (!getProfileCompany.fulfilled.match(result)) {
        const errMsg = (result.payload as string) || "Failed to load profile";
        setApiError(errMsg);
        toast.error(errMsg);
      }
    };

    fetchCompanyProfile();
  }, [dispatch]);

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    lat: 0,
    lng: 0,
    location: "",
    record: "",
    url: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        lat: user.lat || 0,
        lng: user.lng || 0,
        location: user.location || "",
        record: user.record || "",
        url: user.url || "",
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
      console.log("Saving company profile:", profileData);
    }
    setIsEditing(!isEditing);
    setMapEditable(false);
  };

  return (
    <div id="accountPage" className="page-content">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Company Profile</h2>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-2">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mr-6 bg-[#bbf7d0] relative">
            {profileData.name && (
              <span className="text-3xl font-bold text-[#166534]">
                {profileData.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{profileData.name}</h3>
            <p className="text-gray-600">Company Account</p>
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
              <p className="bg-gray-50 p-3 rounded-lg">{profileData.username}</p>
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
              <p className="bg-gray-50 p-3 rounded-lg">{profileData.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            ) : (
              <p className="bg-gray-50 p-3 rounded-lg">{profileData.phone}</p>
            )}
          </div>

          {/* Commercial Record */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Commercial Record</label>
            {isEditing ? (
              <input
                type="text"
                name="record"
                value={profileData.record}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            ) : (
              <p className="bg-gray-50 p-3 rounded-lg">{profileData.record}</p>
            )}
          </div>

          {/* Website */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Website</label>
            {isEditing ? (
              <input
                type="text"
                name="url"
                value={profileData.url}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            ) : (
              <p className="bg-gray-50 p-3 rounded-lg">{profileData.url}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location + Map */}
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
              <p className="bg-gray-50 p-3 rounded-lg">{profileData.location}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            ) : (
              <p className="bg-gray-50 p-3 rounded-lg">{profileData.address}</p>
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

export default AdminAccount;
