import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Factory {
  name: string;
  materials: string;
  rating: number;
  ratingText: string;
}

const factories: Factory[] = [
  {
    name: "GreenTech Recycling",
    materials: "Paper, Cardboard, Plastic bottles",
    rating: 4.8,
    ratingText: "⭐⭐⭐⭐⭐",
  },
  {
    name: "EcoMetal Solutions",
    materials: "Aluminum cans, Metal scraps",
    rating: 4.6,
    ratingText: "⭐⭐⭐⭐⭐",
  },
  {
    name: "PlasticCycle Pro",
    materials: "All plastic types, Bottles, Containers",
    rating: 4.9,
    ratingText: "⭐⭐⭐⭐⭐",
  },
];

const Factories = () => {
  return (
    <div id="factoriesContent" className="fade-in">
      <h2 className="text-2xl font-bold text-eco-gray mb-6">All Factories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {factories.map((factory, index) => (
          <Link to="/factories/factory"
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer"
          >
            <div className="h-48 bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
              <FaBuilding className="text-[48px] text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-eco-gray mb-2">
                {factory.name}
              </h3>
              <p className="text-eco-gray mb-4">{factory.materials}</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500">{factory.ratingText}</span>
                <span className="text-eco-gray text-sm">{factory.rating}/5</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Factories;
