// src/Components/Sidebar.js

import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Link } from "react-router-dom";

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const Sidebar = ({ selectedCategory, onPriceChange, priceRange, inStockOnly, showOutOfStock, onInStockChange, onOutOfStockChange, handleReset, categoryCounts, inStockCount, outOfStockCount }) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(true);
  
  // No need for a useEffect to calculate these in the sidebar anymore
  const dynamicCategories = Object.keys(categoryCounts);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  return (
    <aside className="sidebar-filter">
      {/* Categories Section */}
      <section className="filter-section">
        <div className="filter-header" onClick={toggleCategoryDropdown}>
          <h3 className="filter-title">Categories</h3>
          {isCategoryDropdownOpen ? <GoChevronUp /> : <GoChevronDown />}
        </div>
        {isCategoryDropdownOpen && (
          <ul className="filter-list">
            <Link to="/allproducts" onClick={handleReset}>
              <li className={`filter-item ${!selectedCategory || selectedCategory === "allproducts" ? 'selected' : ''}`}>
                <span>All Products</span>
                <span className="count">({inStockCount + outOfStockCount})</span>
              </li>
            </Link>
            {dynamicCategories.map(cat => (
              // The onClick handler is now on every category Link
              <Link to={`/products/${slugify(cat)}`} key={cat} onClick={handleReset}> 
                <li
                  className={`filter-item ${selectedCategory === slugify(cat) ? 'selected' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="count">({categoryCounts[cat] || 0})</span>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">Filter</h3>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="filter-info">
          <span>{inStockCount + outOfStockCount} products</span>
        </div>
      </section>

      {/* Availability Section */}
      <section className="filter-section">
        <h3 className="filter-title">Availability</h3>
        <div className="filter-list mt-2">
          {/* In Stock Checkbox */}
          <label className="filter-item-checkbox flex justify-between items-center py-1">
            <div className="flex items-center space-x-2">
              <span>In stock</span>
              <span className="count">({inStockCount})</span>
            </div>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={onInStockChange}
              className="accent-gray-400 rounded-full"
              style={{ width: '1rem', height: '1rem', flexShrink: 0 }}
            />
          </label>
          {/* Out of Stock Checkbox */}
          <label className="filter-item-checkbox flex justify-between items-center py-1">
            <div className="flex items-center space-x-2">
              <span>Out of stock</span>
              <span className="count">({outOfStockCount})</span>
            </div>
            <input
              type="checkbox"
              checked={showOutOfStock}
              onChange={onOutOfStockChange}
              className="accent-gray-400 rounded-full"
              style={{ width: '1rem', height: '1rem', flexShrink: 0 }}
            />
          </label>
        </div>
      </section>

      {/* Price Section */}
      <section className="filter-section">
        <h3 className="filter-title">Price</h3>
        <div className="price-info">
          <span>The highest price is R{priceRange[1].toFixed(2)}</span>
        </div>
        
        <div className="price-inputs-group">
          <span className="price-prefix">R</span>
          <input 
            type="text" 
            value={priceRange[0].toFixed(2)} 
            readOnly 
            className="price-input"
          />
          <span className="separator">-</span>
          <span className="price-prefix">R</span>
          <input 
            type="text" 
            value={priceRange[1].toFixed(2)} 
            readOnly 
            className="price-input"
          />
        </div>
        
        <div className="range-slider-container">
          <RangeSlider
            min={0}
            max={priceRange[1]}
            step={1}
            value={priceRange}
            onInput={onPriceChange}
          />
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;