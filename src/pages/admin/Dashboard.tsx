const Dashboard = () => {
  return (
    <div id="homePage" className="page-content fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-black mb-2">Total Orders This Month</h3>
          <p className="text-3xl font-bold text-[#4ade80]">127</p>
          <p className="text-sm text-gray-500 mt-1">↑ 12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-black mb-2">Active Delegates</h3>
          <p className="text-3xl font-bold text-[#4ade80]">8</p>
          <p className="text-sm text-gray-500 mt-1">Currently available</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-black mb-2">Processing Orders</h3>
          <p className="text-3xl font-bold text-[#4ade80]">23</p>
          <p className="text-sm text-gray-500 mt-1">In progress</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Other Active Factories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-[#86efac] rounded-lg flex items-center justify-center mb-3">
              <span className="text-2xl">🏭</span>
            </div>
            <h4 className="font-semibold text-gray-800">GreenTech Industries</h4>
            <p className="text-sm text-gray-600 mb-2">Plastic & Metal Recycling</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Plastic Bottles - $0.28/kg</p>
              <p>• Metal Cans - $0.45/kg</p>
              <p>• Mixed Plastic - $0.20/kg</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-2xl">📦</span>
            </div>
            <h4 className="font-semibold text-gray-800">EcoPaper Solutions</h4>
            <p className="text-sm text-gray-600 mb-2">Paper & Cardboard Processing</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Recycled Paper - $0.18/kg</p>
              <p>• Cardboard - $0.14/kg</p>
              <p>• Newspapers - $0.10/kg</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-2xl">♻️</span>
            </div>
            <h4 className="font-semibold text-gray-800">Sustainable Materials Co.</h4>
            <p className="text-sm text-gray-600 mb-2">Mixed Material Recovery</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Glass Bottles - $0.22/kg</p>
              <p>• Textiles - $0.35/kg</p>
              <p>• Electronics - $1.20/kg</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
