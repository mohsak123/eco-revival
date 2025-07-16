import { Link, Outlet } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { FiFileText } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";


const Layout = ({ role }: { role: "user" | "admin" }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            {/* Menu Button (only on small screens) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden cursor-pointer">
                  <Menu className="" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-[#6b7280] mb-2">🌱 Eco-Revival</h1>
                  <hr className="mb-4" />
                  <SidebarContent role={role} />
                </div>
              </SheetContent>
            </Sheet>

            <h1 className="hidden md:block text-2xl font-bold text-[#6b7280]">🌱 Eco-Revival</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              id="notificationBtn"
              className="relative p-2 text-[#6b7280] hover:text-[#4ade80] transition duration-200"
            >
              🔔
              <span
                id="notificationBadge"
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                3
              </span>
            </button>
            <span id="userWelcome" className="hidden md:inline-block text-[#6b7280] font-medium">
              Welcome, kogoshakokah@gmail.com!
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar (visible only on md and above) */}
        <aside className="hidden md:block w-64 bg-white shadow-lg h-auto sticky top-0">
          <SidebarContent role={role} />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

const SidebarContent = ({ role }: { role: "user" | "admin" }) => {

  const userLinks = [
    { label: "Add", icon: AddIcon, path: "/add" },
    { label: "Home", icon: HomeIcon, path: "/" },
    { label: "My Orders", icon: OrdersIcon, path: "/orders" },
    { label: "Factories", icon: FactoriesIcon, path: "/factories" },
    { label: "My Profile", icon: ProfileIcon, path: "/profile" },
    { label: "Help", icon: HelpIcon, path: "/help" },
  ];

  const adminLinks = [
    { label: "Home", icon: HomeIcon, path: "/dashboard" },
    { label: "Products", icon: OrdersIcon, path: "/dashboard/products" },
    { label: "My Orders", icon: FiFileText, path: "/dashboard/orders" },
    { label: "Delegates", icon: HiOutlineUserGroup, path: "/dashboard/delegates" },
    { label: "Help & Support", icon: HelpIcon, path: "/dashboard/help" },
    { label: "My Account", icon: BsPerson, path: "/dashboard/account" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  const handleLogout = () =>{
    localStorage.clear();
    location.reload();

  }

  return (
    <nav className="md:p-6 space-y-2">
      {links.map(({ label, icon: Icon, path }) => (
        <Link
          to={path}
          key={label}
          className="w-full cursor-pointer flex items-center space-x-3 px-4 py-3 text-left text-[#6b7280] hover:bg-[#86efac] hover:text-white rounded-lg transition duration-200"
        >
          <Icon />
          <span>{label}</span>
        </Link>
      ))}

      <div className="mt-6">
        <button onClick={handleLogout} className="w-full flex items-center cursor-pointer space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition duration-200">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};


/** Simple icons as components to avoid repeating SVG code */
const AddIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const OrdersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const FactoriesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ProfileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const HelpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
