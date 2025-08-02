import { Eye, Gift, Heart, Star, Truck, Users } from "lucide-react";
import b1 from "../assets/b1.avif";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from "../components/ProductDetails";

const HomePage = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const rakhiProducts = [
  //   {
  //     id: 1,
  //     name: "Traditional Bhaiya Rakhi",
  //     price: 149,
  //     originalPrice: 199,
  //     image:
  //       r1,
  //     offer: "BESTSELLER",
  //     description:
  //       "Beautiful traditional rakhi with intricate gold thread work and colorful beads. Perfect for your beloved brother.",
  //     features: [
  //       "Handmade with love",
  //       "Gold thread work",
  //       "Colorful beads",
  //       "Includes roli and chawal",
  //     ],
  //     material: "Silk thread, Gold thread, Glass beads",
  //     size: "2.5 inches diameter",
  //     category:"TraditionalRakhi",
  //   },
  //   {
  //     id: 2,
  //     name: "Designer Gold Rakhi",
  //     price: 299,
  //     originalPrice: 399,
  //     image:
  //       r2,
  //     offer: "25% OFF",
  //     description:
  //       "Elegant designer rakhi with premium gold finish and kundan stones. A perfect blend of tradition and style.",
  //     features: [
  //       "Premium gold finish",
  //       "Kundan stones",
  //       "Designer pattern",
  //       "Gift box included",
  //     ],
  //     material: "Gold plated, Kundan stones, Silk thread",
  //     size: "3 inches diameter",
  //     category:"GoldRakhi"
  //   },
  //   {
  //     id: 3,
  //     name: "Kundan Pearl Rakhi",
  //     price: 199,
  //     originalPrice: 249,
  //     image:
  //       r3,
  //     offer: "UNDER ₹99",
  //     description:
  //       "Delicate rakhi adorned with kundan and pearls. Represents purity and elegance in traditional style.",
  //     features: [
  //       "Natural pearls",
  //       "Kundan work",
  //       "Soft silk base",
  //       "Elegant design",
  //     ],
  //     material: "Natural pearls, Kundan, Silk thread",
  //     size: "2 inches diameter",
  //     category:"KundanPearlRakhi",
  //   },
  //   {
  //     id: 4,
  //     name: "Combo Pack (Set of 3)",
  //     price: 399,
  //     originalPrice: 599,
  //     image:r4,
  //     offer: "BUY 1 GET 1",
  //     description:
  //       "Complete combo pack with 3 different styled rakhis. Perfect for families with multiple brothers.",
  //     features: [
  //       "3 different designs",
  //       "Value pack",
  //       "Includes sweets packet",
  //       "Free gift wrapping",
  //     ],
  //     material: "Mixed materials, Silk threads, Beads",
  //     size: "Assorted sizes",
  //     category:"ComboPack"
  //   },
  //   {
  //     id: 5,
  //     name: "Kids Cartoon Rakhi",
  //     price: 99,
  //     originalPrice: 149,
  //     image:
  //       r5,
  //     offer: "KIDS SPECIAL",
  //     description:
  //       "Fun and colorful cartoon-themed rakhi specially designed for little brothers. Safe and comfortable.",
  //     features: [
  //       "Child-safe materials",
  //       "Colorful design",
  //       "Cartoon characters",
  //       "Soft and comfortable",
  //     ],
  //     material: "Safe plastic, Soft fabric, Non-toxic colors",
  //     size: "1.5 inches diameter",
  //     category: "KidsRakhi"
  //   },
  //   {
  //     id: 6,
  //     name: "Premium Silver Rakhi",
  //     price: 499,
  //     originalPrice: 699,
  //     image:
  //       r6,
  //     offer: "PREMIUM",
  //     description:
  //       "Luxurious silver rakhi with intricate craftsmanship. A symbol of eternal bond and premium quality.",
  //     features: [
  //       "Pure silver plating",
  //       "Intricate craftsmanship",
  //       "Premium packaging",
  //       "Certificate included",
  //     ],
  //     material: "Silver plated, Premium thread, Crystal stones",
  //     size: "3.5 inches diameter",
  //     category:"SilverRakhi"
  //   },
  // ];
  const navigate = useNavigate();

  //   const handleProductClick = (product) => {
  //   // setSelectProduct(product);
  //   // setShowProductDetails(true);
  //   navigate(`/products?category=${product.category}`);

  // };
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = "https://bandhanbliss.vercel.app/api/products";
      const response = await axios.get(url);
      console.log(response);

      setProducts(response.data.products);
      console.log("Fetched products:", response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    } finally {
      setLoading(false);
    }
  }, []); // make sure to add `category` in the dependency array

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (newCart) => {
    // setCart(newCart);
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemExists = existingCart?.find((item) => item._id === newCart._id);
    if (itemExists) {
      // If exists, update quantity
      const updatedCart = existingCart?.map((item) =>
        item._id === newCart._id ? { ...item, qty: item.qty + 1 } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      // If new, add to cart
      const updatedCart = [...existingCart, { ...newCart, qty: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
    navigate("/cart");
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
            {product.offer}
          </span>
        </div>
        <div className="absolute top-3 right-3 space-y-2">
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => setSelectedProduct(product)}
            className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          </div>
          <span className="text-sm text-green-600 font-medium">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        </div>

        <button
          disabled={product.stock === 0}
          onClick={() => handleAddToCart(product)}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            product.stock !== 0
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg transform hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.stock !== 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
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
          <img
            src={b1}
            alt="banner"
            className="w-full h-full object-fit rounded-sm"
            onClick={() => navigate("/products")}
          />
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
            <div className="flex flex-col items-center justify-center">
              {products?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
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

        {selectedProduct && (
          // <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          //   <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          //     <div className="p-6">
          //       <div className="flex justify-between items-center mb-6">
          //         <h3 className="text-2xl font-bold">Quick View</h3>
          //         <button
          //           onClick={() => setSelectedProduct(null)}
          //           className="p-2 hover:bg-gray-100 rounded-full"
          //         >
          //           <X className="w-6 h-6" />
          //         </button>
          //       </div>

          //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          //         {/* Images */}
          //         <div>
          //           <div className="mb-4">
          //             <img
          //               src={selectedProduct.images[selectedImage]}
          //               alt={selectedProduct.name}
          //               className="w-full h-64 object-cover rounded-lg"
          //             />
          //           </div>
          //           {selectedProduct.images.length > 1 && (
          //             <div className="flex space-x-2">
          //               {selectedProduct.images.map((img, index) => (
          //                 <button
          //                   key={index}
          //                   onClick={() => setSelectedImage(index)}
          //                   className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
          //                     selectedImage === index ? 'border-orange-500' : 'border-gray-200'
          //                   }`}
          //                 >
          //                   <img src={img} alt="" className="w-full h-full object-cover" />
          //                 </button>
          //               ))}
          //             </div>
          //           )}
          //         </div>

          //         {/* Details */}
          //         <div>
          //           <h4 className="text-xl font-bold mb-2">{selectedProduct.name}</h4>

          //           <div className="flex items-center mb-4">
          //             <div className="flex items-center">
          //               {[...Array(5)].map((_, i) => (
          //                 <Star
          //                   key={i}
          //                   className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          //                 />
          //               ))}
          //             </div>
          //             <span className="text-sm text-gray-600 ml-2">({selectedProduct.reviews} reviews)</span>
          //           </div>

          //           <div className="flex items-center space-x-3 mb-4">
          //             <span className="text-2xl font-bold text-gray-900">₹{selectedProduct.price}</span>
          //             <span className="text-lg text-gray-500 line-through">₹{selectedProduct.originalPrice}</span>
          //             <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
          //               {Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}% OFF
          //             </span>
          //           </div>

          //           <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

          //           <div className="mb-6">
          //             <h5 className="font-semibold mb-3">Features:</h5>
          //             <div className="flex flex-wrap gap-2">
          //               {selectedProduct.features.map((feature, index) => (
          //                 <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          //                   {feature}
          //                 </span>
          //               ))}
          //             </div>
          //           </div>

          //           {selectedProduct.inStock && (
          //             <div className="flex items-center space-x-4 mb-6">
          //               <label className="font-medium">Quantity:</label>
          //               <div className="flex items-center border border-gray-300 rounded-lg">
          //                 <button
          //                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
          //                   className="p-2 hover:bg-gray-100"
          //                 >
          //                   <Minus className="w-4 h-4" />
          //                 </button>
          //                 <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
          //                 <button
          //                   onClick={() => setQuantity(quantity + 1)}
          //                   className="p-2 hover:bg-gray-100"
          //                 >
          //                   <Plus className="w-4 h-4" />
          //                 </button>
          //               </div>
          //             </div>
          //           )}

          //           <div className="flex space-x-3">
          //             <button
          //               disabled={!selectedProduct.inStock}
          //               className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
          //                 selectedProduct.inStock
          //                   ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
          //                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          //               }`}
          //             >
          //               <ShoppingCart className="w-5 h-5 inline mr-2" />
          //               {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
          //             </button>
          //             <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          //               <Share2 className="w-5 h-5" />
          //             </button>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>

          <ProductDetails
            selectedProduct={selectedProduct}
            setShowProductDetails={() => setSelectedProduct(null)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
