import React, { useState, useEffect } from "react";
import DynamicMap from "@/components/DynamicMap";

const materialsData = [
  { id: "Paper", label: "ورق", price: 2.5 },
  { id: "Cardboard", label: "كرتون", price: 3 },
  { id: "Plastic Bottles", label: "عبوات بلاستيكية", price: 4 },
];

const PlaceOrder = () => {
  // حالات الحقول
  const [selectedMaterials, setSelectedMaterials] = useState<{ [key: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [locationText, setLocationText] = useState("Latakia, Syria");
  const [store1Pos, setStore1Pos] = useState({ lat: 35.52, lng: 35.8 });
  const [address, setAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  // حالة السعر المحسوب
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // حالة الأخطاء
  const [errors, setErrors] = useState({
    materials: "",
    quantities: "",
    locationText: "",
    address: "",
    pickupDate: "",
    pickupTime: "",
  });

  // حالة تعديل الموقع
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  useEffect(() => {
    let total = 0;
    for (const material of materialsData) {
      if (selectedMaterials[material.id]) {
        total += (quantities[material.id] || 0) * material.price;
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

  // دالة التحقق
  const validate = () => {
    const newErrors = {
      materials: "",
      quantities: "",
      locationText: "",
      address: "",
      pickupDate: "",
      pickupTime: "",
    };

    if (!Object.values(selectedMaterials).some(Boolean)) {
      newErrors.materials = "Please select at least one material.";
    }

    for (const id of Object.keys(selectedMaterials)) {
      if (selectedMaterials[id]) {
        if (!quantities[id] || quantities[id] <= 0) {
          newErrors.quantities = "Please enter valid quantity for all selected materials.";
          break;
        }
      }
    }

    if (locationText.trim() === "") {
      newErrors.locationText = "Please enter a valid location.";
    }

    if (address.trim() === "") {
      newErrors.address = "Please enter your full address.";
    } else if (address.length > 256) {
      newErrors.address = "Address must not exceed 256 characters.";
    }

    if (pickupDate === "") {
      newErrors.pickupDate = "Please select a pickup date.";
    }

    if (pickupTime === "") {
      newErrors.pickupTime = "Please select a pickup time.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Order confirmed! Total price: $" + estimatedPrice.toFixed(2));
    console.log("Coordinates:", store1Pos);
    console.log("Address:", address);
  };

  // عند الضغط على زر Edit لتعديل الموقع
  const handleEditLocation = () => {
    setIsEditingLocation(true);
  };

  // عند الضغط على زر Confirm بعد التعديل
  const handleConfirmLocation = () => {
    // ممكن تضيف تحقق هنا اذا بدك قبل تأكيد التغييرات على الموقع
    setIsEditingLocation(false);
  };

  return (
    <div id="orderForm" className="fade-in">
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-[#4ade80] cursor-pointer hover:underline"
      >
        ← Back to Factory
      </button>

      <h2 className="text-2xl font-bold text-eco-gray mb-6">Place Your Order</h2>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form id="orderFormData" className="space-y-6" onSubmit={handleSubmit}>
          {/* المواد */}
          <div>
            <label className="block text-eco-gray font-medium mb-2">Select Materials to Sell</label>
            {errors.materials && <p className="text-red-500 text-sm mb-2">{errors.materials}</p>}
            <div className="space-y-2">
              {materialsData.map((material) => (
                <div key={material.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`material_${material.id}`}
                        name={`materials[${material.id}]`}
                        checked={!!selectedMaterials[material.id]}
                        onChange={() => toggleMaterial(material.id)}
                        className="material-checkbox"
                        data-price={material.price}
                      />
                      <label htmlFor={`material_${material.id}`} className="text-eco-gray font-medium">
                        {material.label} - ${material.price}/kg
                      </label>
                    </div>
                  </div>

                  {selectedMaterials[material.id] && (
                    <div className="mt-3">
                      <label className="block text-sm text-eco-gray mb-1">Quantity (kg)</label>
                      <input
                        type="number"
                        id={`qty_${material.id}`}
                        name={`quantities[${material.id}]`}
                        min={1}
                        value={quantities[material.id] || ""}
                        onChange={(e) => handleQuantityChange(material.id, Number(e.target.value))}
                        className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent ${
                          errors.quantities ? "border-red-500" : "border-gray-300"
                        }`}
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
            <label className="block text-eco-gray font-medium mb-2">Current Location</label>
            {errors.locationText && <p className="text-red-500 text-sm mb-1">{errors.locationText}</p>}
            <input
              type="text"
              name="location"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              placeholder="e.g., Latakia, Syria"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
              required
              disabled={!isEditingLocation} // تعطيل الحقل لو ما عم يعدل
            />
            <DynamicMap
              address={locationText}
              initialPosition={store1Pos}
              onPositionChange={(pos) => {
                if (isEditingLocation) setStore1Pos(pos);
              }}
              onAddressChange={(newAddress) => {
                if (isEditingLocation) setLocationText(newAddress);
              }}
              isEditable={isEditingLocation} // <== هنا ترسل القيمة
            />

            {/* أزرار تعديل الموقع وتأكيد التعديل */}
            {!isEditingLocation ? (
              <button
                type="button"
                onClick={handleEditLocation}
                className="mt-3 bg-[#4ade80] hover:bg-[#16a34a] text-white px-4 py-2 rounded"
              >
                Edit Location
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmLocation}
                className="mt-3 bg-[#22c55e] hover:bg-[#15803d] text-white px-4 py-2 rounded"
              >
                Confirm Location
              </button>
            )}
          </div>

          {/* العنوان */}
          <div>
            <label className="block text-eco-gray font-medium mb-2">Full Address</label>
            {errors.address && <p className="text-red-500 text-sm mb-1">{errors.address}</p>}
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              maxLength={256}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
              required
            />
          </div>

          {/* تاريخ الاستلام */}
          <div>
            <label className="block text-eco-gray font-medium mb-2">Preferred Pickup Date</label>
            {errors.pickupDate && <p className="text-red-500 text-sm mb-1">{errors.pickupDate}</p>}
            <input
              type="date"
              name="pickupDate"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* وقت الاستلام */}
          <div>
            <label className="block text-eco-gray font-medium mb-2">Preferred Pickup Time</label>
            {errors.pickupTime && <p className="text-red-500 text-sm mb-1">{errors.pickupTime}</p>}
            <select
              name="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
              required
            >
              <option value="">Select time</option>
              <option value="09:00">9:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>

          {/* السعر المقدر */}
          <div className="bg-eco-green bg-opacity-20 p-4 rounded-lg">
            <p className="text-eco-gray font-medium">
              Estimated Total Price:{" "}
              <span className="text-eco-green-dark font-bold">${estimatedPrice.toFixed(2)}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#86efac] hover:bg-[#4ade80] cursor-pointer text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
