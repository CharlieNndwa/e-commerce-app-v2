import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // For a custom rating component
import QuantityBox from "../../Components/QuantityBox";
import { useContext } from "react";
import { MyContext } from "../../App";

const Cart = () => {
  const context = useContext(MyContext);

  const updateQuantity = (productId, newQuantity) => {
    // This logic should ideally be in App.js and passed down via context
    // For now, let's update the state directly if it's not too complex
    const updatedCartItems = context.cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    context.setCartItems(updatedCartItems);
  };

  const removeItem = (productId) => {
    // This function already exists in your App.js, so you can just call it
    context.removeCartItem(productId);
  };

  const totalPrice = context.cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ).toFixed(2);

  // Custom Rating component using react-icons
  const Rating = ({ value }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - 0.5 === value) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return <div className="flex text-sm">{stars}</div>;
  };

  return (
    <section className="bg-gray-100 py-8 sm:py-12 min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Your Cart</h2>
        <p className="text-gray-600 mb-8">
          There are <b className="text-blue-600">{context.cartItems?.length || 0}</b> products in your cart
        </p>

        {context.cartItems?.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-lg text-gray-500">Your cart is empty.</p>
            <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {context.cartItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/product/${item._id}`} className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16 mr-4">
                              <img
                                className="h-full w-full object-cover rounded-md"
                                src={item.images[0]}
                                alt={item.name}
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</span>
                              <Rating value={item.rating} />
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          R{item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <QuantityBox
                            item={item}
                            quantity={item.quantity}
                            onQuantityChange={(newQuantity) => updateQuantity(item._id, newQuantity)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                          R{(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                            onClick={() => removeItem(item._id)}
                          >
                            <IoIosClose className="h-6 w-6" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cart Totals Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">CART TOTALS</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <strong className="text-lg text-blue-600">R{totalPrice}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-800">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimate for</span>
                    <span className="font-semibold text-gray-800">
                      Johannesburg
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-4 border-gray-200">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-extrabold text-blue-600">
                      R{totalPrice}
                    </span>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/checkout" className="block text-center">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <IoCartSharp className="h-5 w-5 mr-2" />
                      PROCEED TO CHECKOUT
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;