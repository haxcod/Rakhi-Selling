import { Heart, Truck, Users } from "lucide-react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import b2 from '../assets/b2.avif'

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative max-w-4xl mx-auto aspect-video px-4 mt-5">
          {/* <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16"> */}
            {/* <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                About Raksha Bandhan
              </h1>
              <img
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=400&fit=crop"
                alt="Siblings celebrating Raksha Bandhan"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl object-cover h-auto md:h-[400px]"
              />
            </div> */}
            <img src={b2} alt="banner" className="w-full h-full object-fit rounded-sm" />
          {/* </div> */}
        </div>

        {/* Story Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Why Raksha Bandhan is Celebrated
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  Raksha Bandhan is a beautiful Hindu festival that celebrates
                  the sacred bond between brothers and sisters. The word
                  "Raksha" means protection, and "Bandhan" means bond,
                  symbolizing the promise of protection and care that siblings
                  share.
                </p>
                <p className="mb-6">
                  On this auspicious day, sisters tie a sacred thread called
                  "Rakhi" around their brothers' wrists, praying for their
                  well-being, prosperity, and long life. In return, brothers
                  promise to protect their sisters and often give gifts as a
                  token of their love and commitment.
                </p>
                <p>
                  This festival transcends blood relations and celebrates the
                  spirit of protection and care. It's a day filled with joy,
                  sweets, prayers, and the strengthening of family bonds that
                  have been cherished for generations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Store Info Section */}
        <div className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              About Our Store
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-red-500" />
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Handmade with Love
                </h3>
                <p className="text-gray-600">
                  Each rakhi is carefully crafted by skilled artisans using
                  traditional techniques passed down through generations. Every
                  piece tells a story of love and dedication.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Truck className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Express Delivery
                </h3>
                <p className="text-gray-600">
                  We understand the importance of timely delivery for this
                  special occasion. Our express delivery ensures your rakhi
                  reaches on time, anywhere in India.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  1000+ Happy Customers
                </h3>
                <p className="text-gray-600">
                  Over the years, we've had the privilege of being part of
                  thousands of Raksha Bandhan celebrations, spreading joy and
                  strengthening bonds across families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
