import React, { useContext } from "react";
import { MyContext } from "../../App";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MdClose } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const context = useContext(MyContext);

  const totalPrice = context.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Drawer
      anchor="right"
      open={context.isSidebarOpen}
      onClose={() => context.setIsSidebarOpen(false)}
    >
      <Box
        sx={{
          width: { xs: '100vw', sm: 350 }, // Full width on small screens, fixed on larger screens
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        role="presentation"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #eee",
          }}
        >
          <Typography variant="h6">My Shopping Cart</Typography>
          <IconButton onClick={() => context.setIsSidebarOpen(false)}>
            <MdClose />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
          {context.cartItems.length === 0 ? (
            <Box sx={{ textAlign: "center", pt: 5, color: "grey.500" }}>
              Your cart is empty.
            </Box>
          ) : (
            context.cartItems.map((item) => (
              <Box
                key={item._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  pb: 1,
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Box sx={{ width: 80, height: 80, mr: 2 }}>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Link
                    to={`/product/${item._id}`}
                    onClick={() => context.setIsSidebarOpen(false)}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography variant="body1" component="h6" sx={{ fontSize: 14 }}>
                      {item.name}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    R{item.price.toFixed(2)} x {item.quantity}
                  </Typography>
                </Box>
                <IconButton onClick={() => context.removeCartItem(item._id)}>
                  <RiDeleteBin6Line />
                </IconButton>
              </Box>
            ))
          )}
        </Box>

        <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Subtotal</Typography>
            <Typography variant="h6">R{totalPrice.toFixed(2)}</Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 1, backgroundColor: "#233a95", '&:hover': { backgroundColor: '#1a2a6b' } }}
            component={Link}
            to="/cart"
            onClick={() => context.setIsSidebarOpen(false)}
          >
            VIEW CART
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/checkout"
            fullWidth
            sx={{ backgroundColor: "#38761d", '&:hover': { backgroundColor: '#2e5c17' } }}
          >
            SECURE CHECKOUT
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;