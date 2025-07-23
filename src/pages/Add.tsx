import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { getFactories } from "@/store/user/factorySlice";
import Lottie from "lottie-react";
import loader from "../../public/animations/loader.json";
import toast from "react-hot-toast";



const Add = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { factory, loading, error, status } = useSelector((state: RootState) => state.factory);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getFactories());
    }
  }, [dispatch, status]);

  if (loading) {
    return <div className="h-[68vh] sm:h-[75vh] flex items-center justify-center">
      <Lottie animationData={loader} loop={true} className="w-[275px] sm:w-[350px]" />
    </div>
  }

  if (error) {
    toast.error(error)
  }


  return (
    <div id="factoriesContent" className="fade-in">
      <h2 className="text-2xl font-bold text-eco-gray mb-6">All Factories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {factory.map((factory, index) => (
          <Link to={`/factories/${factory.id}`}
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer"
          >
            <div className="h-48 text-[48px] text-white bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
              {/* {factory.icon} */}
              <FaBuilding className="text-[48px] text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-eco-gray mb-2">{factory.name}</h3>
              <p className="text-eco-gray mb-4">
                {factory.Pricings.map(p => p.Material.name).join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Add;
