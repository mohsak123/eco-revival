import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";
import { getFactories } from "@/store/user/factorySlice";
import type { AppDispatch, RootState } from "@/store/store";

const SingleFactory = () => {
  const { id } = useParams(); // جلب ID من الرابط
  const dispatch = useDispatch<AppDispatch>();
  const { factory, loading } = useSelector((state: RootState) => state.factory);

  useEffect(() => {
    if (factory.length === 0) dispatch(getFactories());
  }, [dispatch, factory.length]);

  const selectedFactory = factory.find((f) => f.id === Number(id));

  if (loading || !selectedFactory) return <p className="text-gray-500">Loading...</p>;

  return (
    <div id="factoryDetails" className="fade-in">
      <Link
        to="/factories"
        className="mb-4 inline-block text-[#166534] hover:underline"
      >
        ← Back to Factories
      </Link>

      {/* Factory Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="h-18 w-20 sm:h-20 bg-[#4ade80] flex items-center justify-center rounded-full mr-2">
            <FaBuilding className="object-cover text-[32px] text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#6b7280] mb-2">
              {selectedFactory.name}
            </h2>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          {/* Email */}
          <div className="flex items-center space-x-3">
            <span className="w-5 h-5 text-[#166534]">📧</span>
            <div>
              <p className="text-sm text-[#6b7280]">Email</p>
              <p className="font-medium text-[#6b7280]">{selectedFactory.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <span className="w-5 h-5 text-[#166534]">📞</span>
            <div>
              <p className="text-sm text-[#6b7280]">Phone</p>
              <p className="font-medium text-[#6b7280]">{selectedFactory.phone}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-3">
            <span className="w-5 h-5 text-[#166534]">📍</span>
            <div>
              <p className="text-sm text-[#6b7280]">Location</p>
              <p className="font-medium text-[#6b7280]">{selectedFactory.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-[#6b7280] mb-4 flex items-center">
          🧾 Top Materials We Buy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedFactory.Pricings.map((p, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#4ade80] to-[#166534] p-6 rounded-xl text-center text-white hover:shadow-lg transition duration-200"
            >
              <div className="text-4xl mb-3">♻️</div>
              <h4 className="font-semibold text-lg mb-2">{p.Material.name}</h4>
              <p className="text-xl font-bold">${p.price}/{p.unit}</p>
              <div className="mt-3 flex items-center justify-center">
                <span className="text-sm">Top Material</span>
              </div>
            </div>
          ))}
        </div>

        <Link
          to={`/factories/${selectedFactory.id}/order`}
          className="mt-6 inline-block bg-[#4ade80] hover:bg-[#166534] text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Order from this lab
        </Link>
      </div>
    </div>
  );
};

export default SingleFactory;
