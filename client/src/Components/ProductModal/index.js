// src/Components/ProductModal.js

import React, { useState, useContext } from 'react'; // Import useState
import Dialog from "@mui/material/Dialog";
import { MdClose } from "react-icons/md";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import QuantityBox from "../QuantityBox";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineCompareArrows } from "react-icons/md";
import { MyContext } from "../../App";
import ProductZoom from "../ProductZoom";
import { IoCartSharp } from "react-icons/io5";
import toast from 'react-hot-toast';

const ProductModal = () => {
  const context = useContext(MyContext);
  const { productModalData, setisOpenProductModal, addToCart } = context;

  // 1. Add state for the product quantity
  const [quantity, setQuantity] = useState(1);

  // Render nothing if no product data is available
  if (!productModalData || Object.keys(productModalData).length === 0) {
    return null;
  }

  const { name, brand, rating, oldPrice, price, description, images } = productModalData;

  // 2. Create the handler for quantity changes
  const onQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  // 3. Update the Add to Cart handler to pass the current quantity
  const handleAddToCart = () => {
    addToCart(productModalData, quantity);

    toast.success(`${name} has been added to cart!`, {
      duration: 2000,
    });
  };

  const totalPrice = price * quantity;

  return (
    <>
      <Dialog
        open={true}
        className="productModal"
        onClose={() => setisOpenProductModal(false)}
      >
        <Button className="closeBtn" onClick={() => setisOpenProductModal(false)}>
          <MdClose />
        </Button>

        <h4 className="mb-1 font-weight-bold">{name}</h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-4">
            <span>Brands:</span>
            <span className="ml-2">
              <b>{brand}</b>
            </span>
          </div>
          <Rating
            name="read-only"
            value={rating}
            size="small"
            precision={0.5}
            readOnly
          />
        </div>

        <hr />

        <div className="row mt-2 productDetailModal">
          <div className="col-md-5">
            <ProductZoom images={images} />
          </div>

          <div className="col-md-7">
            <div className="d-flex info align-items-center mb-3">
              <span className="oldPrice lg mr-2">R{oldPrice.toFixed(2)}</span>
              <span className="netPrice text-danger lg">R{totalPrice.toFixed(2)}</span>
            </div>

            <span className="badge bg-success">IN STOCK</span>

            <p className="mt-3">{description}</p>

            <div className="d-flex align-items-center">
              {/* 4. Pass the quantity and the onQuantityChange handler to QuantityBox */}
              <QuantityBox quantity={quantity} onQuantityChange={onQuantityChange} />

              <Button
                className="btn-blue bg-red btn-lg btn-big"
                onClick={handleAddToCart}
              >
                <IoCartSharp /> ADD TO CART
              </Button>
            </div>

            <div className="d-flex align-items-center mt-5 actions">
              <Button className="btn-round btn-sml" variant="outlined">
                <IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST
              </Button>
              <Button className="btn-round btn-sml ml-3" variant="outlined">
                <MdOutlineCompareArrows /> &nbsp; COMPARE
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductModal;