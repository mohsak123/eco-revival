import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type OrderResponse } from "@/store/user/orderSlice";
import DynamicMap from "@/components/DynamicMap";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const schema = z.object({
  materials: z.record(z.string(), z.boolean()),
  quantities: z.record(z.string(), z.number().min(0.1, "Quantity must be greater than 0").optional()),
  location: z.string().min(1, "Location from map is required"),
  address: z.string().min(1, "Detailed address is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  comments: z.string().optional(),
}).refine(
  (data) => Object.entries(data.materials).every(([materialId, checked]) => {
    if (checked) {
      const qty = data.quantities[materialId];
      return typeof qty === "number" && qty >= 0.1;
    }
    return true;
  }),
  {
    message: "Please enter a valid quantity for each selected material",
    path: ["quantities"],
  }
);

type FormSchema = z.infer<typeof schema>;

type EditOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialOrder: OrderResponse | null;
  onSave: (updatedData: any) => Promise<void>;
};

const EditOrderDialog: React.FC<EditOrderDialogProps> = ({ open, onOpenChange, initialOrder, onSave }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableMaterials = React.useMemo(() => initialOrder?.Factory.Pricings || [], [initialOrder]);

  // استخدم useWatch بدلاً من watch
  const watchedMaterials = useWatch({ control, name: "materials" });
  const watchedQuantities = useWatch({ control, name: "quantities" });
  const watchedLocation = useWatch({ control, name: "location" });

  useEffect(() => {
    if (initialOrder) {
      const materialsCheckboxes: Record<string, boolean> = {};
      const quantitiesValues: Record<string, number> = {};

      availableMaterials.forEach(p => {
        materialsCheckboxes[p.material_id.toString()] = false;
      });

      initialOrder.Order_Materials.forEach(item => {
        materialsCheckboxes[item.material_id.toString()] = true;
        quantitiesValues[item.material_id.toString()] = item.quantity;
      });

      const dateObj = new Date(initialOrder.required_date);
      const timeStr = dateObj.toTimeString().split(" ")[0].substring(0, 5);
      const dateStr = dateObj.toISOString().split("T")[0];

      reset({
        materials: materialsCheckboxes,
        quantities: quantitiesValues,
        location: initialOrder.location,
        address: initialOrder.address,
        date: dateStr,
        time: timeStr,
        comments: initialOrder.comments || "",
      });

      setCoordinates({
        lat: parseFloat(initialOrder.lat),
        lng: parseFloat(initialOrder.lng),
      });

      setIsEditingLocation(false);
    }
  }, [initialOrder, reset, availableMaterials]);

  // حدث السعر كل مرة تتغير المواد أو الكميات
  useEffect(() => {
    if (!availableMaterials.length || !watchedMaterials || !watchedQuantities) {
      setEstimatedPrice(0);
      return;
    }
    let total = 0;
    for (const [materialId, checked] of Object.entries(watchedMaterials)) {
      if (checked) {
        const pricingInfo = availableMaterials.find(p => p.material_id.toString() === materialId);
        if (pricingInfo) {
          const quantity = watchedQuantities?.[materialId] || 0;
          total += quantity * pricingInfo.price;
        }
      }
    }
    setEstimatedPrice(total);
  }, [watchedMaterials, watchedQuantities, availableMaterials]);

  const onSubmit = async (data: FormSchema) => {
    if (!initialOrder) return;

    setIsSubmitting(true);

    const { date, time, address, location, materials, quantities, comments } = data;

    const materialsPayload = Object.entries(materials)
      .filter(([, checked]) => checked)
      .map(([materialId]) => ({
        material_id: Number(materialId),
        quantity: quantities[materialId] || 0,
      }));

    const updatedData = {
      required_date: `${date} ${time}:00`,
      comments: comments || "",
      lng: coordinates.lng,
      lat: coordinates.lat,
      location,
      address,
      materials: materialsPayload,
      factory_id: initialOrder.factory_id,
    };

    try {
      await onSave(updatedData);
      onOpenChange(false);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressChangeFromMap = (newAddress: string) => {
    setValue("location", newAddress, { shouldValidate: true, shouldDirty: true });
  };

  if (!initialOrder) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[90vh] overflow-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-[#6b7280]">Edit Order #{initialOrder.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          <section>
            <label className="block text-[#6b7280] font-medium mb-2">Materials</label>
            <div className="space-y-2">
              {availableMaterials.map((p) => (
                <div key={p.material_id} className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id={`material_${p.material_id}`}
                      {...register(`materials.${p.material_id}`)}
                      className="cursor-pointer h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                    />
                    <span className="text-[#6b7280] font-medium">
                      {p.Material.name} - {p.price} L.S/{p.unit}
                    </span>
                  </label>
                  {watchedMaterials?.[p.material_id.toString()] && (
                    <div className="mt-3">
                      <input
                        type="number"
                        min={0.1}
                        step="any"
                        {...register(`quantities.${p.material_id}`, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        placeholder="Enter Quantity"
                      />
                      {errors.quantities?.[p.material_id] && (
                        <p className="text-red-500 text-sm mt-1">{errors.quantities[p.material_id]?.message}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {errors.quantities && <p className="text-red-500 text-sm mt-1">{errors.quantities.message}</p>}
            </div>
          </section>

          <section>
            <label className="block text-[#6b7280] font-medium mb-2">Pickup Location</label>
            <div className="h-64 w-full rounded-lg overflow-hidden mb-3">
              {coordinates.lat !== 0 && (
                <DynamicMap
                  initialPosition={coordinates}
                  address={watchedLocation}
                  onPositionChange={setCoordinates}
                  onAddressChange={handleAddressChangeFromMap}
                  isEditable={isEditingLocation}
                />
              )}
            </div>
            <input
              type="text"
              {...register("location")}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100"
              placeholder="Location from map"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}

            {!isEditingLocation ? (
              <button
                type="button"
                onClick={() => setIsEditingLocation(true)}
                className="mt-3 bg-[#86efac] hover:bg-[#4ade80] text-white px-4 py-2 rounded"
              >
                Edit Location
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingLocation(false)}
                className="mt-3 bg-[#4ade80] hover:bg-[#86efac] text-white px-4 py-2 rounded"
              >
                Confirm Location
              </button>
            )}
          </section>

          <section>
            <label className="block text-[#6b7280] font-medium mb-2">Detailed Address</label>
            <input
              type="text"
              {...register("address")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
              placeholder="Building, Floor..."
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section>
              <label className="block text-[#6b7280] font-medium mb-2">Pickup Date</label>
              <input
                type="date"
                {...register("date")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
            </section>
            <section>
              <label className="block text-[#6b7280] font-medium mb-2">Pickup Time</label>
              <input
                type="time"
                {...register("time")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
            </section>
          </div>

          <section className="bg-[#86efac33] bg-opacity-20 p-4 rounded-lg">
            <p className="text-[#6b7280] font-medium">
              Estimated Total Price:{" "}
              <span className="text-green-600 font-bold">${estimatedPrice.toFixed(2)}</span>
            </p>
          </section>

          <section>
            <label className="block text-[#6b7280] font-medium mb-2">Comments (Optional)</label>
            <textarea
              {...register("comments")}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Any additional notes..."
            />
          </section>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full hover:bg-[#4ade80] bg-[#86efac] cursor-pointer text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : null}
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderDialog;
