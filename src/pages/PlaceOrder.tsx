import React, { useState, useEffect } from "react";

const materialsData = [
  { id: "Paper", label: "Paper", price: 2.5 },
  { id: "Cardboard", label: "Cardboard", price: 3 },
  { id: "Plastic Bottles", label: "Plastic Bottles", price: 4 },
];

const PlaceOrder = () => {
  const [selectedMaterials, setSelectedMaterials] = useState<{ [key: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // handle checkbox toggle
  const toggleMaterial = (id: string) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    // reset quantity if unchecked
    if (selectedMaterials[id]) {
      setQuantities((prev) => ({ ...prev, [id]: 0 }));
    }
  };

  // handle quantity change
  const handleQuantityChange = (id: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // calculate total price whenever quantities or selectedMaterials change
  useEffect(() => {
    let total = 0;
    for (const material of materialsData) {
      if (selectedMaterials[material.id]) {
        total += (quantities[material.id] || 0) * material.price;
      }
    }
    setEstimatedPrice(total);
  }, [selectedMaterials, quantities]);

  // handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا ممكن تبعت البيانات للباكند أو تعرض رسالة تأكيد
    alert("Order confirmed! Total price: $" + estimatedPrice.toFixed(2));
  };

  return (
    <div id="orderForm" className="fade-in">
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-eco-green-dark hover:underline"
      >
        ← Back to Factory
      </button>

      <h2 className="text-2xl font-bold text-eco-gray mb-6">Place Your Order</h2>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form id="orderFormData" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Select Materials to Sell</label>
            <div className="space-y-2">
              {materialsData.map((material) => (
                <div key={material.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={"material_" + material.id}
                        checked={!!selectedMaterials[material.id]}
                        onChange={() => toggleMaterial(material.id)}
                        className="material-checkbox"
                        data-price={material.price}
                      />
                      <label htmlFor={"material_" + material.id} className="text-eco-gray font-medium">
                        {material.label} - ${material.price}/kg
                      </label>
                    </div>
                  </div>

                  {selectedMaterials[material.id] && (
                    <div id={"quantity_" + material.id} className="mt-3">
                      <label className="block text-sm text-eco-gray mb-1">Quantity (kg)</label>
                      <input
                        type="number"
                        id={"qty_" + material.id}
                        min={1}
                        value={quantities[material.id] || ""}
                        onChange={(e) => handleQuantityChange(material.id, Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent material-quantity"
                        data-material={material.id}
                        data-price={material.price}
                        required={selectedMaterials[material.id]}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-eco-gray font-medium mb-2">Current Location</label>
            <input
              type="text"
              id="orderLocation"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-eco-gray font-medium mb-2">Preferred Pickup Date</label>
            <input
              type="date"
              id="orderDate"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
              required
              min={new Date().toISOString().split("T")[0]} // اليوم او بعده
            />
          </div>

          <div>
            <label className="block text-eco-gray font-medium mb-2">Preferred Pickup Time</label>
            <select
              id="orderTime"
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
