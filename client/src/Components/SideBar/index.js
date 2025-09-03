// src/Components/Sidebar.js
import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoFilterCircleOutline } from "react-icons/io5";

const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/,/g, "")
        .replace(/&/g, "and")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

const Sidebar = ({
    selectedCategory,
    onPriceChange,
    priceRange,
    handleReset,
    categoryCounts
}) => {
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(true);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(true);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const dynamicCategories = Object.keys(categoryCounts);

    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    };

    const togglePriceDropdown = () => {
        setIsPriceDropdownOpen(!isPriceDropdownOpen);
    };

    const toggleMobileFilters = () => {
        setIsMobileFiltersOpen(!isMobileFiltersOpen);
    };

    return (
        <>
            {/* Mobile Filter Buttons - Visible on Small Screens */}
            <div className="lg:hidden flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4">
                <button
                    onClick={toggleMobileFilters}
                    className="flex items-center text-gray-700 font-semibold text-lg"
                >
                    <IoFilterCircleOutline className="mr-2" size={24} />
                    Filters
                </button>
                <button
                    onClick={handleReset}
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Reset
                </button>
            </div>

            {/* Mobile Filters Dropdown - Only appears when button is clicked */}
            <div
                className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileFiltersOpen ? "max-h-screen" : "max-h-0"
                    }`}
            >
                <aside className="sidebar-filter-mobile">
                    {/* Categories Section */}
                    <section className="filter-section p-4 bg-white rounded-lg shadow-sm mb-4">
                        <div className="filter-header flex justify-between items-center mb-3 cursor-pointer" onClick={toggleCategoryDropdown}>
                            <h3 className="filter-title font-semibold text-lg">Categories</h3>
                            {isCategoryDropdownOpen ? <GoChevronUp /> : <GoChevronDown />}
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isCategoryDropdownOpen ? "max-h-screen" : "max-h-0"
                                }`}
                        >
                            <ul className="filter-list list-none p-0 m-0">
                                <Link to="/allproducts">
                                    <li
                                        className={`filter-item p-2 rounded-md transition-colors ${!selectedCategory || selectedCategory === "allproducts"
                                                ? 'bg-gray-200 font-semibold'
                                                : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        <span>All Products</span>
                                        <span className="count">({categoryCounts ? Object.values(categoryCounts).reduce((sum, count) => sum + count, 0) : 0})</span>
                                    </li>
                                </Link>
                                {dynamicCategories.map(cat => (
                                    <Link to={`/products/${slugify(cat)}`} key={cat}>
                                        <li
                                            className={`filter-item p-2 rounded-md transition-colors ${selectedCategory === slugify(cat)
                                                    ? 'bg-gray-200 font-semibold'
                                                    : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <span>{cat}</span>
                                            <span className="count">({categoryCounts[cat] || 0})</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Price Section */}
                    <section className="filter-section p-4 bg-white rounded-lg shadow-sm mb-4">
                        <div className="filter-header flex justify-between items-center mb-3 cursor-pointer" onClick={togglePriceDropdown}>
                            <h3 className="filter-title font-semibold text-lg">Price</h3>
                            {isPriceDropdownOpen ? <GoChevronUp /> : <GoChevronDown />}
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isPriceDropdownOpen ? "max-h-screen" : "max-h-0"
                                }`}
                        >
                            <div className="price-info text-center text-gray-500 text-sm mb-4">
                                <span>The highest price is R{priceRange[1].toFixed(2)}</span>
                            </div>
                            <div className="price-inputs-group flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <span className="price-prefix mr-1 text-sm font-semibold">R</span>
                                    <input
                                        type="text"
                                        value={priceRange[0].toFixed(2)}
                                        readOnly
                                        className="price-input w-20 text-center border rounded-md py-1 text-sm"
                                    />
                                </div>
                                <span className="separator mx-2 text-gray-400">-</span>
                                <div className="flex items-center">
                                    <span className="price-prefix mr-1 text-sm font-semibold">R</span>
                                    <input
                                        type="text"
                                        value={priceRange[1].toFixed(2)}
                                        readOnly
                                        className="price-input w-20 text-center border rounded-md py-1 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="range-slider-container">
                                <RangeSlider
                                    min={0}
                                    max={priceRange[1] > 0 ? priceRange[1] : 1000}
                                    step={1}
                                    value={priceRange}
                                    onInput={onPriceChange}
                                />
                            </div>
                        </div>
                    </section>
                </aside>
            </div>

            {/* Desktop Sidebar - Visible on Large Screens */}
            <aside className="sidebar-filter hidden lg:block">
                {/* Categories Section */}
                <section className="filter-section p-4 bg-white rounded-lg shadow-sm mb-4">
                    <div className="filter-header flex justify-between items-center mb-3">
                        <h3 className="filter-title font-semibold text-lg">Categories</h3>
                    </div>
                    <ul className="filter-list list-none p-0 m-0">
                        <Link to="/allproducts">
                            <li
                                className={`filter-item p-2 rounded-md transition-colors ${!selectedCategory || selectedCategory === "allproducts"
                                        ? 'bg-gray-200 font-semibold'
                                        : 'hover:bg-gray-100'
                                    }`}
                            >
                                <span>All Products</span>
                                <span className="count">({categoryCounts ? Object.values(categoryCounts).reduce((sum, count) => sum + count, 0) : 0})</span>
                            </li>
                        </Link>
                        {dynamicCategories.map(cat => (
                            <Link to={`/products/${slugify(cat)}`} key={cat}>
                                <li
                                    className={`filter-item p-2 rounded-md transition-colors ${selectedCategory === slugify(cat)
                                            ? 'bg-gray-200 font-semibold'
                                            : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <span>{cat}</span>
                                    <span className="count">({categoryCounts[cat] || 0})</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </section>

                {/* Filter & Reset Section */}
                <section className="filter-section p-4 bg-white rounded-lg shadow-sm mb-4">
                    <div className="filter-header flex justify-between items-center">
                        <h3 className="filter-title font-semibold text-lg">Filter</h3>
                        <button className="reset-btn text-sm text-gray-500 hover:text-gray-700" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </section>

                {/* Price Section */}
                <section className="filter-section p-4 bg-white rounded-lg shadow-sm mb-4">
                    <h3 className="filter-title font-semibold text-lg mb-4">Price</h3>
                    <div className="price-info text-center text-gray-500 text-sm mb-4">
                        <span>The highest price is R{priceRange[1].toFixed(2)}</span>
                    </div>

                    <div className="price-inputs-group flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <span className="price-prefix mr-1 text-sm font-semibold">R</span>
                            <input
                                type="text"
                                value={priceRange[0].toFixed(2)}
                                readOnly
                                className="price-input w-20 text-center border rounded-md py-1 text-sm"
                            />
                        </div>
                        <span className="separator mx-2 text-gray-400">-</span>
                        <div className="flex items-center">
                            <span className="price-prefix mr-1 text-sm font-semibold">R</span>
                            <input
                                type="text"
                                value={priceRange[1].toFixed(2)}
                                readOnly
                                className="price-input w-20 text-center border rounded-md py-1 text-sm"
                            />
                        </div>
                    </div>

                    <div className="range-slider-container">
                        <RangeSlider
                            min={0}
                            max={priceRange[1] > 0 ? priceRange[1] : 1000}
                            step={1}
                            value={priceRange}
                            onInput={onPriceChange}
                        />
                    </div>
                </section>
            </aside>
        </>
    );
};

export default Sidebar;