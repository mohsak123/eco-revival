import ProductModal from "@/components/modals/ProductModal";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  emoji: string;
  bg: string;
}

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products: Product[] = [
    {
      id: "paper",
      name: "Recycled Paper",
      price: "$0.15 per kg",
      emoji: "📄",
      bg: "from-[#86efac] to-[#4ade80]",
    },
    {
      id: "plastic",
      name: "Plastic Bottles",
      price: "$0.25 per kg",
      emoji: "🥤",
      bg: "from-blue-200 to-blue-400",
    },
    {
      id: "cardboard",
      name: "Cardboard",
      price: "$0.12 per kg",
      emoji: "📦",
      bg: "from-yellow-200 to-yellow-400",
    },
  ];

  return (
    <div id="productsPage" className="page-content">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4ade80] hover:bg-[#16a34a] cursor-pointer text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="productsGrid">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className={`h-48 bg-gradient-to-br ${product.bg} flex items-center justify-center`}>
              <span className="text-6xl">{product.emoji}</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-[#16a34a] mb-3">{product.price}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer py-2 px-4 rounded transition-colors">
                  Edit
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white cursor-pointer py-2 px-4 rounded transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductModal open={isModalOpen} onOpenChange={setIsModalOpen} />

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

export default Products;
