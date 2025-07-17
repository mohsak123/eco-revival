import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DynamicMap from "@/components/DynamicMap"; // تأكد أنك مستدعيه من المسار الصحيح

type Material = {
  id: string;
  label: string;
  price: number;
};

const materialsData: Material[] = [
  { id: "Paper", label: "Paper", price: 2.5 },
  { id: "Cardboard", label: "Cardboard", price: 3 },
  { id: "Plastic Bottles", label: "Plastic Bottles", price: 4 },
];

type Order = {
  id: number;
  materials: string;
  quantity: string;
  date: string;
  price: string;
  location?: string;
  time?: string;
};

type EditOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialOrder: Order | null;
  onSave: (updatedOrder: Order) => void;
};

const EditOrderDialog: React.FC<EditOrderDialogProps> = ({
  open,
  onOpenChange,
  initialOrder,
  onSave,
}) => {
  const [selectedMaterials, setSelectedMaterials] = useState<{ [key: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [position, setPosition] = useState({ lat: 35.52, lng: 35.8 });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (initialOrder) {
      const selected: { [key: string]: boolean } = {};
      const qty: { [key: string]: number } = {};
      const materials = initialOrder.materials.split(",").map((m) => m.trim());
      const quantityValues = initialOrder.quantity.split(",").map((q) => parseFloat(q.trim()));

      materials.forEach((mat, idx) => {
        selected[mat] = true;
        qty[mat] = quantityValues[idx] || 1;
      });

      setSelectedMaterials(selected);
      setQuantities(qty);
      setAddress(initialOrder.location || "");
      setDate(initialOrder.date || "");
      setTime(initialOrder.time || "");
    }
  }, [initialOrder]);

  useEffect(() => {
    let total = 0;
    for (const mat of materialsData) {
      if (selectedMaterials[mat.id]) {
        total += (quantities[mat.id] || 0) * mat.price;
      }
    }
    setEstimatedPrice(total);
  }, [selectedMaterials, quantities]);

  const toggleMaterial = (id: string) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (selectedMaterials[id]) {
      setQuantities((prev) => ({ ...prev, [id]: 0 }));
    }
  };

  const handleQuantityChange = (id: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = () => {
    if (!initialOrder) return;

    const selectedMatLabels = Object.keys(selectedMaterials).filter((id) => selectedMaterials[id]);
    const qtyArray = selectedMatLabels.map((id) => `${quantities[id] || 0} kg`);
    const price = `$${estimatedPrice.toFixed(2)}`;

    const updatedOrder: Order = {
      ...initialOrder,
      materials: selectedMatLabels.join(", "),
      quantity: qtyArray.join(", "),
      price,
      location: address,
      date,
      time,
    };

    onSave(updatedOrder);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Order #{initialOrder?.id}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          {/* المواد */}
          <div>
            <label className="block font-medium mb-1">Materials</label>
            <div className="space-y-2">
              {materialsData.map((material) => (
                <div key={material.id} className="border p-3 rounded-lg">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!selectedMaterials[material.id]}
                      onChange={() => toggleMaterial(material.id)}
                    />
                    <span>
                      {material.label} - ${material.price}/kg
                    </span>
                  </label>

                  {selectedMaterials[material.id] && (
                    <div className="mt-2">
                      <label className="block text-sm">Quantity (kg)</label>
                      <input
                        type="number"
                        min={1}
                        value={quantities[material.id] || ""}
                        onChange={(e) =>
                          handleQuantityChange(material.id, Number(e.target.value))
                        }
                        className="w-full border px-3 py-2 rounded mt-1"
                        required
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* الموقع */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-medium">Location on Map</label>
              <button
                type="button"
                onClick={() => setIsEditable((prev) => !prev)}
                className={`text-sm font-medium px-3 py-1 rounded bg-[#4ade80] hover:bg-[#16a34a] cursor-pointer text-white`}
              >
                {isEditable ? "Confirm" : "Edit"}
              </button>
            </div>

            {/* العنوان */}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-3"
              disabled={!isEditable}
            />

            {/* الخريطة */}
            <DynamicMap
              address={address}
              initialPosition={position}
              onPositionChange={(pos) => {
                if (isEditable) setPosition(pos);
              }}
              onAddressChange={(addr) => {
                if (isEditable) setAddress(addr);
              }}
              isEditable={isEditable}
            />
          </div>

          {/* التاريخ */}
          <div>
            <label className="block font-medium mb-1">Pickup Date</label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* الوقت */}
          <div>
            <label className="block font-medium mb-1">Pickup Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select time</option>
              <option value="09:00">9:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>

          {/* السعر */}
          <div className="bg-green-100 text-green-700 p-3 rounded text-sm">
            Estimated Total Price: <strong>${estimatedPrice.toFixed(2)}</strong>
          </div>

          {/* زر الحفظ */}
          <div className="text-right pt-2">
            <Button type="submit" className="bg-[#4ade80] hover:bg-[#16a34a] cursor-pointer">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderDialog;
