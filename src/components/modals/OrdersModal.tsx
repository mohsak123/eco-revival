import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Delegate {
  value: string;
  name: string;
  region: string;
}

interface OrdersModalProps {
  open: boolean;
  onClose: () => void;
  initialDelegate?: string | null;
  orderStatus?: string; // أضفتها هون
  onConfirm: (newDelegate: string) => void; // أضفتها هون
}

const delegates: Delegate[] = [
  { value: "john", name: "John Smith", region: "Downtown District" },
  { value: "maria", name: "Maria Johnson", region: "North Side" },
];

const OrdersModal = ({
  open,
  onClose,
  initialDelegate,
  orderStatus,
  onConfirm,
}: OrdersModalProps) => {
  const [selectedDelegate, setSelectedDelegate] = useState<string>("");

  useEffect(() => {
    if (open) {
      setSelectedDelegate(orderStatus === "Pending" ? "" : (initialDelegate || ""));
    }
  }, [open, initialDelegate, orderStatus]);

  const handleConfirm = () => {
    onConfirm(selectedDelegate);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg p-8 w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Select Delegate
        </h3>
        <div className="space-y-3 mb-6">
          {delegates.map((delegate) => (
            <label
              key={delegate.value}
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="delegate"
                value={delegate.value}
                checked={selectedDelegate === delegate.value}
                onChange={() => setSelectedDelegate(delegate.value)}
                className="mr-3"
              />
              <div>
                <p className="font-medium">{delegate.name}</p>
                <p className="text-sm text-gray-600">{delegate.region}</p>
              </div>
            </label>
          ))}
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-[#4ade80] hover:bg-[#16a34a] text-white cursor-pointer"
            disabled={!selectedDelegate}>
            Confirm
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersModal;
