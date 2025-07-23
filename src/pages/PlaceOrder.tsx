import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getFactories } from "@/store/user/factorySlice";
import { addOrder, resetOrderState } from "@/store/user/orderSlice";
import type { AppDispatch, RootState } from "@/store/store";

import DynamicMap from "@/components/DynamicMap";
import toast from "react-hot-toast";

const schema = z
  .object({
    materials: z.record(z.string(), z.boolean()),
    quantities: z.record(z.string(), z.number().min(1).optional()),
    location: z.string().min(1, "Current Location is required"),
    address: z.string().min(1, "Address is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    comments: z.string().optional(),
  })
  .refine(
    (data) =>
      Object.entries(data.materials).every(([material, checked]) => {
        if (checked) {
          const qty = data.quantities[material];
          return typeof qty === "number" && qty >= 1;
        }
        return true;
      }),
    {
      message: "Please enter quantity for each selected material",
      path: ["quantities"],
    }
  );

type FormSchema = z.infer<typeof schema>;

export default function PlaceOrder() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const { factory, loading } = useSelector((state: RootState) => state.factory);
  const [selectedFactory, setSelectedFactory] = useState<typeof factory[0] | null>(null);
  const { loadingOrder, success, error } = useSelector((state: RootState) => state.order);

  const navigate = useNavigate();

  if (error) {
    toast.error(error);
  }

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      materials: {},
      quantities: {},
      location: "",
      address: "",
      date: "",
      time: "",
      comments: "",
    },
  });

  const selectedMaterials = useWatch({ control, name: "materials" });
  const selectedQuantities = useWatch({ control, name: "quantities" });
  const watchedLocation = watch("location");

  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  useEffect(() => {
    if (factory.length === 0) dispatch(getFactories());
  }, [dispatch, factory.length]);

  useEffect(() => {
    if (!loading && factory.length > 0) {
      const found = factory.find((f) => f.id === Number(id));
      setSelectedFactory(found || null);
    }
  }, [factory, id, loading]);

  useEffect(() => {
    if (!selectedFactory) {
      setEstimatedPrice(0);
      return;
    }
    let total = 0;

    for (const [materialName, checked] of Object.entries(selectedMaterials || {})) {
      if (checked) {
        const qty = selectedQuantities?.[materialName] || 0;
        const pricing = selectedFactory.Pricings.find(
          (p) => p.Material.name.toLowerCase() === materialName.toLowerCase()
        );
        if (pricing) {
          total += qty * pricing.price;
        }
      }
    }

    setEstimatedPrice(total);
  }, [selectedMaterials, selectedQuantities, selectedFactory]);

  const handleAddressChangeFromMap = (newAddress: string) => {
    if (isEditingLocation) {
      setValue("location", newAddress, { shouldValidate: true, shouldDirty: true });
    }
  };

  const initialPosition = selectedFactory
    ? { lat: Number(selectedFactory.lat), lng: Number(selectedFactory.lng) }
    : { lat: 31.963158, lng: 35.930359 };



  useEffect(() => {
    if (success) {
      reset();
      dispatch(resetOrderState());
      navigate("/orders");
    }
  }, [success, reset, dispatch, navigate]);


  const onSubmit = (data: FormSchema) => {
    if (!selectedFactory) return;

    const { date, time, address, location, materials, quantities, comments } = data;

    const materialArray = Object.entries(materials)
      .filter(([_, checked]) => checked)
      .map(([materialName]) => {
        const qty = quantities[materialName];
        const matched = selectedFactory.Pricings.find(
          (p) => p.Material.name.toLowerCase() === materialName.toLowerCase()
        );
        return matched && qty
          ? {
              material_id: matched.Material.id,
              quantity: qty,
            }
          : null;
      })
      .filter(Boolean) as { material_id: number; quantity: number }[];

    const orderPayload = {
      required_date: `${date} ${time}`,
      comments: comments || "",
      lng: coordinates.lng,
      lat: coordinates.lat,
      location,
      address,
      factory_id: selectedFactory.id,
      materials: materialArray,
    };

    console.log(orderPayload)

    dispatch(addOrder(orderPayload));
  };

  const materialsList = selectedFactory
    ? selectedFactory.Pricings.map((p) => ({
        id: p.Material.name,
        label: p.Material.name,
        price: p.price,
      }))
    : [];

  if (loading || !selectedFactory) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="fade-in mx-auto">
      <button
        onClick={() => history.back()}
        className="mb-4 text-[#4ade80] hover:underline font-semibold"
      >
        ← Back to Factory
      </button>

      <h2 className="text-2xl font-bold text-[#6b7280] mb-6">Place Your Order</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-md p-6">

        <section>
          <label className="block text-[#6b7280] font-medium mb-2">Select Materials to Sell</label>
          <div className="space-y-2">
            {materialsList.map((material) => (
              <div key={material.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`material_${material.id}`}
                      {...register(`materials.${material.id}`)}
                      className="cursor-pointer"
                    />
                    <label htmlFor={`material_${material.id}`} className="text-[#6b7280] font-medium cursor-pointer">
                      {material.label} - ${material.price.toFixed(2)}/kg
                    </label>
                  </div>
                </div>

                {selectedMaterials?.[material.id] && (
                  <div className="mt-3">
                    <label htmlFor={`quantity_${material.id}`} className="block text-sm text-[#6b7280] mb-1">
                      Quantity (kg)
                    </label>
                    <input
                      id={`quantity_${material.id}`}
                      type="number"
                      min={1}
                      {...register(`quantities.${material.id}`, { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      placeholder="Enter quantity"
                    />
                    {errors.quantities?.[material.id] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quantities[material.id]?.message || "Quantity is required and must be ≥ 1"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            {typeof errors.materials?.message === "string" && (
              <p className="text-red-500 text-sm mt-1">{errors.materials.message}</p>
            )}
          </div>
        </section>

        <section>
          <label className="block text-[#6b7280] font-medium mb-2">Current Location</label>
          <input
            type="text"
            {...register("location")}
            readOnly={!isEditingLocation}
            className={`w-full px-4 py-3 rounded-lg border ${
              isEditingLocation
                ? "border-eco-green focus:ring-2 focus:ring-eco-green focus:border-transparent"
                : "border-gray-300 bg-gray-100"
            }`}
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

        <DynamicMap
          initialPosition={initialPosition}
          address={watchedLocation}
          onPositionChange={(pos) => setCoordinates(pos)}
          onAddressChange={handleAddressChangeFromMap}
          isEditable={isEditingLocation}
        />

        <section>
          <label className="block text-[#6b7280] font-medium mb-2">Address</label>
          <input
            type="text"
            {...register("address")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            placeholder="Your address here"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </section>

        <section>
          <label className="block text-[#6b7280] font-medium mb-2">Preferred Pickup Date</label>
          <input
            type="date"
            {...register("date")}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </section>

        <section>
          <label className="block text-[#6b7280] font-medium mb-2">Preferred Pickup Time</label>
          <select
            {...register("time")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>
              Select time
            </option>
            <option value="09:00">9:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">2:00 PM</option>
            <option value="16:00">4:00 PM</option>
          </select>
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
        </section>

        <section className="bg-[#86efac33] bg-opacity-20 p-4 rounded-lg">
          <p className="text-[#6b7280] font-medium">
            Estimated Total Price:{" "}
            <span className="text-[#4ade80] font-bold">${estimatedPrice.toFixed(2)}</span>
          </p>
        </section>

        <section>
          <label className="block text-[#6b7280] font-medium mb-2">Comments (Optional)</label>
          <textarea
            {...register("comments")}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac33] focus:border-transparent"
            placeholder="Any additional notes or comments"
          />
        </section>

        <button
          type="submit"
          className="w-full hover:bg-[#4ade80] bg-[#86efac] cursor-pointer text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
