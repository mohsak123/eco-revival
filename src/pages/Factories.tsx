import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getFactories } from "@/store/user/factorySlice";
import type { AppDispatch, RootState } from "@/store/store";
import loader from "../../public/animations/loader.json";
import Lottie from "lottie-react";

const Factories = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { factory, loading, error, status } = useSelector((state: RootState) => state.factory);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getFactories());
    }
  }, [dispatch]);

  if (loading) {
    return <div className="h-[68vh] sm:h-[75vh] flex items-center justify-center">
      <Lottie animationData={loader} loop={true} className="w-[275px] sm:w-[350px]" />
    </div>
  }

  return (
    <div id="factoriesContent" className="fade-in">
      <h2 className="text-2xl font-bold text-eco-gray mb-6">All Factories</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {factory.map((f) => (
          <Link
            to={`/factories/${f.id}`}
            key={f.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer"
          >
            <div className="h-48 bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
              <FaBuilding className="text-[48px] text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-eco-gray mb-2">
                {f.name}
              </h3>
              <p className="text-eco-gray mb-4">
                {f.Pricings.map(p => p.Material.name).join(", ")}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="text-eco-gray text-sm">5/5</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Factories;
