import { useState } from "react";
import DelegateModal from "@/components/modals/DelegateModal";

const Delegates = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const delegates = [
    {
      id: "john",
      name: "John Smith",
      initials: "JS",
      phone: "+1 234-567-8901",
      location: "Downtown District",
      status: "Active",
      bg: "bg-[#86efac]",
      text: "text-[#16a34a]",
    },
    {
      id: "maria",
      name: "Maria Johnson",
      initials: "MJ",
      phone: "+1 234-567-8902",
      location: "North Side",
      status: "Active",
      bg: "bg-blue-200",
      text: "text-blue-700",
    },
  ];

  const editDelegate = (id: string) => {
    console.log("Edit delegate", id);
  };

  const deleteDelegate = (id: string) => {
    console.log("Delete delegate", id);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="delegatesGrid">
        {delegates.map((delegate) => (
          <div key={delegate.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 ${delegate.bg} rounded-full flex items-center justify-center mr-4`}
              >
                <span className={`text-xl font-bold ${delegate.text}`}>
                  {delegate.initials}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {delegate.name}
                </h3>
                <p className="text-sm text-gray-600">{delegate.status}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {delegate.phone}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {delegate.location}
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => editDelegate(delegate.id)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => deleteDelegate(delegate.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <DelegateModal open={modalOpen} onClose={() => setModalOpen(false)} />

    </div>
  );
};

export default Delegates;
