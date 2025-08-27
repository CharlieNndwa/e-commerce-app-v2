import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityBox";
import { IoIosClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { IoCartSharp } from "react-icons/io5";
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

  return (
    <>
      <section className="section cartPage">
        <div className="container">
          <h2 className="hd mb-1">Your Cart</h2>
          <p>
            There are <b className="text-red">{context.cartItems?.length || 0}</b> products in your cart
          </p>
          <div className="row">
            <div className="col-md-9 pr-5">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th width="35%">Product</th>
                      <th width="15%">Unit Price</th>
                      <th width="25%">Quantity</th>
                      <th width="15%">Subtotal</th>
                      <th width="10%">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {context.cartItems?.map((item) => (
                      <tr key={item._id}>
                        <td width="35%">
                          <Link to={`/product/${item._id}`}>
                            <div className="d-flex align-items-center cartItemimgWrapper">
                              <div className="imgWrapper">
                                <img
                                  src={item.images[0]}
                                  alt={item.name}
                                  className="w-100"
                                />
                              </div>
                              <div className="info px-3">
                                <h6>{item.name}</h6>
                                <Rating
                                  name="read-only"
                                  value={item.rating}
                                  precision={0.5}
                                  size="small"
                                  readOnly
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td width="15%">R{item.price.toFixed(2)}</td>
                        <td width="25%">
                          <QuantityBox 
                            item={item}
                            quantity={item.quantity}
                            onQuantityChange={(newQuantity) => updateQuantity(item._id, newQuantity)}
                          />
                        </td>
                        <td width="15%">R{(item.price * item.quantity).toFixed(2)}</td>
                        <td width="10%">
                          <span
                            className="remove"
                            onClick={() => removeItem(item._id)}
                          >
                            <IoIosClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border shadow p-3 cartDetails">
                <h4>CART TOTALS</h4>
                <div className="d-flex align-items-center mb-3">
                  <span>Subtotal</span>
                  <span className="ml-auto text-red font-weight-bold">
                    R{totalPrice}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span>Shipping</span>
                  <span className="ml-auto">Free</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span>Estimate for</span>
                  <span className="ml-auto">
                    <b>Johannesburg</b>
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <span>Total</span>
                  <span className="ml-auto text-red font-weight-bold">
                    R{totalPrice}
                  </span>
                </div>
                <br />
                {/* The link is now set up correctly */}
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                  <Button className="btn-blue bg-red btn-lg btn-big">
                    <IoCartSharp />
                    PROCEED TO CHECKOUT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;