import { FaBuilding } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { ImLoop2 } from "react-icons/im";
import { Link } from "react-router-dom";
import type { JSX } from "react";



interface Factory {
  name: string;
  materials: string;
  icon: JSX.Element;
}

const factories: Factory[] = [
  {
    name: "GreenTech Recycling",
    materials: "Paper, Cardboard, Plastic bottles",
    icon: <FaBuilding />,
  },
  {
    name: "EcoMetal Solutions",
    materials: "Aluminum cans, Metal scraps",
    icon: <IoSettingsOutline />
  },
  {
    name: "PlasticCycle Pro",
    materials: "All plastic types, Bottles, Containers",
    icon: <ImLoop2 />

  },
];

const Add = () => {
  return (
    <div id="factoriesContent" className="fade-in">
      <h2 className="text-2xl font-bold text-eco-gray mb-6">All Factories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {factories.map((factory, index) => (
          <Link to="/factories/factory"
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer"
          >
            <div className="h-48 text-[48px] text-white bg-gradient-to-br from-[#86efac] to-[#4ade80] flex items-center justify-center">
              {factory.icon}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-eco-gray mb-2">{factory.name}</h3>
              <p className="text-eco-gray mb-4">{factory.materials}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Add;
