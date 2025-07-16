import { Link } from "react-router-dom";

const AdminHelp = () => {
  return (
    <div id="supportPage" className="page-content">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Help & Support</h2>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical Team</h3>
          <p className="text-gray-600 leading-relaxed">
            The Eco-Revival application was developed by a passionate and dedicated
            programming team committed to building sustainable digital solutions. This
            team is responsible for maintaining the platform, fixing bugs, and
            providing technical support to ensure a smooth user experience.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Contact</h3>
          <div className="bg-[#bbf7d0] bg-opacity-20 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-[#166534] mb-2">Support Phone Number:</p>
            <p className="text-2xl font-bold text-[#166534]">0951923977</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800">Follow Us:</h4>
            <div className="flex flex-col space-y-2">
              <Link
                to="https://t.me/HoudiX01"
                target="_blank"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.896 6.728-1.268 7.686-2.965 6.35-1.103-.871-2.056-1.607-2.968-2.091-.697-.37-2.297-1.507-1.747-2.406.413-.675 1.85-1.751 3.621-3.402 1.198-1.117.623-1.775-.623-.623-1.873 1.73-3.779 3.311-4.707 3.311-1.135 0-2.568-.114-3.621-.623-.623-.3-1.135-.623-1.135-1.135 0-.623.623-1.135 1.135-1.135.623 0 1.135.3 1.758.623 1.053.509 2.568.623 3.621.623.928 0 2.834-1.581 4.707-3.311 1.246-1.152 1.821-.494.623.623-1.771 1.651-3.208 2.727-3.621 3.402-.55.899 1.05 2.036 1.747 2.406.912.484 1.865 1.22 2.968 2.091 1.697 1.336 2.069.378 2.965-6.35 0 0 .727-4.87.896-6.728.114-1.245-.623-1.869-1.758-1.869-.623 0-1.135.3-1.758.623z" />
                </svg>
                Telegram: @HoudiX01
              </Link>

              <Link
                to="https://www.instagram.com/houdix.co?igsh=Mzdua3M0czBhb2V4"
                target="_blank"
                className="flex items-center text-pink-600 hover:text-pink-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram: @houdix.co
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="border-t pt-6">
          <div className="flex items-center">
            <span className="text-gray-600 mr-3">Powered by</span>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded mr-2 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-bold text-gray-800">HoudiX</span>
            </div>
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default AdminHelp;
