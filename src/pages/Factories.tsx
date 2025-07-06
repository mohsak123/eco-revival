const Factories = () => {
  return (
    <div id="factoriesContent" className="fade-in">
      <h2 className="text-2xl font-bold text-eco-gray mb-6">All Factories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
              </div>
              <div className="p-6">
                  <h3 className="text-xl font-semibold text-eco-gray mb-2">GreenTech Recycling</h3>
                  <p className="text-eco-gray mb-4">Paper, Cardboard, Plastic bottles</p>
                  <div className="flex items-center justify-between">
                      <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                      <span className="text-eco-gray text-sm">4.8/5</span>
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
                  <h3 className="text-xl font-semibold text-eco-gray mb-2">EcoMetal Solutions</h3>
                  <p className="text-eco-gray mb-4">Aluminum cans, Metal scraps</p>
                  <div className="flex items-center justify-between">
                      <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                      <span className="text-eco-gray text-sm">4.6/5</span>
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
                  <h3 className="text-xl font-semibold text-eco-gray mb-2">PlasticCycle Pro</h3>
                  <p className="text-eco-gray mb-4">All plastic types, Bottles, Containers</p>
                  <div className="flex items-center justify-between">
                      <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                      <span className="text-eco-gray text-sm">4.9/5</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Factories