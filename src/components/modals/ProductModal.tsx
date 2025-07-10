import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ProductModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");

  const [errors, setErrors] = useState({
    name: "",
    price: "",
  });

  const validate = () => {
    const newErrors = {
      name: name.trim() === "" ? "Product name is required." : "",
      price: price === "" || parseFloat(price) <= 0 ? "Price must be greater than 0." : "",
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.price;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // ✅ Submit logic here (e.g. send data to backend)
    console.log({ name, price, unit });

    // reset & close modal
    setName("");
    setPrice("");
    setUnit("kg");
    setErrors({ name: "", price: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-lg p-8 w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
            Add New Product
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]`}
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pricing Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
            >
              <option value="kg">per kilo</option>
              <option value="piece">per piece</option>
            </select>
          </div>

          <DialogFooter className="flex sm:space-x-3 pt-4">
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-[#4ade80] hover:bg-[#16a34a] text-white cursor-pointer"
            >
              Add
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white cursor-pointer"
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

export default ProductModal;
