import DeleteConfirmDialog from "@/components/modals/DeleteConfirmDialog";
import EditDialog from "@/components/modals/EditDialog";
import { useState } from "react";


const ordersData = [
  {
    id: 1,
    company: "GreenTech Recycling",
    status: { label: "In Progress", color: "blue" },
    materials: "Paper, Cardboard",
    quantity: "25 kg",
    date: "2024-01-15",
    price: "$75",
    deletable: false,
    commit: "Initial commit 1",
  },
  {
    id: 2,
    company: "EcoMetal Solutions",
    status: { label: "Completed", color: "green" },
    materials: "Aluminum cans",
    quantity: "15 kg",
    date: "2024-01-10",
    price: "$45",
    deletable: true,
    commit: "Completed commit",
  },
  {
    id: 3,
    company: "PlasticCycle Pro",
    status: { label: "Pending", color: "yellow" },
    materials: "Plastic bottles",
    quantity: "30 kg",
    date: "2024-01-18",
    price: "$90",
    deletable: false,
    commit: "",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(ordersData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // فتح بوباب الحذف
  const openDeleteDialog = (orderId: number) => {
    setSelectedOrderId(orderId);
    setDeleteDialogOpen(true);
  };

  // تأكيد الحذف
  const confirmDelete = () => {
    if (selectedOrderId !== null) {
      setOrders((prev) => prev.filter((order) => order.id !== selectedOrderId));
      setSelectedOrderId(null);
      setDeleteDialogOpen(false);
    }
  };

  // فتح بوباب التعديل
  const openEditDialog = (orderId: number) => {
    setSelectedOrderId(orderId);
    setEditDialogOpen(true);
  };

  // حفظ التعديل
  const saveEditCommit = (newCommit: string) => {
    if (selectedOrderId !== null) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrderId ? { ...order, commit: newCommit } : order
        )
      );
      setEditDialogOpen(false);
      setSelectedOrderId(null);
    }
  };

  // الحصول على بيانات الطلب المحدد
  const selectedOrder = selectedOrderId !== null
    ? orders.find((o) => o.id === selectedOrderId)
    : null;

  return (
    <div id="myOrdersContent" className="fade-in">
      <h2 className="text-2xl font-bold text-[#6b7280] mb-6">My Orders</h2>
      <div id="ordersList" className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#6b7280]">
                  Order #{order.id}
                </h3>
                <p className="text-[#6b7280]">{order.company}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium text-${order.status.color}-600 bg-${order.status.color}-100`}
              >
                {order.status.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-[#6b7280]">Materials</p>
                <p className="font-medium">{order.materials}</p>
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Quantity</p>
                <p className="font-medium">{order.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Date</p>
                <p className="font-medium">{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Price</p>
                <p className="font-medium text-[#4ade80]">{order.price}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              {/* حالة Completed - زر حذف */}
              {order.status.label === "Completed" && order.deletable && (
                <button
                  className="text-red-600 hover:text-red-800 text-sm"
                  onClick={() => openDeleteDialog(order.id)}
                >
                  Delete Order
                </button>
              )}

              {/* حالة In Progress - زر تعديل */}
              {order.status.label === "In Progress" && (
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => openEditDialog(order.id)}
                >
                  Edit
                </button>
              )}

              {/* حالة Pending - زرين Edit و Cancel */}
              {order.status.label === "Pending" && (
                <>
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    onClick={() => openEditDialog(order.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-sm"
                    onClick={() => openDeleteDialog(order.id)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        productName={selectedOrder?.company || ""}
      />

      <EditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        initialCommit={selectedOrder?.commit}
        onSave={saveEditCommit}
      />
    </div>
  );
};

export default Orders;
