import { useState, useEffect } from "react";
import ProductModal from "@/components/modals/ProductModal";
import EditProductModal from "@/components/modals/EditProductModal";
import DeleteConfirmDialog from "@/components/modals/DeleteConfirmDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deletePricing, editPricing, getPricings } from "@/store/factory/pricingSlice";
import toast from "react-hot-toast";

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
  const dispatch = useAppDispatch();

  const { pricings, loading, error } = useAppSelector((state) => state.pricing);

  const products: Product[] = pricings.map((p) => ({
    id: p.id.toString(),
    name: p.Material?.name,
    price: p.price.toString(),
    emoji: "📦",
    bg: "from-gray-200 to-gray-400",
    unit: p.unit,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);


  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedProduct = async (updatedProduct: Product) => {
  try {
    if (!updatedProduct.id) return;

    const dataToSend = {
      material_id: updatedProduct.material_id,
      price: parseFloat(updatedProduct.price),
      unit: updatedProduct.unit,
    };

    await dispatch(editPricing({ id: Number(updatedProduct.id), data: dataToSend })).unwrap();

    toast.success("Pricing updated successfully");
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    dispatch(getPricings());
  } catch (error: any) {
    console.error("Failed to edit pricing:", error);
    toast.error(error || "Failed to edit pricing");
  }
};


  const handleDeleteConfirmed = async() => {
    if (productToDelete) {
      try {
        await dispatch(deletePricing(Number(productToDelete.id))).unwrap();
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
      } catch (error: any) {
        console.error("Failed to delete pricing:", error);
        toast.error(error)
      }
    }
  };

  useEffect(() => {
    dispatch(getPricings());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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

      <ProductModal open={isModalOpen} onOpenChange={setIsModalOpen} />

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
    </div>
  );
};

export default Products;
