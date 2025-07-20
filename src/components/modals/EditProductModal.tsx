import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getMaterials } from "@/store/factory/materialsSlice";
import Select from "react-select";

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  product: {
    id: string;
    material_id: number;
    price: string;
    unit: string;
  } | null;
  onSave: (updatedProduct: any) => void;
}

const EditProductModal = ({
  open,
  onOpenChange,
  product,
  onSave,
}: EditProductModalProps) => {
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector((state) => state.materials);

  // المواد المستخدمة
  const usedMaterialIds = useAppSelector((state) =>
    state.pricing.pricings.map((p) => p.material_id)
  );

  const [selectedMaterialId, setSelectedMaterialId] = useState<number | "">("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");

  const [errors, setErrors] = useState({
    materialId: "",
    price: "",
  });

  useEffect(() => {
    if (open) {
      dispatch(getMaterials());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (product) {
      setSelectedMaterialId(product.material_id || "");
      setPrice(product.price || "");
      setUnit(product.unit || "kg");
    }
  }, [product]);

  const validate = () => {
    const newErrors = {
      materialId: selectedMaterialId === "" ? "Product name is required." : "",
      price: price === "" || parseFloat(price) <= 0 ? "Price must be greater than 0." : "",
    };
    setErrors(newErrors);
    return !newErrors.materialId && !newErrors.price;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const updatedProduct = {
      ...product,
      material_id: selectedMaterialId,
      price,
      unit,
    };

    onSave(updatedProduct);
    onOpenChange(false);
  };

  // فلترة المواد المستخدمة مع السماح باستخدام المادة الحالية للمنتج الجاري تعديله
  const filteredMaterials = materials.filter(
    (mat) =>
      !usedMaterialIds.includes(mat.id) || mat.id === product?.material_id
  );

  const materialOptions = filteredMaterials.map((mat) => ({
    value: mat.id,
    label: (
      <div className="flex items-center gap-2">
        <img src={mat.image} alt="" className="w-6 h-6 rounded-full" />
        <span>{mat.name}</span>
      </div>
    ),
  }));

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
            <Select
              options={materialOptions}
              value={materialOptions.find((opt) => opt.value === selectedMaterialId) || null}
              onChange={(option) => setSelectedMaterialId(option?.value || "")}
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: errors.materialId ? "#f87171" : "#d1d5db",
                  boxShadow: "none",
                  borderRadius: "0.5rem",
                  padding: "2px",
                }),
              }}
            />
            {errors.materialId && (
              <p className="text-sm text-red-500 mt-1">{errors.materialId}</p>
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
            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
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
