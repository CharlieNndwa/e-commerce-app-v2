// src/components/Navigation/Navigation.js

import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { PRODUCTS } from "../../data/productsData";

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const navData = [
  {
    name: "Groceries",
    path: "/products/groceries",
    subMenu: [
      { name: "Rice & Pasta", path: "/products/rice-pasta" },
      { name: "Cereal & Breakfast", path: "/products/cereal-breakfast" },
    ],
  },
  {
    name: "Beverages",
    path: "/products/beverages",
    subMenu: [
      { name: "Soft Drinks", path: "/products/soft-drinks" },
      { name: "Energy Drinks", path: "/products/energy-drinks" },
    ],
  },
  { name: "Snacks & Treats", path: "/products/snacks-treats" },
  { name: "Home & Kitchen", path: "/products/home-kitchen" },
  { name: "Personal Care", path: "/products/personal-care" },
  { name: "Baby Care", path: "/products/baby-care" },
  { name: "Alcohol", path: "/products/alcohol" },
  { name: "Food Cupboard", path: "/products/food-cupboard" },
  { name: "Pet Care", path: "/products/pet-care" },
  { name: "Tea, Coffee & Hot Drinks", path: "/products/tea-coffee-hot-drinks" },
];

const Navigation = ({ mobileNavOpen, closeMobileNav }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // This effect runs whenever the sidebar is open
    if (mobileNavOpen) {
      const handleClickOutside = (event) => {
        // Check if the click is outside the sidebar AND not on the hamburger button
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          // You need to add a check for the hamburger menu button here to prevent it from immediately closing the sidebar after opening it
          // A simple way to do this is to check if the clicked element is part of the hamburger button
          // This can be done with a class name or a specific data attribute
          const isHamburgerButton = event.target.closest('.mobileHamburger');
          if (!isHamburgerButton) {
            closeMobileNav();
          }
        }
      };

      // Add the event listener to the document
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside); // For mobile touch events

      // Clean up the event listener when the component unmounts or the sidebar closes
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [mobileNavOpen, closeMobileNav]);

  return (
    <nav className="main-nav">
      <div className="container">
        <div className={`nav-items-wrapper ${window.innerWidth <= 768 ? "d-none" : ""}`}>
          <ul className="main-nav-list">
            <li className="main-nav-item">
              <Link to="/" className="main-nav-link">
                <span>Home</span>
              </Link>
            </li>
            <li className="main-nav-item">
              <Link to="/products/allproducts" className="main-nav-link">
                <span>All Products</span>
              </Link>
            </li>
            <li className="main-nav-item">
              <Link to="/products/appliances" className="main-nav-link">
                <span>Appliances</span>
              </Link>
            </li>
            <li className="main-nav-item">
              <Link to="/products/home-and-kitchen" className="main-nav-link">
                <span>Home & Kitchen</span>
              </Link>
            </li>
            <li className="main-nav-item">
              <Link to="/products/electronics" className="main-nav-link">
                <span>Electronics</span>
              </Link>
            </li>
            <li className="main-nav-item">
              <Link to="/products/groceries" className="main-nav-link">
                <span>Grocery Picks</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      <div ref={sidebarRef} className={`mobile-sidebar ${mobileNavOpen ? "open" : ""}`}>
        <ul className="mobile-menu-list">
          <li>
            <Link to="/" onClick={closeMobileNav}>Home</Link>
          </li>
          <li>
            <Link to="/products/allproducts" onClick={closeMobileNav}>All Products</Link>
          </li>
          {navData.map((category, index) => (
            <li key={index}>
              <Link to={category.path} onClick={closeMobileNav}>
                {category.name}
              </Link>
              {category.subMenu && (
                <ul className="mobile-submenu">
                  {category.subMenu.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <Link to={sub.path} onClick={closeMobileNav}>{sub.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;