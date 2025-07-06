const Profile = () => {
  return (
    <div id="myProfileContent" className="fade-in">
      <h2 className="text-2xl font-bold text-[#687280] mb-6">My Profile</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-6">
              <div className="w-18 sm:w-20 h-18 sm:h-20 bg-[#4ade80] rounded-full flex items-center justify-center text-2xl sm:text-3xl text-white mr-6">
                  👤
              </div>
              <div>
                  <h3 className="text-xl font-semibold text-[#687280]">Profile Picture</h3>
                  <button className="text-[#4ade80] hover:underline">Change Picture</button>
              </div>
          </div>
          <form id="profileForm" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-[#687280] font-medium mb-2">Full Name</label>
                      <input type="text" id="profileName" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent" />
                  </div>
                  <div>
                      <label className="block text-[#687280] font-medium mb-2">Email</label>
                      <input type="email" id="profileEmail" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent" />
                  </div>
                  <div>
                      <label className="block text-[#687280] font-medium mb-2">Phone</label>
                      <input type="tel" id="profilePhone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent" />
                  </div>
                  <div>
                      <label className="block text-[#687280] font-medium mb-2">Location</label>
                      <input type="text" id="profileLocation" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent" />
                  </div>
              </div>
              <button type="submit" className="bg-[#4ade80] hover:bg-[#86efac] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 block mx-auto sm:mx-0">
                  Save Changes
              </button>
          </form>
      </div>
  </div>
  )
}

export default Profile