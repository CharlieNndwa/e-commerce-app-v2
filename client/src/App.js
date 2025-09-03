// App.js

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { createContext, useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

// Standard components (not lazy loaded, as they are part of every page)
import Header from "./Components/Header";
import ProductModal from "./Components/ProductModal";
import Footer from "./Components/Footer";
import CartSidebar from "./Components/cartSideBar";

// Lazy-loaded page components
const Home = lazy(() => import("./Pages/Home"));
const AllProducts = lazy(() => import("./Pages/AllProducts"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails"));
const Cart = lazy(() => import("./Pages/Cart"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Refunds = lazy(() => import("./Components/RefundsReturnsPolicy"));
const CheckoutPage = lazy(() => import("./Pages/Checkout"));
const WishlistPage = lazy(() => import("./Pages/Wishlist"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));
const OrdersPage = lazy(() => import("./Pages/OrdersPage"));
const Terms = lazy(() => import("./Components/Terms&Services"));
const AboutUs = lazy(() => import("./Components/AboutUs"));
const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
const PaymentsPage = lazy(() => import("./Components/Payments"));
const QueriesPage = lazy(() => import("./Components/FAQS"));
const ContactUs = lazy(() => import("./Components/ContactUs"));
const Careers = lazy(() => import("./Components/Careers"));
const Competitions = lazy(() => import("./Components/Competitions"));


const MyContext = createContext();

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Custom loading component with orange spinner
const FallbackLoader = () => (
    <div className="loading-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', textAlign: 'center', color: '#ffa500', fontSize: '1.2rem', fontWeight: 'bold' }}>
        <PulseLoader color="#ffa500" />
        <p className="mt-3">Loading...</p>
    </div>
);

function App() {
    const [isOpenProductModal, setisOpenProductModal] = useState(false);
    const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
    const [productModalData, setProductModalData] = useState({});
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
    const [userFirstName, setUserFirstName] = useState(localStorage.getItem("userFirstName") || "");
    const [userWishlist, setUserWishlist] = useState([]);
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userFirstName");
        localStorage.removeItem("userEmail");
        setIsLogin(false);
        setUserFirstName("");
        setUserWishlist([]);
        setCartItems([]);
        toast.success("Logged out successfully!");
        navigate('/sign-in');
    };

    const handleLogin = (userData) => {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userFirstName", userData.firstName);
        localStorage.setItem("userEmail", userData.email);
        setIsLogin(true);
        setUserFirstName(userData.firstName);
        toast.success("Logged in successfully!");
        navigate('/');
    };

    const fetchUserWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get("http://localhost:8080/api/wishlist", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserWishlist(response.data.wishlist);
            } else {
                setUserWishlist([]);
            }
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
        }
    };

    const saveCartToBackend = async (cartData) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Adjusting to Platzi API's 'id' field
                const sanitizedCart = cartData.map(({ id, quantity }) => ({ productId: id, quantity }));
                await axios.post(
                    "http://localhost:8080/cart",
                    { cartItems: sanitizedCart },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
        } catch (error) {
            console.error("Failed to save cart to backend:", error);
        }
    };

    const fetchCartFromBackend = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get("http://localhost:8080/cart", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.cart) {
                    const fetchedCartItems = response.data.cart.map(item => {
                        // Finding product with 'id' from Platzi API
                        const product = productList.find(p => p.id.toString() === item.productId);
                        return product ? { ...product, quantity: item.quantity } : null;
                    }).filter(Boolean);
                    setCartItems(fetchedCartItems);
                } else {
                    setCartItems([]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch cart from backend:", error);
        }
    };

    const addToCart = (product, quantity = 1) => {
        // Adjusting to Platzi API's 'id' field
        const existingItem = cartItems.find((item) => item.id === product.id);
        let updatedCart;
        if (existingItem) {
            updatedCart = cartItems.map((item) =>
                item.id === product.id
                    ? { ...existingItem, quantity: existingItem.quantity + quantity }
                    : item
            );
        } else {
            updatedCart = [...cartItems, { ...product, quantity }];
        }
        setCartItems(updatedCart);
        // Adjusting to Platzi API's 'title' field
        toast.success(`${product.title} added to cart!`);
    };

    const removeCartItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
        if (isLogin) {
            saveCartToBackend(updatedCart);
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        if (isLogin) {
            saveCartToBackend(updatedCart);
        }
    };
    
    // Function to fetch products from Platzi API
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=200');
            setProductList(response.data);
            setIsReady(true);
        } catch (error) {
            console.error("Error fetching products:", error);
            setIsReady(false);
        }
    };

    // Function to fetch categories from Platzi API
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories?offset=0&limit=10');
            setCategoryList(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchAllProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const firstName = urlParams.get('firstName');
        const email = urlParams.get('email');

        if (token && firstName && email) {
            handleLogin({ token, firstName, email });
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    useEffect(() => {
        if (isLogin && isReady) {
            fetchCartFromBackend();
            fetchUserWishlist();
        } else if (!isLogin) {
            setCartItems([]);
            setUserWishlist([]);
        }
    }, [isLogin, isReady]);

    useEffect(() => {
        if (isLogin) {
            saveCartToBackend(cartItems);
        }
    }, [cartItems, isLogin]);

    const values = {
        isOpenProductModal,
        setisOpenProductModal,
        isHeaderFooterShow,
        setisHeaderFooterShow,
        isLogin,
        setIsLogin,
        userFirstName,
        setUserFirstName,
        productModalData,
        setProductModalData,
        productList,
        setProductList,
        categoryList,
        isReady,
        cartItems,
        setCartItems,
        addToCart,
        removeCartItem,
        updateQuantity,
        isSidebarOpen,
        setIsSidebarOpen,
        userWishlist,
        fetchUserWishlist,
        signOut,
    };

    return (
        <MyContext.Provider value={values}>
            {isHeaderFooterShow && <Header />}
            <div className="content-area">
                <Suspense fallback={<FallbackLoader />}>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/allproducts" element={<AllProducts />} />
                        <Route path="/products/:category" element={<AllProducts />} />
                        <Route path="/product/:productId" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/sign-in" element={<SignIn handleLogin={handleLogin} />} />
                        <Route path="/sign-up" element={<SignUp handleLogin={handleLogin} />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/refund-returns" element={<Refunds />} />
                        <Route path="/terms-and-conditions" element={<Terms />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/payments" element={<PaymentsPage />} />
                        <Route path="/queries" element={<QueriesPage />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/competitions" element={<Competitions />} />
                    </Routes>
                </Suspense>
            </div>
            {isHeaderFooterShow && <Footer />}
            {isOpenProductModal && <ProductModal />}
            <Toaster position="top-center" reverseOrder={false} />
            <CartSidebar />
        </MyContext.Provider>
    );
}

const AppWrapper = () => (
    <BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>
);

export default AppWrapper;
export { MyContext };