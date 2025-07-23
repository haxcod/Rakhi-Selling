import { useState } from "react";
import {
  Heart,
  LogOut,
  Menu,
  User,
  X,
  ChevronDown,
  Settings,
  UserCircle,
  Bell,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { key: "home", label: "Home" },
  { key: "products", label: "Products" },
  { key: "cart", label: "Cart" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage =
    location.pathname === "/" ? "home" : location.pathname.slice(1);

  // Demo states - you can replace with real auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsUserMenuOpen(false);
  };

  const handleLogin = () => {
    // Demo login - replace with actual auth
    setIsLoggedIn(true);
    setUser({
      name: "John Doe",
      email: "john@example.com",
      avatar: null,
    });
  };

  // const navigate = (page) => {
  //   setCurrentPage(page);
  //   setIsMenuOpen(false);
  // };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                BandhanBliss
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex ml-10 items-baseline space-x-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.key === "home" ? "/" : `/${item.key}`)}
                className={`px-4 py-2 rounded-lg capitalize text-sm font-medium transition-all duration-200 ${
                  currentPage === item.key
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md transform scale-105"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      Hi, {user?.name?.split(" ")[0]}
                    </p>
                    <p className="text-xs text-gray-500">Welcome back!</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-bold">
                          {user?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user?.name}
                          </p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* <div className="py-1">
                      <button className="flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-gray-50 transition-colors duration-150">
                        <UserCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">My Profile</span>
                      </button>
                      <button className="flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-gray-50 transition-colors duration-150">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </button>
                      <button className="flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-gray-50 transition-colors duration-150">
                        <Bell className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">Notifications</span>
                      </button>
                    </div>
                     */}
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-red-50 transition-colors duration-150 text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-2 bg-white border-t border-gray-100">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => navigate(item.key === "home" ? "/" : `/${item.key}`)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-200 ${
                    currentPage === item.key
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-gray-100 pt-3 mt-3">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    {/* <button className="flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg transition-colors duration-150">
                      <UserCircle className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">My Profile</span>
                    </button>
                    
                    <button className="flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg transition-colors duration-150">
                      <Settings className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">Settings</span>
                    </button> */}

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-red-50 rounded-lg transition-colors duration-150 text-red-600"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleLogin();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        handleLogin();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md transition-all duration-200"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for mobile dropdown */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div
          className="fixed bg-black/30 backdrop-blur-lg z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
