const Home = () => {
  return (
    <div id="mainOverviewContent" className="fade-in">
      <h2 className="text-2xl font-bold text-[#6b7280] mb-6">Main Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                  <div>
                      <p className="text-[#6b7280] text-sm">Total Kilograms Sold</p>
                      <p className="text-2xl font-bold text-[#4ade80]">1,247 kg</p>
                  </div>
                  <svg className="w-8 h-8 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
              </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                  <div>
                      <p className="text-[#6b7280] text-sm">Total Earnings</p>
                      <p className="text-2xl font-bold text-[#4ade80]">$3,741</p>
                  </div>
                  <svg className="w-8 h-8 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
              </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                  <div>
                      <p className="text-[#6b7280] text-sm">Active Orders</p>
                      <p className="text-2xl font-bold text-[#4ade80]">5</p>
                  </div>
                  <svg className="w-8 h-8 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#6b7280] mb-4 flex items-center">
                  <svg className="w-6 h-6 text-[#4ade80] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  Environmental Tips
              </h3>
              <div className="space-y-3">
                  <p className="text-[#6b7280]">• Clean containers before recycling to improve quality</p>
                  <p className="text-[#6b7280]">• Separate materials by type for better pricing</p>
                  <p className="text-[#6b7280]">• Bundle cardboard to save space and transport costs</p>
              </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#6b7280] mb-4 flex items-center">
                  <svg className="w-6 h-6 text-[#4ade80] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  Motivational Quote
              </h3>
              <blockquote className="text-[#6b7280] italic">
                  "The Earth does not belong to us; we belong to the Earth. All things are connected like the blood that unites one family."
              </blockquote>
              <p className="text-[#4ade80] font-medium mt-2">- Chief Seattle</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#6b7280] mb-4 flex items-center">
                  <svg className="w-6 h-6 text-[#4ade80] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  Promotions
              </h3>
              <div className="space-y-3">
                  <div className="bg-[#86efac33] bg-opacity-20 p-3 rounded-lg">
                      <p className="font-medium text-[#6b7280]">GreenTech Recycling</p>
                      <p className="text-sm text-[#6b7280]">+20% bonus for paper this week!</p>
                  </div>
                  <div className="bg-[#86efac33] bg-opacity-20 p-3 rounded-lg">
                      <p className="font-medium text-[#6b7280]">EcoMetal Solutions</p>
                      <p className="text-sm text-[#6b7280]">Free pickup for orders over 50kg</p>
                  </div>
              </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#6b7280] mb-4 flex items-center">
                  <svg className="w-6 h-6 text-[#4ade80] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                  Top-Rated Factories
              </h3>
              <div className="space-y-3">
                  <div className="flex items-center justify-between">
                      <span className="text-[#6b7280]">PlasticCycle Pro</span>
                      <span className="text-yellow-500">⭐ 4.9/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-[#6b7280]">GreenTech Recycling</span>
                      <span className="text-yellow-500">⭐ 4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-[#6b7280]">EcoMetal Solutions</span>
                      <span className="text-yellow-500">⭐ 4.6/5</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="text-center">
          <p className="text-[#6b7280] text-sm">Powered by <span className="font-semibold text-[#4ade80]">HoudiX</span></p>
      </div>
  </div>
  )
}


export default Home


{/* <div id="addRequestContent" className="fade-in hidden">
                    <h2 className="text-2xl font-bold text-[#6b7280] mb-6">Select a Factory</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer">
                            <div className="h-48 bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#6b7280] mb-2">GreenTech Recycling</h3>
                                <p className="text-[#6b7280]">Paper, Cardboard, Plastic bottles</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer">
                            <div className="h-48 bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#6b7280] mb-2">EcoMetal Solutions</h3>
                                <p className="text-[#6b7280]">Aluminum cans, Metal scraps</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer">
                            <div className="h-48 bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#6b7280] mb-2">PlasticCycle Pro</h3>
                                <p className="text-[#6b7280]">All plastic types, Bottles, Containers</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="factoryDetails" className="hidden fade-in">
                    <button className="mb-4 text-[#4ade80] hover:underline">← Back to Factories</button>
                    <h2 id="factoryName" className="text-2xl font-bold text-[#6b7280] mb-6">Factory Details</h2>
                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                        <h3 className="text-xl font-semibold text-[#6b7280] mb-4">Materials We Buy</h3>
                        <div id="materialsList" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        </div>
                        <button className="mt-6 bg-[#86efac] hover:bg-[#4ade80] text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                            Order from this factory
                        </button>
                    </div>
                </div>

                <div id="orderForm" className="hidden fade-in">
                    <button className="mb-4 text-[#4ade80] hover:underline">← Back to Factory</button>
                    <h2 className="text-2xl font-bold text-[#6b7280] mb-6">Place Your Order</h2>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <form id="orderFormData" className="space-y-6">
                            <div>
                                <label className="block text-[#6b7280] font-medium mb-2">Select Materials to Sell</label>
                                <div id="materialSelection" className="space-y-2">
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#6b7280] font-medium mb-2">Current Location</label>
                                <input type="text" id="orderLocation" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-[#6b7280] font-medium mb-2">Preferred Pickup Date</label>
                                <input type="date" id="orderDate" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent" min="2025-07-06" />
                            </div>
                            <div>
                                <label className="block text-[#6b7280] font-medium mb-2">Preferred Pickup Time</label>
                                <select id="orderTime" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent">
                                    <option value="">Select time</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="16:00">4:00 PM</option>
                                </select>
                            </div>
                            <div className="bg-[#86efac] bg-opacity-20 p-4 rounded-lg">
                                <p className="text-[#6b7280] font-medium">Estimated Total Price: <span id="estimatedPrice" className="text-[#4ade80] font-bold">$0.00</span></p>
                            </div>
                            <button type="submit" className="w-full bg-[#86efac] hover:bg-[#4ade80] text-white font-semibold py-3 rounded-lg transition duration-200">
                                Confirm Order
                            </button>
                        </form>
                    </div>
                </div>
                <div id="myOrdersContent" className="hidden fade-in">
                    <h2 className="text-2xl font-bold text-[#6b7280] mb-6">My Orders</h2>
                    <div id="ordersList" className="space-y-4">
                    </div>
                </div>
                <div id="myProfileContent" className="hidden fade-in">
                    <h2 className="text-2xl font-bold text-[#6b7280] mb-6">My Profile</h2>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center mb-6">
                            <div className="w-20 h-20 bg-[#86efac] rounded-full flex items-center justify-center text-3xl text-white mr-6">
                                👤
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#6b7280]">Profile Picture</h3>
                                <button className="text-[#4ade80] hover:underline">Change Picture</button>
                            </div>
                        </div>
                        <form id="profileForm" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#6b7280] font-medium mb-2">Full Name</label>
                                    <input type="text" id="profileName" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent" /> 
                                </div>
                                <div>
                                    <label className="block text-[#6b7280] font-medium mb-2">Email</label>
                                    <input type="email" id="profileEmail" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent" />
                                </div>
                                <div>
                                    <label className="block text-[#6b7280] font-medium mb-2">Phone</label>
                                    <input type="tel" id="profilePhone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent" />
                                </div>
                                <div>
                                    <label className="block text-[#6b7280] font-medium mb-2">Location</label>
                                    <input type="text" id="profileLocation" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent" />
                                </div>
                            </div>
                            <button type="submit" className="bg-[#86efac] hover:bg-[#4ade80] text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>

                <div id="factoriesContent" className="hidden fade-in">
                    <h2 className="text-2xl font-bold text-[#6b7280] mb-6">All Factories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer" >
                            <div className="h-48 bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#6b7280] mb-2">GreenTech Recycling</h3>
                                <p className="text-[#6b7280] mb-4">Paper, Cardboard, Plastic bottles</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                                    <span className="text-[#6b7280] text-sm">4.8/5</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer">
                            <div className="h-48 bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#6b7280] mb-2">EcoMetal Solutions</h3>
                                <p className="text-[#6b7280] mb-4">Aluminum cans, Metal scraps</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                                    <span className="text-[#6b7280] text-sm">4.6/5</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer">
                            <div className="h-48 bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#6b7280] mb-2">PlasticCycle Pro</h3>
                                <p className="text-[#6b7280] mb-4">All plastic types, Bottles, Containers</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                                    <span className="text-[#6b7280] text-sm">4.9/5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="helpContent" className="hidden fade-in">
                    <h2 className="text-2xl font-bold text-[#6b7280] mb-6">Help &amp; Support</h2>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-[#6b7280] mb-4">Who is the technical team behind the application?</h3>
                        <p className="text-[#6b7280] mb-6">
                            The Eco-Revival application was developed by a passionate and dedicated programming team committed to building sustainable digital solutions. This team is responsible for maintaining the platform, fixing bugs, and providing technical support to ensure a smooth user experience.
                        </p>
                        
                        <h3 className="text-xl font-semibold text-[#6b7280] mb-4">Support Contact Number:</h3>
                        <div className="bg-[#86efac] bg-opacity-20 p-4 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <a href="tel:0951923977" className="text-[#4ade80] font-bold text-lg hover:underline">0951923977</a>
                            </div>
                        </div>
                    </div>
                </div> */}