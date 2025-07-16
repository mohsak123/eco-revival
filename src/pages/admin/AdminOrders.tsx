import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrdersModal from "@/components/modals/OrdersModal";
import EditDialog from "@/components/modals/EditDialog";
import DeleteConfirmDialog from "@/components/modals/DeleteConfirmDialog"; // استيراد مودال الحذف

interface Order {
  id: string;
  material: string;
  price: string;
  location: string;
  status: string;
  delegate?: string;
  commit?: string;
}

const AdminOrders = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [selectedOrderDelegate, setSelectedOrderDelegate] = useState<string | null>(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<string>("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCommit, setSelectedCommit] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);  // حالة مودال الحذف

  const orders: Order[] = [
    {
      id: "1001",
      material: "150 kg Recycled Paper",
      price: "$22.50",
      location: "123 Green Street, Eco City",
      status: "Pending",
      commit: "",
    },
    {
      id: "1002",
      material: "200 kg Plastic Bottles",
      price: "$50.00",
      location: "456 Recycle Ave, Green Town",
      status: "Processing",
      delegate: "john",
      commit: "Initial commit 2",
    },
  ];

  // تحديث الموزع
  const updateDelegate = (orderId: string, newDelegate: string) => {
    console.log(`Order ${orderId} delegate updated to: ${newDelegate}`);
    setModalOpen(false);
  };

  // تحديث commit
  const updateCommit = (newCommit: string) => {
    console.log("Updated commit:", newCommit);
    setEditModalOpen(false);
  };

  // حذف الطلب
  const deleteOrder = (orderId: string) => {
    console.log(`Order ${orderId} deleted`);
    setDeleteModalOpen(false);
    // هنا تقدر تحدث البيانات بالـ state أو API حسب مشروعك
  };

  // فتح مودال التعديل مع ضبط قيمة commit
  const openEditModalForOrder = (order: Order) => {
    setSelectedOrder(order.id);
    setSelectedCommit(order.commit || "");
    setEditModalOpen(true);
  };

  const openModalForOrder = (order: Order) => {
    setSelectedOrder(order.id);
    setSelectedOrderDelegate(order.delegate || null);
    setSelectedOrderStatus(order.status);
    setModalOpen(true);
  };

  // فتح مودال الحذف مع تعيين الطلب المحدد
  const openDeleteModalForOrder = (order: Order) => {
    setSelectedOrder(order.id);
    setDeleteModalOpen(true);
  };

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
                    Assigned Delegate: {order.delegate === "john" ? "John Smith" : order.delegate === "maria" ? "Maria Johnson" : order.delegate}
                  </p>
                )}
                {order.commit && (
                  <p className="text-gray-600">Commit: {order.commit}</p>
                )}
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                {order.status}
              </span>
            </div>

            <div className="flex space-x-3">
              {order.status === "Pending" && (
                <Button
                  onClick={() => openModalForOrder(order)}
                  className="bg-[#4ade80] hover:bg-[#16a34a] text-white cursor-pointer"
                >
                  Approve
                </Button>
              )}
              {order.status === "Processing" && (
                <Button
                  onClick={() => openModalForOrder(order)}
                  className="bg-gray-500 hover:bg-gray-600 text-white cursor-pointer"
                >
                  Change Delegate
                </Button>
              )}
              {(order.status === "Pending" || order.status === "Complete") && (
                <Button
                  onClick={() => openDeleteModalForOrder(order)} // نفتح مودال الحذف هنا
                  className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                >
                  Cancel
                </Button>
              )}
              {order.status !== "Processing" && (
                <Button
                  onClick={() => openEditModalForOrder(order)}
                  className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <OrdersModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialDelegate={selectedOrderDelegate}
        orderStatus={selectedOrderStatus}
        onConfirm={(newDelegate) => {
          if (selectedOrder) {
            updateDelegate(selectedOrder, newDelegate);
          }
        }}
      />

      <EditDialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        initialCommit={selectedCommit}
        onSave={updateCommit}
      />

      <DeleteConfirmDialog
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={() => {
          if (selectedOrder) {
            deleteOrder(selectedOrder);
          }
        }}
        productName={`Order #${selectedOrder}`}
      />

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
