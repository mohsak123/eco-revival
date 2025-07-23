import DeleteConfirmDialog from "@/components/modals/DeleteConfirmDialog";
import EditOrderDialog from "@/components/modals/EditOrderDialog";
import EditDialog from "@/components/modals/EditDialog";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder, getOrders, updateOrder, type OrderResponse } from "@/store/user/orderSlice";

const Orders = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editOrderDialogOpen, setEditOrderDialogOpen] = useState(false);
  const [editCommitDialogOpen, setEditCommitDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { ordersList, loadingOrders, error } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    if (ordersList.length === 0) {
      dispatch(getOrders());
    }
  }, [dispatch]);

  // ✅ Best practice for dynamic Tailwind classes
  const mapStatusToStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "in_progress":
        return "text-blue-600 bg-blue-100";
      case "completed":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const openDeleteDialog = (orderId: number) => {
    setSelectedOrderId(orderId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedOrderId !== null) {
      dispatch(deleteOrder(selectedOrderId));
      setSelectedOrderId(null);
      setDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (orderId: number) => {
    setSelectedOrderId(orderId);
    const order = ordersList.find((o) => o.id === orderId);
    if (!order) return;

    if (order.status === "pending") {
      setEditOrderDialogOpen(true);
    } else if (order.status === "in_progress") {
      setEditCommitDialogOpen(true);
    }
  };

  const saveEditedOrder = async(updatedOrderData: any) => {
    try {
      await dispatch(updateOrder({ orderId: selectedOrder?.id, data: updatedOrderData })).unwrap();
      dispatch(getOrders());
    } catch (err: any) {
      throw err;
    }
  };

  console.log(ordersList)

  const saveEditedCommit = (newCommit: string) => {
    if (selectedOrderId !== null) {
      // ✅ استدعاء دالة التحديث للتعليقات فقط
      dispatch(updateOrder({ orderId: selectedOrderId, data: { comments: newCommit } }));

      setEditCommitDialogOpen(false);
      setSelectedOrderId(null);
    }
  };

  const selectedOrder =
    selectedOrderId !== null
      ? ordersList.find((o) => o.id === selectedOrderId) || null
      : null;

  if (loadingOrders) {
    return (
      <div className="flex justify-center items-center h-64">
        {/* <ClipLoader size={50} color={"#123abc"} loading={true} /> */}
        loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div id="myOrdersContent" className="fade-in">
      <h2 className="text-2xl font-bold text-[#6b7280] mb-6">My Orders</h2>
      <div id="ordersList" className="space-y-4">
        {ordersList.map((order: OrderResponse) => {
          const materials = order.Order_Materials.map(
            (mat) =>
              order.Factory?.Pricings?.find((p) => p.material_id === mat.material_id)?.Material?.name ||
              "Unknown"
          ).join(", ");

          const totalQuantity = order.Order_Materials.reduce(
            (acc, mat) => acc + mat.quantity,
            0
          );

          return (
            <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#6b7280]">
                    Order #{order.id}
                  </h3>
                  <p className="text-[#6b7280]">{order.Factory?.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${mapStatusToStyle(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-[#6b7280]">Materials</p>
                  <p className="font-medium">{materials}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280]">Quantity</p>
                  <p className="font-medium">{totalQuantity} kg</p>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280]">Order Date</p>
                  <p className="font-medium">
                    {new Date(order.order_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280]">Required Date</p>
                  <p className="font-medium">
                    {new Date(order.required_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280]">Price</p>
                  <p className="font-medium text-[#4ade80]">
                    {order.total_price.toLocaleString()} ل.س
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                {order.status === "completed" && (
                  <button
                    className="text-red-600 hover:text-red-800 text-sm"
                    onClick={() => openDeleteDialog(order.id)}
                  >
                    Delete Order
                  </button>
                )}

                {["in_progress", "pending"].includes(order.status) && (
                  <>
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm"
                      onClick={() => openEditDialog(order.id)}
                    >
                      Edit
                    </button>

                    {order.status === "pending" && (
                      <button
                        className="text-red-600 hover:text-red-800 text-sm"
                        onClick={() => openDeleteDialog(order.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedOrder && (
        <>
          <DeleteConfirmDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={confirmDelete}
            productName={`Order #${selectedOrder.id} from ${selectedOrder.Factory.name}`}
          />

          <EditOrderDialog
            open={editOrderDialogOpen}
            onOpenChange={setEditOrderDialogOpen}
            initialOrder={selectedOrder}
            onSave={saveEditedOrder}
          />

          <EditDialog
            open={editCommitDialogOpen}
            onClose={() => setEditCommitDialogOpen(false)}
            initialCommit={selectedOrder.comments || ""}
            onSave={saveEditedCommit}
          />
        </>
      )}
    </div>
  );
};

export default Orders;