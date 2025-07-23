import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Heart,
  Star,
  CheckCircle,
  User,
  Calendar,
  Headphones,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Truck,
  RotateCcw,
  Award,
} from "lucide-react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "../components/Button";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "order", label: "Order Support" },
    { value: "custom", label: "Custom Orders" },
    { value: "wholesale", label: "Wholesale/Bulk Orders" },
    { value: "complaint", label: "Complaint/Issue" },
    { value: "feedback", label: "Feedback/Suggestion" },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91 98765 43210", "+91 87654 32109"],
      subtitle: "Mon-Sat: 9:00 AM - 8:00 PM",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@bandhanbliss.com", "orders@bandhanbliss.com"],
      subtitle: "We'll respond within 24 hours",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Traditional Street", "Kanpur, Uttar Pradesh 208001"],
      subtitle: "Open Mon-Sat: 10:00 AM - 7:00 PM",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      details: ["Chat with our experts", "Instant support available"],
      subtitle: "Available 24/7",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "We offer free shipping across India with delivery in 3-7 business days. Express shipping is available for faster delivery.",
    },
    {
      question: "Do you accept custom rakhi orders?",
      answer:
        "Yes! We specialize in custom rakhi designs. Contact us with your requirements and we'll create something special for you.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 7-day return policy for unused items in original packaging. Custom orders are non-returnable.",
    },
    {
      question: "Do you offer bulk discounts?",
      answer:
        "Yes, we provide attractive discounts for bulk orders above 50 pieces. Contact us for wholesale pricing.",
    },
    {
      question: "Are your rakhis handmade?",
      answer:
        "Most of our rakhis are handcrafted by skilled artisans. We clearly mention the crafting method in each product description.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment:
        "Amazing quality rakhis! My brother loved the custom design. Excellent customer service too.",
      location: "Delhi",
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      comment:
        "Fast delivery and beautiful packaging. The rakhi looked exactly like the photo. Highly recommended!",
      location: "Mumbai",
    },
    {
      name: "Anjali Gupta",
      rating: 4,
      comment:
        "Great variety of designs. The traditional rakhis were perfect for our family celebration.",
      location: "Pune",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              We're here to help you celebrate the beautiful bond of Raksha
              Bandhan. Reach out to us for any questions, custom orders, or
              support.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <div className="flex  justify-evenly mb-8 bg-white rounded-2xl shadow-lg py-2">
            {[
              { key: "contact", label: "Contact Us", icon: Phone },
              { key: "faq", label: "FAQs", icon: MessageCircle },
              { key: "testimonials", label: "Reviews", icon: Star },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === key
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll respond within 24
                      hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Inquiry Type
                        </label>
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        >
                          {inquiryTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Brief subject of your message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Please provide details about your inquiry..."
                      ></textarea>
                    </div>

                    {/* <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button> */}
                    <Button handleSubmit={handleSubmit} isProgress={isSubmitted} text={'Send Message'}/>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${info.bgColor}`}>
                          <info.icon className={`w-6 h-6 ${info.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {info.title}
                          </h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-800 font-medium">
                              {detail}
                            </p>
                          ))}
                          <p className="text-sm text-gray-600 mt-1">
                            {info.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    {[
                      {
                        icon: Facebook,
                        color: "text-blue-600",
                        bg: "bg-blue-100",
                      },
                      {
                        icon: Instagram,
                        color: "text-pink-600",
                        bg: "bg-pink-100",
                      },
                      {
                        icon: Twitter,
                        color: "text-blue-400",
                        bg: "bg-blue-100",
                      },
                      {
                        icon: Youtube,
                        color: "text-red-600",
                        bg: "bg-red-100",
                      },
                    ].map((social, index) => (
                      <button
                        key={index}
                        className={`p-3 rounded-xl ${social.bg} hover:scale-110 transition-transform duration-200`}
                      >
                        <social.icon className={`w-6 h-6 ${social.color}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Why Choose BandhanBliss?
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Award,
                        text: "Premium Quality Rakhis",
                        color: "text-yellow-600",
                      },
                      {
                        icon: Truck,
                        text: "Free Shipping Across India",
                        color: "text-green-600",
                      },
                      {
                        icon: Shield,
                        text: "100% Secure Payments",
                        color: "text-blue-600",
                      },
                      {
                        icon: RotateCcw,
                        text: "7-Day Easy Returns",
                        color: "text-purple-600",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Find answers to common questions about our products and
                  services
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="text-orange-500 group-open:rotate-180 transition-transform duration-200">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">Still have questions?</p>
                <button
                  onClick={() => setActiveTab("contact")}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                >
                  Contact Us Directly
                </button>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  What Our Customers Say
                </h2>
                <p className="text-lg text-gray-600">
                  Read reviews from our happy customers across India
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 italic">
                      "{testimonial.comment}"
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Share Your Experience
                  </h3>
                  <p className="text-lg opacity-90 mb-6">
                    We'd love to hear about your BandhanBliss experience! Your
                    feedback helps us serve you better.
                  </p>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
