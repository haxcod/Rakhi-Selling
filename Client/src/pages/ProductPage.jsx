import { useCallback, useEffect, useState } from "react";
import {
  Heart,
  Star,
  Eye,
} from "lucide-react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  // Sample product data
  // const products = [
  //   {
  //     id: 1,
  //     name: "Elegant Golden Rakhi Set",
  //     price: 299,
  //     originalPrice: 399,
  //     rating: 4.8,
  //     reviews: 156,
  //     category: "premium",
  //     images: [
  //       "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
  //       "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
  //       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  //     ],
  //     description:
  //       "Handcrafted golden rakhi with traditional motifs and premium finishing.",
  //     features: [
  //       "Handmade",
  //       "Premium Quality",
  //       "Traditional Design",
  //       "Gift Box Included",
  //     ],
  //     inStock: true,
  //     badge: "Bestseller",
  //   },
  //   {
  //     id: 2,
  //     name: "Traditional Thread Rakhi Pack",
  //     price: 149,
  //     originalPrice: 199,
  //     rating: 4.5,
  //     reviews: 89,
  //     category: "traditional",
  //     images: [
  //       "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
  //       "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
  //     ],
  //     description:
  //       "Set of 3 colorful traditional thread rakhis with beautiful patterns.",
  //     features: [
  //       "Pack of 3",
  //       "Colorful Threads",
  //       "Traditional Pattern",
  //       "Affordable",
  //     ],
  //     inStock: true,
  //     badge: "Value Pack",
  //   },
  //   {
  //     id: 3,
  //     name: "Designer Pearl Rakhi",
  //     price: 399,
  //     originalPrice: 499,
  //     rating: 4.9,
  //     reviews: 203,
  //     category: "designer",
  //     images: [
  //       "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
  //       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  //     ],
  //     description:
  //       "Exquisite pearl-adorned rakhi with intricate beadwork and elegant design.",
  //     features: [
  //       "Pearl Beads",
  //       "Intricate Design",
  //       "Premium Packaging",
  //       "Limited Edition",
  //     ],
  //     inStock: true,
  //     badge: "Premium",
  //   },
  //   {
  //     id: 4,
  //     name: "Kids Fun Cartoon Rakhi",
  //     price: 99,
  //     originalPrice: 149,
  //     rating: 4.6,
  //     reviews: 124,
  //     category: "kids",
  //     images: [
  //       "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
  //     ],
  //     description: "Colorful cartoon-themed rakhi perfect for little brothers.",
  //     features: [
  //       "Kid-Friendly",
  //       "Cartoon Design",
  //       "Bright Colors",
  //       "Safe Materials",
  //     ],
  //     inStock: true,
  //     badge: "Kids Special",
  //   },
  //   {
  //     id: 5,
  //     name: "Silver Plated Royal Rakhi",
  //     price: 599,
  //     originalPrice: 799,
  //     rating: 4.7,
  //     reviews: 78,
  //     category: "premium",
  //     images: [
  //       "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
  //     ],
  //     description:
  //       "Royal silver-plated rakhi with traditional kundan work and premium velvet box.",
  //     features: ["Silver Plated", "Kundan Work", "Velvet Box", "Royal Design"],
  //     inStock: false,
  //     badge: "Limited",
  //   },
  //   {
  //     id: 6,
  //     name: "Eco-Friendly Natural Rakhi",
  //     price: 179,
  //     originalPrice: 229,
  //     rating: 4.4,
  //     reviews: 67,
  //     category: "eco",
  //     images: [
  //       "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
  //     ],
  //     description:
  //       "Environment-friendly rakhi made from natural materials and organic dyes.",
  //     features: [
  //       "Eco-Friendly",
  //       "Natural Materials",
  //       "Organic Dyes",
  //       "Biodegradable",
  //     ],
  //     inStock: true,
  //     badge: "Eco-Special",
  //   },
  // ];

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = "https://bandhanbliss.vercel.app/api/products";
      if (category) {
        url += `?category=${encodeURIComponent(category)}`;
      }

      const response = await axios.get(url);
      console.log(response);
      
      setProducts(response.data.products);
      console.log("Fetched products:", response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    } finally {
      setLoading(false);
    }
  }, [category]); // make sure to add `category` in the dependency array

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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Rakhi Collection 2025</h1>
              <p className="text-xl opacity-90">
                Celebrate the bond of love with our beautiful rakhi designs
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Products Grid/List */}
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

        {/* Product Quick View Modal */}
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

export default ProductPage;
