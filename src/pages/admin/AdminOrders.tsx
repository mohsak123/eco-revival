import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import OrdersModal from "@/components/modals/OrdersModal";

const AdminOrders = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const orders = [
    {
      id: "1001",
      material: "150 kg Recycled Paper",
      price: "$22.50",
      location: "123 Green Street, Eco City",
      status: "Pending",
    },
    {
      id: "1002",
      material: "200 kg Plastic Bottles",
      price: "$50.00",
      location: "456 Recycle Ave, Green Town",
      status: "Processing",
      delegate: "John Smith",
    },
  ];

  return (
    <div id="ordersPage" className="page-content">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>

      <div className="space-y-4" id="ordersList">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Order #{order.id}
                </h3>
                <p className="text-gray-600">Quantity: {order.material}</p>
                <p className="text-gray-600">Total Price: {order.price}</p>
                <p className="text-gray-600">Pickup Location: {order.location}</p>
                {order.delegate && (
                  <p className="text-gray-600">
                    Assigned Delegate: {order.delegate}
                  </p>
                )}
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                {order.status}
              </span>
            </div>

            <div className="flex space-x-3">
              {order.status === "Pending" && (
                <Button
                  onClick={() => {
                    setSelectedOrder(order.id);
                    setModalOpen(true);
                  }}
                  className="bg-[#4ade80] hover:bg-[#16a34a] text-white cursor-pointer"
                >
                  Approve
                </Button>
              )}
              {order.status === "Processing" && (
                <Button
                  onClick={() => {
                    setSelectedOrder(order.id);
                    setModalOpen(true);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white cursor-pointer"
                >
                  Change Delegate
                </Button>
              )}
              {order.status === "Pending" && (
                <Button className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
                  Cancel
                </Button>
              )}
              <Button className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                Delivered
              </Button>
            </div>
          </div>
        ))}
      </div>

      <OrdersModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="mt-8 text-center">
        <div className="flex items-center justify-center">
          <span className="text-gray-600 mr-3">Powered by</span>
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded mr-2 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-bold text-gray-800">HoudiX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
