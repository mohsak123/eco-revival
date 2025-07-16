import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  product: {
    id: string;
    name: string;
    price: string;
    unit: string;
    image?: File | null;
  } | null;
  onSave: (updatedProduct: any) => void;
}

const EditProductModal = ({
  open,
  onOpenChange,
  product,
  onSave,
}: EditProductModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");
  const [image, setImage] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price.replace(/[^\d.]/g, "") || "");
      setUnit(product.unit || "kg");
      setImage(product.image || null);
    }
  }, [product]);

  const validate = () => {
    const newErrors = {
      name: name.trim() === "" ? "Product name is required." : "",
      price: price === "" || parseFloat(price) <= 0 ? "Price must be greater than 0." : "",
      image: image && !image.type.startsWith("image/") ? "Only image files are allowed." : "",
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.price && !newErrors.image;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const updatedProduct = {
      ...product,
      name,
      price,
      unit,
      image,
    };

    onSave(updatedProduct);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-lg p-8 w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
            Edit Product
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
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
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
            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
            />
            {image && <p className="text-sm text-gray-600 mt-1">Selected: {image.name}</p>}
            {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
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
              className="flex-1 bg-[#4ade80] hover:bg-[#16a34a] text-white"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
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

export default EditProductModal;
