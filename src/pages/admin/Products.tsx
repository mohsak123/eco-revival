import { useState } from "react";
import ProductModal from "@/components/modals/ProductModal";
import EditProductModal from "@/components/modals/EditProductModal";
import DeleteConfirmDialog from "@/components/modals/DeleteConfirmDialog";

interface Product {
  id: string;
  name: string;
  price: string;
  emoji: string;
  bg: string;
  unit: string;
  image?: File | null;
}

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "paper",
      name: "Recycled Paper",
      price: "0.15",
      emoji: "📄",
      bg: "from-[#86efac] to-[#4ade80]",
      unit: "kg",
    },
    {
      id: "plastic",
      name: "Plastic Bottles",
      price: "0.25",
      emoji: "🥤",
      bg: "from-blue-200 to-blue-400",
      unit: "kg",
    },
    {
      id: "cardboard",
      name: "Cardboard",
      price: "0.12",
      emoji: "📦",
      bg: "from-yellow-200 to-yellow-400",
      unit: "kg",
    },
  ]);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteConfirmed = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

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

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        id="productsGrid"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              className={`h-48 bg-gradient-to-br ${product.bg} flex items-center justify-center`}
            >
              <span className="text-6xl">{product.emoji}</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-2xl font-bold text-[#16a34a] mb-1">
                ${product.price} per {product.unit}
              </p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => handleEditClick(product)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer py-2 px-4 rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setProductToDelete(product);
                    setIsDeleteDialogOpen(true);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white cursor-pointer py-2 px-4 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <ProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAdd={handleAddProduct}
      />

      {/* Edit Modal */}
      <EditProductModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        product={selectedProduct}
        onSave={handleSaveEditedProduct}
      />
      
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirmed}
        productName={productToDelete?.name || ""}
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

export default Products;
