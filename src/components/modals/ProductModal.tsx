import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMaterials } from "@/store/factory/materialsSlice";
import { addPricing } from "@/store/factory/pricingSlice";
import Select from "react-select";

interface Material {
  id: number;
  name: string;
  name_en: string;
  image: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onAdd?: (product: any) => void;
  materials: Material[];
}

const ProductModal = ({ open, onOpenChange }: ProductModalProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const { materials } = useAppSelector((state) => state.materials);

  useEffect(() => {
    if (open) {
      dispatch(getMaterials());
    }
  }, [open, dispatch]);

  const [selectedMaterialId, setSelectedMaterialId] = useState<number | "">("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");
  const [errors, setErrors] = useState({
    materialId: "",
    price: "",
  });

  const validate = () => {
    const newErrors = {
      materialId: selectedMaterialId === "" ? t("Product name is required.") : "",
      price: price === "" || parseFloat(price) <= 0 ? t("Price must be greater than 0.") : "",
    };
    setErrors(newErrors);
    return !newErrors.materialId && !newErrors.price;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await dispatch(
        addPricing({
          material_id: selectedMaterialId as number,
          price: parseFloat(price),
          unit,
        })
      ).unwrap();

      setSelectedMaterialId("");
      setPrice("");
      setUnit("kg");
      setErrors({ materialId: "", price: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to add pricing", error);
    }
  };

  const materialOptions = materials.map((mat) => ({
    value: mat.id,
    label: (
      <div className="flex items-center gap-2">
        <img src={mat.image} alt="" className="w-6 h-6 rounded-full" />
        <span>{i18n.language === "en" && mat.name_en ? mat.name_en : mat.name}</span>
      </div>
    ),
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-lg p-8 w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
            {t("Add New Product")}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("Product Name")}
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
              {t("Price")}
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
              {t("Pricing Unit")}
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
            >
              <option value="kg">{t("per kilo")}</option>
              <option value="piece">{t("per piece")}</option>
            </select>
          </div>

          <DialogFooter className="flex sm:space-x-3 pt-4">
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-[#4ade80] hover:bg-[#16a34a] text-white"
            >
              {t("Add")}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
              onClick={() => onOpenChange(false)}
            >
              {t("Cancel")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
