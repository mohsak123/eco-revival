const Help = () => {
  return (
    <div id="helpContent" className="fade-in">
      <h2 className="text-2xl font-bold text-[#687280] mb-6">Help &amp; Support</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-[#687280] mb-4">Who is the technical team behind the application?</h3>
          <p className="text-[#687280] mb-6">
              The Eco-Revival application was developed by a passionate and dedicated programming team committed to building sustainable digital solutions. This team is responsible for maintaining the platform, fixing bugs, and providing technical support to ensure a smooth user experience.
          </p>
          
          <h3 className="text-xl font-semibold text-[#687280] mb-4">Support Contact Number:</h3>
          <div className="bg-[#86efac33] bg-opacity-20 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <a href="tel:0951923977" className="text-[#4ade80] font-bold text-lg hover:underline">0951923977</a>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Help