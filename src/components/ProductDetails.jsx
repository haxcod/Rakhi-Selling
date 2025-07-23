import {
  ArrowLeft,
  X,
  Star,
  Minus,
  Plus,
  Truck,
  Gift,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({
  selectedProduct,
  showProductDetails,
  setShowProductDetails,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  // Sample product images - you can modify this based on your product data structure
  const productImages = selectedProduct?.images || [
    selectedProduct?.image,
    selectedProduct?.image, // Placeholder - replace with actual additional images
    selectedProduct?.image, // Placeholder - replace with actual additional images
  ];

  const updateQuantity = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    return selectedProduct.price * quantity;
  };

  const handleBuyNow = () => {
    // setShowProductDetails(false);
     const order = {
    items: [{ ...selectedProduct, qty: quantity }],
    totalAmount: calculateTotal(), // you should define this function
    date: new Date().toISOString()
     }
    navigate('/payment', { state: { order } });
    // navigate("/payment", { state: { product: selectedProduct, quantity } });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center z-[60] justify-between">
          <button
            onClick={() => setShowProductDetails(false)}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
          <button
            onClick={() => setShowProductDetails(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative group">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={`${selectedProduct?.name} - Image ${
                    selectedImageIndex + 1
                  }`}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  {selectedProduct?.offer}
                </div>

                {/* Navigation arrows - show only if more than 1 image */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                    {selectedImageIndex + 1} / {productImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? "border-orange-500 ring-2 ring-orange-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${selectedProduct?.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedProduct?.name}
                </h1>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl font-bold text-orange-500">
                    ₹{selectedProduct?.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{selectedProduct?.originalPrice}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                    {Math.round(
                      ((selectedProduct?.originalPrice -
                        selectedProduct?.price) /
                        selectedProduct?.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    (4.8/5 - 234 reviews)
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{selectedProduct?.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Features
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {selectedProduct?.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-800">Material:</span>
                  <p className="text-gray-600">{selectedProduct?.material}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Size:</span>
                  <p className="text-gray-600">{selectedProduct?.size}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="font-semibold text-gray-800">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(-1)}
                      className="p-2 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-orange-500">₹{calculateTotal()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    Buy Now - ₹{calculateTotal()}
                  </button>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-1 text-green-500" />
                      Free Delivery
                    </div>
                    <div className="flex items-center">
                      <Gift className="w-4 h-4 mr-1 text-blue-500" />
                      Gift Wrapping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
