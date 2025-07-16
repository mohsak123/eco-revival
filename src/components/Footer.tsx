
const Footer = () => {
  return (
    <div className="mt-8 text-center">
      <div className="flex items-center justify-center">
        <span className="text-gray-600 mr-3">Powered by</span>
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <div className="w-10 h-9 mr-2 flex items-center justify-center">
            <img src="/images/footer.png" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-gray-800">HoudiX</span>
        </div>
      </div>
    </div>
  )
}

export default Footer