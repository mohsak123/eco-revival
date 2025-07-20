import { Link } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";


const SingleFactory = () => {
  const showAddRequest = () => {
    console.log("Back to Factories clicked");
  };

  const showOrderForm = () => {
    console.log("Order from this factory clicked");
  };

  return (
    <div id="factoryDetails" className="fade-in">
      <Link
        to="/add"
        onClick={showAddRequest}
        className="mb-4 inline-block text-[#166534] hover:underline"
      >
        ← Back to Factories
      </Link>

      {/* Factory Header with Image and Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="h-18 w-20 sm:h-20 bg-[#4ade80] flex items-center justify-center rounded-full mr-2">
            <FaBuilding
            id="factoryImage"
            className="object-cover text-[32px] text-white"
          />
          </div>
          <div>
            <h2
              id="factoryName"
              className="text-2xl font-bold text-[#6b7280] mb-2"
            >
              GreenTech Recycling
            </h2>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          {/* Email */}
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-[#166534]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="text-sm text-[#6b7280]">Email</p>
              <p id="factoryEmail" className="font-medium text-[#6b7280]">
                contact@greentech-recycling.com
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-[#166534]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div>
              <p className="text-sm text-[#6b7280]">Phone</p>
              <p id="factoryPhone" className="font-medium text-[#6b7280]">
                +1 (555) 123-4567
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-[#166534]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p className="text-sm text-[#6b7280]">Location</p>
              <p id="factoryLocation" className="font-medium text-[#6b7280]">
                Downtown Industrial District, City Center
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Materials Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-[#6b7280] mb-4 flex items-center">
          <svg
            className="w-6 h-6 text-[#166534] mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          Top Materials We Buy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Material 1 */}
          <div className="bg-gradient-to-br from-[#4ade80] to-[#166534] p-6 rounded-xl text-center text-white hover:shadow-lg transition duration-200">
            <div className="text-4xl mb-3">📄</div>
            <h4 className="font-semibold text-lg mb-2">Paper</h4>
            <p className="text-xl font-bold">$2.5/kg</p>
            <div className="mt-3 flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405.1L10 14.25l4.068 2.906c.714 1.356 1.599.713 1.405-.1l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Top Material</span>
            </div>
          </div>

          {/* Material 2 */}
          <div className="bg-gradient-to-br from-[#4ade80] to-[#166534] p-6 rounded-xl text-center text-white hover:shadow-lg transition duration-200">
            <div className="text-4xl mb-3">📦</div>
            <h4 className="font-semibold text-lg mb-2">Cardboard</h4>
            <p className="text-xl font-bold">$3/kg</p>
            <div className="mt-3 flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l..." clipRule="evenodd" />
              </svg>
              <span className="text-sm">Top Material</span>
            </div>
          </div>

          {/* Material 3 */}
          <div className="bg-gradient-to-br from-[#4ade80] to-[#166534] p-6 rounded-xl text-center text-white hover:shadow-lg transition duration-200">
            <div className="text-4xl mb-3">🍶</div>
            <h4 className="font-semibold text-lg mb-2">Plastic Bottles</h4>
            <p className="text-xl font-bold">$4/kg</p>
            <div className="mt-3 flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l..." clipRule="evenodd" />
              </svg>
              <span className="text-sm">Top Material</span>
            </div>
          </div>
        </div>

        <Link
          to="/factories/factory/order"
          onClick={showOrderForm}
          className="mt-6 inline-block bg-[#4ade80] hover:bg-[#166534] text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Order from this lab
        </Link>
      </div>
    </div>
  );
};

export default SingleFactory;
