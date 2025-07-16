import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Delegate {
  id: string;
  name: string;
  phone: string;
  location: string;
  status: string;
  initials: string;
  bg: string;
  text: string;
}

interface EditDelegateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  delegate: Delegate | null;
  onSave: (updatedDelegate: Delegate) => void;
}

const EditDelegateDialog: React.FC<EditDelegateDialogProps> = ({
  open,
  onOpenChange,
  delegate,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (delegate) {
      setName(delegate.name);
      setPhone(delegate.phone);
      setLocation(delegate.location);
      setStatus(delegate.status);
    }
  }, [delegate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegate) return;

    onSave({
      ...delegate,
      name,
      phone,
      location,
      status,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Edit Delegate</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
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
