const AdminAccount = () => {
  return (
    <div id="accountPage" className="page-content">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Account</h2>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 bg-[#bbf7d0] rounded-full flex items-center justify-center mr-6">
            <span className="text-3xl font-bold text-[#166534]">EF</span>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">EcoFactory Ltd.</h3>
            <p className="text-gray-600">Factory Owner</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">ecofactory_admin</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">admin@ecofactory.com</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">Industrial Zone, Green City</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">+1 555-ECO-FACT</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="bg-[#4ade80] hover:bg-[#16a34a] cursor-pointer text-white px-6 py-2 rounded-lg transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

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

export default AdminAccount;
