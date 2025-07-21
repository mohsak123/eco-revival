import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DynamicMap from "@/components/DynamicMap";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { createDelegate } from "@/store/factory/delegateSlice";
import toast from "react-hot-toast";  // استيراد التوست

const DelegateModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    fullname: "",
    number: "",
    location: "",
    address: "",
    lat: 35.52,
    lng: 35.8,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePositionChange = (pos: { lat: number; lng: number }) => {
    setFormData((prev) => ({
      ...prev,
      lat: pos.lat,
      lng: pos.lng,
    }));
  };

  const handleAddressChange = (newAddress: string) => {
    setFormData((prev) => ({
      ...prev,
      location: newAddress,
    }));
  };

  const handleSubmit = async () => {
    const result = await dispatch(createDelegate(formData));
    if (createDelegate.fulfilled.match(result)) {
      toast.success("Delegate created successfully");
      onClose();
    } else {
      toast.error("Failed to create delegate");
      console.error("Delegate creation failed:", result.payload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg p-8 w-full h-[80vh] max-w-md max-h-screen overflow-y-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Add New Delegate
        </h3>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
              required
            />
          </div>

          {/* 🗺️ Dynamic Map Component */}
          <DynamicMap
            initialPosition={{ lat: formData.lat, lng: formData.lng }}
            address={formData.location}
            onPositionChange={handlePositionChange}
            onAddressChange={handleAddressChange}
            isEditable={true}
          />

          {/* Confirm + Cancel */}
          <div className="flex space-x-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-[#4ade80] hover:bg-[#16a34a] text-white cursor-pointer"
            >
              Confirm
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DelegateModal;
