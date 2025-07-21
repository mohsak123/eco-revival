import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks"; 
import { editDelegate } from "@/store/factory/delegateSlice";
import DynamicMap from "@/components/DynamicMap";
import toast from "react-hot-toast"; // استيراد التوست

interface Delegate {
  id: number;
  fullname: string;
  number: string;
  location: string;
  address: string;
  lat: number;
  lng: number;
  factory_id: number;
  updatedAt: string;
  createdAt: string;
}

interface EditDelegateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  delegate: Delegate | null;
}

const EditDelegateDialog: React.FC<EditDelegateDialogProps> = ({
  open,
  onOpenChange,
  delegate,
}) => {
  const dispatch = useAppDispatch();

  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(35.52);
  const [lng, setLng] = useState(35.8);

  useEffect(() => {
    if (delegate) {
      setFullname(delegate.fullname);
      setNumber(delegate.number);
      setLocation(delegate.location);
      setAddress(delegate.address);
      setLat(delegate.lat);
      setLng(delegate.lng);
    }
  }, [delegate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegate) return;

    const resultAction = await dispatch(
      editDelegate({
        id: delegate.id,
        data: {
          fullname,
          number,
          location,
          address,
          lat,
          lng,
        },
      })
    );

    if (editDelegate.fulfilled.match(resultAction)) {
      toast.success("Delegate updated successfully");  // نجاح العملية
      onOpenChange(false);
    } else {
      toast.error("Failed to update delegate");       // فشل العملية
    }
  };

  // Handlers for DynamicMap changes
  const handlePositionChange = (pos: { lat: number; lng: number }) => {
    setLat(pos.lat);
    setLng(pos.lng);
  };

  const handleAddressChange = (newAddress: string) => {
    setLocation(newAddress);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Delegate</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Latitude</label>
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(Number(e.target.value))}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Longitude</label>
              <input
                type="number"
                value={lng}
                onChange={(e) => setLng(Number(e.target.value))}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <DynamicMap
            initialPosition={{ lat: Number(lat), lng: Number(lng) }}
            address={location}
            onPositionChange={handlePositionChange}
            onAddressChange={handleAddressChange}
            isEditable={true}
          />

          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDelegateDialog;
