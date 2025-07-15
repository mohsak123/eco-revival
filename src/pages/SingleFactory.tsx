import { Link } from "react-router-dom";

const SingleFactory = () => {
  const showAddRequest = () => {
    console.log("Back to Factories clicked");
  };

  const showOrderForm = () => {
    console.log("Order from this factory clicked");
  };

  return (
    <div id="factoryDetails" className="fade-in">
      <Link to="/add"
        onClick={showAddRequest}
        className="mb-4 text-[#4ade80] hover:underline"
      >
        ← Back to Factories
      </Link>

      <h2 id="factoryName" className="text-2xl font-bold text-[#6b7280] mb-6">
        GreenTech Recycling
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-[#6b7280] mb-4">
          Materials We Buy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">📄</div>
            <h4 className="font-semibold text-[#6b7280]">Paper</h4>
            <p className="text-[#4ade80] font-bold">$2.5/kg</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">📦</div>
            <h4 className="font-semibold text-[#6b7280]">Cardboard</h4>
            <p className="text-[#4ade80] font-bold">$3/kg</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">🍶</div>
            <h4 className="font-semibold text-[#6b7280]">Plastic Bottles</h4>
            <p className="text-[#4ade80] font-bold">$4/kg</p>
          </div>
        </div>

        <Link to="/factories/factory/order"
          onClick={showOrderForm}
          className="mt-6 block w-fit bg-[#86efac] hover:bg-[#4ade80] cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Order from this factory
        </Link>
      </div>
    </div>
  );
};

export default SingleFactory;
