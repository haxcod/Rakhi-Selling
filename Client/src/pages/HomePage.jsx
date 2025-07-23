import { Gift, Star, Truck, Users } from "lucide-react";
import r2 from '../assets/r1.avif'
import r5 from '../assets/r2.jpg'
import r1 from '../assets/r3.webp'
import r3 from '../assets/r5.jpg'
import r6 from '../assets/r4.webp'
import b1 from '../assets/b1.avif'
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const rakhiProducts = [
    {
      id: 1,
      name: "Traditional Bhaiya Rakhi",
      price: 149,
      originalPrice: 199,
      image:
        r1,
      offer: "BESTSELLER",
      description:
        "Beautiful traditional rakhi with intricate gold thread work and colorful beads. Perfect for your beloved brother.",
      features: [
        "Handmade with love",
        "Gold thread work",
        "Colorful beads",
        "Includes roli and chawal",
      ],
      material: "Silk thread, Gold thread, Glass beads",
      size: "2.5 inches diameter",
      category:"TraditionalRakhi",
    },
    {
      id: 2,
      name: "Designer Gold Rakhi",
      price: 299,
      originalPrice: 399,
      image:
        r2,
      offer: "25% OFF",
      description:
        "Elegant designer rakhi with premium gold finish and kundan stones. A perfect blend of tradition and style.",
      features: [
        "Premium gold finish",
        "Kundan stones",
        "Designer pattern",
        "Gift box included",
      ],
      material: "Gold plated, Kundan stones, Silk thread",
      size: "3 inches diameter",
      category:"GoldRakhi"
    },
    {
      id: 3,
      name: "Kundan Pearl Rakhi",
      price: 199,
      originalPrice: 249,
      image:
        r3,
      offer: "UNDER ₹99",
      description:
        "Delicate rakhi adorned with kundan and pearls. Represents purity and elegance in traditional style.",
      features: [
        "Natural pearls",
        "Kundan work",
        "Soft silk base",
        "Elegant design",
      ],
      material: "Natural pearls, Kundan, Silk thread",
      size: "2 inches diameter",
      category:"KundanPearlRakhi",
    },
    {
      id: 4,
      name: "Combo Pack (Set of 3)",
      price: 399,
      originalPrice: 599,
      image:
        "https://images.unsplash.com/photo-1597149443807-35488c38daef?w=400&h=400&fit=crop",
      offer: "BUY 1 GET 1",
      description:
        "Complete combo pack with 3 different styled rakhis. Perfect for families with multiple brothers.",
      features: [
        "3 different designs",
        "Value pack",
        "Includes sweets packet",
        "Free gift wrapping",
      ],
      material: "Mixed materials, Silk threads, Beads",
      size: "Assorted sizes",
      category:"ComboPack"
    },
    {
      id: 5,
      name: "Kids Cartoon Rakhi",
      price: 99,
      originalPrice: 149,
      image:
        r5,
      offer: "KIDS SPECIAL",
      description:
        "Fun and colorful cartoon-themed rakhi specially designed for little brothers. Safe and comfortable.",
      features: [
        "Child-safe materials",
        "Colorful design",
        "Cartoon characters",
        "Soft and comfortable",
      ],
      material: "Safe plastic, Soft fabric, Non-toxic colors",
      size: "1.5 inches diameter",
      category: "KidsRakhi"
    },
    {
      id: 6,
      name: "Premium Silver Rakhi",
      price: 499,
      originalPrice: 699,
      image:
        r6,
      offer: "PREMIUM",
      description:
        "Luxurious silver rakhi with intricate craftsmanship. A symbol of eternal bond and premium quality.",
      features: [
        "Pure silver plating",
        "Intricate craftsmanship",
        "Premium packaging",
        "Certificate included",
      ],
      material: "Silver plated, Premium thread, Crystal stones",
      size: "3.5 inches diameter",
      category:"SilverRakhi"
    },
  ];
  const navigate = useNavigate();

  const handleProductClick = (product) => {
  // setSelectProduct(product);
  // setShowProductDetails(true);
  navigate(`/products?category=${product.category}`);

};
  return (
    <>
    <Navbar/>
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative mx-auto px-4 sm:px-6 mt-2 aspect-video">
        {/* <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Raksha Bandhan
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Celebrate the Bond of Love
            </p>
            <div className="bg-white bg-opacity-90 rounded-lg p-6 max-w-md mx-auto">
              <img
                src={b1}
                alt="Raksha Bandhan Banner"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Special Offers!
              </h2>
              <p className="text-gray-600">
                Buy 1 Get 1 Free • Under ₹99 • Free Delivery
              </p>
            </div>
          </div>
        </div> */}
         <img src={b1} alt="banner" className="w-full h-full object-fit rounded-sm" onClick={()=>navigate('/products')}/>
      </div>

      {/* Offers Section */}
      <div className="py-12 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md text-center hover:shadow-lg transition-shadow">
              <Gift className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h3 className="font-semibold text-sm">Buy 1 Get 1</h3>
              <p className="text-xs text-gray-600">Selected Items</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center hover:shadow-lg transition-shadow">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <h3 className="font-semibold text-sm">Under ₹99</h3>
              <p className="text-xs text-gray-600">Budget Friendly</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center hover:shadow-lg transition-shadow">
              <Truck className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold text-sm">Free Delivery</h3>
              <p className="text-xs text-gray-600">Above ₹299</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center hover:shadow-lg transition-shadow">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold text-sm">1000+ Happy</h3>
              <p className="text-xs text-gray-600">Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Rakhis */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Rakhis
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rakhiProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative">
                  <img
                    loading="lazy"
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto aspect-square object-scale-down"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                    {product.offer}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm sm:text-base mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-orange-500">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        // setCurrentPage("details");
                        // setSelectedRakhi(product.name);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* {showProductDetails && (
        <ProductDetails
          selectedProduct={selectProduct}
          showProductDetails={showProductDetails}
          setShowProductDetails={setShowProductDetails}
        />
      )} */}
    </div>
    <Footer/>
    </>
  );
};

export default HomePage;
