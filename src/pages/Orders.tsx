const orders = [
  {
    id: 1,
    company: "GreenTech Recycling",
    status: { label: "In Progress", color: "blue" },
    materials: "Paper, Cardboard",
    quantity: "25 kg",
    date: "2024-01-15",
    price: "$75",
    deletable: false,
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
  },
];

const Orders = () => {
  return (
    <div id="myOrdersContent" className="fade-in">
      <h2 className="text-2xl font-bold text-[#6b7280] mb-6">My Orders</h2>
      <div id="ordersList" className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-6"
          >
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
                <p className="font-medium text-[#4ade80]">
                  {order.price}
                </p>
              </div>
            </div>

            {order.deletable && (
              <button className="text-red-600 hover:text-red-800 text-sm">
                Delete Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
