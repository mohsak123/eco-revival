import { useEffect, useState } from "react";
import DelegateModal from "@/components/modals/DelegateModal";
import EditDelegateDialog from "@/components/modals/EditDelegateDialog";
import DeleteConfirmDialog from "@/components/modals/DeleteConfirmDialog";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { deleteDelegate, getDelegates } from "@/store/factory/factorySlice";
import toast from "react-hot-toast";

const Delegates = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDelegateId, setSelectedDelegateId] = useState<number | null>(null);
  const [, setApiError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>()
  const { loading, delegate } = useSelector((state: RootState) => state.delegate);

  const getDelegatesHandler = async() => {
    const resultAction = await dispatch(getDelegates());

    if (!getDelegates.fulfilled.match(resultAction)) {
      const errMsg = (resultAction.payload as string) || "Delegates load failed";
      setApiError(errMsg);
      toast.error(errMsg);
    }
  }

  useEffect(() => {
    getDelegatesHandler();
    
  },[])


  const openEditDialog = (id: number) => {
    setSelectedDelegateId(id);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedDelegateId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
  if (!selectedDelegateId) return;

  try {
    const resultAction = await dispatch(deleteDelegate(selectedDelegateId));
    if (deleteDelegate.fulfilled.match(resultAction)) {
      toast.success("Delegate deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedDelegateId(null);
      await dispatch(getDelegates());
    } else {
      const errMsg = (resultAction.payload as string) || "Delete failed";
      toast.error(errMsg);
    }
  } catch (error) {
    toast.error("Delete failed");
  }
};


  const handleDelegateModalClose = () => {
    setModalOpen(false);
    getDelegatesHandler(); // جلب البيانات المحدثة بعد إضافة مندوب جديد
  };

  const selectedDelegate = delegate.find((d) => d.id === selectedDelegateId) || null;

  if (loading) {
    return <div className="h-[65vh] sm:h-[75vh] text-[24px] text-black/70 flex items-center justify-center">
      loading ...
    </div>
  }

  return (
    <div id="delegatesPage" className="page-content">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Delegates</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#4ade80] hover:bg-[#16a34a] cursor-pointer text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add Delegate
        </button>
      </div>

      {
        delegate.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="delegatesGrid">
            {delegate.map((dele) => (
              <div key={dele?.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 bg-[#86efac] rounded-full flex items-center justify-center mr-4`}
                  >
                    <span className={`text-xl font-bold text-blue-700`}>
                      {dele?.fullname?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{dele?.fullname}</h3>
                    <p className="text-sm text-gray-600">Active</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span> {dele?.number}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Location:</span> {dele?.location}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditDialog(dele?.id)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteDialog(dele.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>:
          <div className="text-black/80 text-2xl font-semibold h-[55vh] md:h-[68vh] flex items-center justify-center">
            There are not Delegates
          </div>
          }

      

      {/* Modal إضافة مندوب جديد */}
      <DelegateModal open={modalOpen} onClose={handleDelegateModalClose} />

      {/* Popup تعديل مندوب */}
      <EditDelegateDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        delegate={selectedDelegate}
      />

      {/* Popup تأكيد حذف مندوب */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        productName={selectedDelegate?.name || ""}
      />
    </div>
  );
};

export default Delegates;
