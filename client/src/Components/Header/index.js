// src/components/Header/Header.js

import { Link } from "react-router-dom";
import Logo from "../../assets/images/logoo.png";
import CountryDropdown from "../CountryDropdown";
import Button from "@mui/material/Button";
import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { IoIosMenu, IoIosSearch } from "react-icons/io";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation"; // Use the correct import path
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { IoHeartOutline } from "react-icons/io5";
import { FiUser as FiUserProfile } from "react-icons/fi";
import { BsBookmarksFill } from 'react-icons/bs';
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
    const context = useContext(MyContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
    const open = Boolean(anchorEl);

    const cartItemCount = context.cartItems.length;
    const totalCartPrice = context.cartItems
        ?.reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userFirstName");
        localStorage.removeItem("userEmail");
        context.setIsLogin(false);
        context.setUserFirstName("");
        handleClose();
        toast.success("Logged out successfully");
        window.location.href = "/";
    };

    const toggleMobileSearch = () => {
        setIsMobileSearchVisible(!isMobileSearchVisible);
    };
    
    // Function to close the mobile menu
    const closeMobileNav = () => {
        setMobileNavOpen(false);
    }

    return (
        <>
            <div className="headerWrapper">
                <div className="top-strip bg-blue">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center">
                            Free delivery on orders over <b>R750</b>!
                        </p>
                    </div>
                </div>
                <header className="header">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* Logo */}
                            <div className="logoWrapper col-6 col-sm-2">
                                <Link to={"/"}>
                                    <img src={Logo} alt="Nndwa & Co. Logo" />
                                </Link>
                            </div>

                            {/* Mobile Icons (Hamburger, Search, User, Cart) */}
                            {isMobile && (
                                <div className="mobile-header-icons col-6 d-flex align-items-center justify-content-end">
                                    <Button className="mobile-icon search-toggle" onClick={toggleMobileSearch}>
                                        <IoIosSearch size={25} />
                                    </Button>
                                    <div className="user-icon-container">
                                        {context.isLogin && context.userFirstName ? (
                                            <Button
                                                className="logged-in-user-menu"
                                                onClick={handleClick}
                                            >
                                                <span className="user-name">
                                                    {context.userFirstName}
                                                </span>
                                            </Button>
                                        ) : (
                                            <Link to={"/sign-in"}>
                                                <Button className="circle ml-2">
                                                    <FiUser />
                                                </Button>
                                            </Link>
                                        )}
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            {/* Menu Items */}
                                            <MenuItem onClick={handleClose}>
                                                <Link to="/profile" className="menu-link">
                                                    <FiUserProfile className="mr-2" />
                                                    My Profile
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Link to="/orders" className="menu-link">
                                                    <BsBookmarksFill className="mr-2" />
                                                    My Orders
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Link to="/wishlist" className="menu-link">
                                                    <IoHeartOutline className="mr-2" />
                                                    Wishlist
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleLogout} className="menu-link">
                                                <MdLogout className="mr-2" />
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                    <Button
                                        className="circle cart-icon ml-2"
                                        onClick={() => context.setIsSidebarOpen(true)}
                                    >
                                        <IoCartOutline />
                                        <span className="count d-flex align-items-center justify-content-center">
                                            {cartItemCount}
                                        </span>
                                    </Button>
                                    <Button
                                        className="mobileHamburger ml-2"
                                        onClick={() => setMobileNavOpen(!mobileNavOpen)}
                                    >
                                        <IoIosMenu size={28} />
                                    </Button>
                                </div>
                            )}

                            {/* Desktop header tools */}
                            <div className="col-sm-10 d-none d-sm-flex align-items-center part2">
                                {context.cityList?.length > 0 && <CountryDropdown />}
                                <SearchBox />

                                <div className="part3 d-flex align-items-center ml-auto">
                                    <div className="user-icon-container">
                                        {context.isLogin && context.userFirstName ? (
                                            <>
                                                <Button
                                                    className="logged-in-user-menu"
                                                    onClick={handleClick}
                                                >
                                                    <span className="user-name">{context.userFirstName}</span>
                                                    <FaAngleDown className="ml-2" />
                                                </Button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem onClick={handleClose}>
                                                        <Link to="/profile" className="menu-link">
                                                            <FiUserProfile className="mr-2" />
                                                            My Profile
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClose}>
                                                        <Link to="/orders" className="menu-link">
                                                            <BsBookmarksFill className="mr-2" />
                                                            My Orders
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClose}>
                                                        <Link to="/wishlist" className="menu-link">
                                                            <IoHeartOutline className="mr-2" />
                                                            Wishlist
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleLogout} className="menu-link">
                                                        <MdLogout className="mr-2" />
                                                        Logout
                                                    </MenuItem>
                                                </Menu>
                                            </>
                                        ) : (
                                            <Link to={"/sign-in"}>
                                                <Button className="circle mr-3">
                                                    <FiUser />
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                    <div className="ml-auto cartTab d-flex align-items-center cursor-pointer">
                                        <span className="price mr-2">R{totalCartPrice}</span>
                                        <div className="cart-icon-container ml-2">
                                            <Button
                                                className="circle"
                                                onClick={() => context.setIsSidebarOpen(true)}
                                            >
                                                <IoCartOutline />
                                            </Button>
                                            <span className="count d-flex align-items-center justify-content-center">
                                                {cartItemCount}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isMobileSearchVisible && <SearchBox />}
                </header>
                {/* Pass state and a function to set it to Navigation */}
                <Navigation mobileNavOpen={mobileNavOpen} closeMobileNav={closeMobileNav} />
            </div>
        </>
    );
};

export default Header;