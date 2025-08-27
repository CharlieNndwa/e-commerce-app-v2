import React, { useState, useEffect, useCallback } from "react";
import { Button, Menu, MenuItem, Pagination } from "@mui/material";
import { IoIosMenu } from "react-icons/io";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Sidebar from "../../Components/SideBar";
import ProductItem from "../../Components/ProductItem";
import { PRODUCTS } from "../../Components/data/productsData";
import { useParams } from "react-router-dom";

// Import your dynamic banner images
import appliancesBanner from "../../assets/images/s.jpg";
import electronicsBanner from "../../assets/images/a.jpg";
import homeKitchenBanner from "../../assets/images/z.png";
import groceriesBanner from "../../assets/images/f.jpg";
import defaultBanner from "../../assets/images/t.png";

// Map slugs to the correct banner images
const categoryBanners = {
    "appliances": appliancesBanner,
    "electronics": electronicsBanner,
    "home-and-kitchen": homeKitchenBanner,
    "groceries": groceriesBanner,
    "allproducts": defaultBanner, // You can set a specific banner for the 'allproducts' page
};

const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/,/g, "")
        .replace(/&/g, "and")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

const AllProducts = () => {
    const { category } = useParams();

    const [productView, setProductView] = useState("grid");
    const [sortOption, setSortOption] = useState("default");
    const [filteredProducts, setFilteredProducts] = useState(PRODUCTS || []);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const openSortMenu = Boolean(sortAnchorEl);

    const maxPrice = PRODUCTS.length > 0 ? Math.max(...PRODUCTS.map(p => p.price)) : 0;
    const [priceRange, setPriceRange] = useState([0, maxPrice]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [showOutOfStock, setShowOutOfStock] = useState(false);

    const getCategoryCounts = useCallback(() => {
        const counts = {};
        PRODUCTS.forEach(product => {
            if (product.category) {
                const slug = slugify(product.category);
                counts[slug] = (counts[slug] || 0) + 1;
            }
        });
        return counts;
    }, []);

    const categoryCounts = getCategoryCounts();

    const applyFiltersAndSort = useCallback(() => {
        let tempProducts = PRODUCTS ? [...PRODUCTS] : [];

        if (category && category !== 'allproducts') {
            tempProducts = tempProducts.filter(
                (product) => product.category && slugify(product.category) === category
            );
        }

        tempProducts = tempProducts.filter(
            (product) =>
                product.price >= priceRange[0] &&
                product.price <= priceRange[1]
        );

        if (inStockOnly) {
            tempProducts = tempProducts.filter((product) => product.inStock);
        } else if (showOutOfStock) {
            tempProducts = tempProducts.filter((product) => !product.inStock);
        }

        switch (sortOption) {
            case "price-low-to-high":
                tempProducts.sort((a, b) => a.price - b.price);
                break;
            case "price-high-to-low":
                tempProducts.sort((a, b) => b.price - a.price);
                break;
            case "A-Z":
                tempProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                tempProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setFilteredProducts(tempProducts);
        setCurrentPage(1);
    }, [category, priceRange, inStockOnly, showOutOfStock, sortOption]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [applyFiltersAndSort]);

    useEffect(() => {
        const newMaxPrice = PRODUCTS.length > 0 ? Math.max(...PRODUCTS.map(p => p.price)) : 0;
        setPriceRange([0, newMaxPrice]);
        setInStockOnly(false);
        setShowOutOfStock(false);
        setSortOption("default");
    }, [category]);

    const handlePriceChange = (values) => {
        setPriceRange(values);
    };

    const handleInStockChange = (e) => {
        setInStockOnly(e.target.checked);
        if (e.target.checked) setShowOutOfStock(false);
    };

    const handleOutOfStockChange = (e) => {
        setShowOutOfStock(e.target.checked);
        if (e.target.checked) setInStockOnly(false);
    };

    const handleReset = () => {
        const newMaxPrice = PRODUCTS.length > 0 ? Math.max(...PRODUCTS.map(p => p.price)) : 0;
        setPriceRange([0, newMaxPrice]);
        setInStockOnly(false);
        setShowOutOfStock(false);
    };

    const handleSortClick = (event) => {
        setSortAnchorEl(event.currentTarget);
    };

    const handleSortClose = (option) => {
        setSortOption(option);
        setSortAnchorEl(null);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

    const inStockCount = filteredProducts.filter(p => p.inStock).length;
    const outOfStockCount = filteredProducts.filter(p => !p.inStock).length;

    // This is the line that gets the correct banner
    const currentBanner = category && categoryBanners[category] ? categoryBanners[category] : defaultBanner;

    return (
        <div className="container-fluid px-2 px-md-4 mt-8">
            {/* Dynamic Banner Section */}
            <div className="full-width-banner">
                <div className="banner-content">
                    <img
                        src={currentBanner}
                        alt={`${category} Banner`}
                        className="banner-image"
                    />
                </div>
            </div>

            <h1
                className="font-bold mb-6"
                style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    marginTop: "1rem",
                    marginBottom: "2rem",
                }}
            >
                {category && category !== 'allproducts'
                    ? category.replace(/-/g, " ").toUpperCase()
                    : "ALL PRODUCTS"}{" "}
                ({filteredProducts.length})
            </h1>
            <div className="row">
                {/* Sidebar */}
                <div className="col-12 col-md-3 mb-4">
                    <Sidebar
                        selectedCategory={category}
                        priceRange={priceRange}
                        onPriceChange={handlePriceChange}
                        inStockOnly={inStockOnly}
                        showOutOfStock={showOutOfStock}
                        onInStockChange={handleInStockChange}
                        onOutOfStockChange={handleOutOfStockChange}
                        handleReset={handleReset}
                        categoryCounts={categoryCounts}
                        inStockCount={inStockCount}
                        outOfStockCount={outOfStockCount}
                    />
                </div>
                {/* Products Section */}
                <div className="col-12 col-md-9">
                    <div
                        className="d-flex align-items-center mb-4 flex-wrap"
                        style={{
                            justifyContent: "space-between",
                            maxWidth: "1000px",
                            margin: "0 auto",
                        }}
                    >
                        <div className="flex space-x-2 mb-2 mb-md-0">
                            <Button
                                className={`p-2 rounded-md ${
                                    productView === "list" && "bg-gray-200"
                                    }`}
                                onClick={() => setProductView("list")}
                            >
                                <IoIosMenu size={24} />
                            </Button>
                            <Button
                                className={`p-2 rounded-md ${
                                    productView === "grid" && "bg-gray-200"
                                    }`}
                                onClick={() => setProductView("grid")}
                            >
                                <TfiLayoutGrid4Alt size={24} />
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Sort by:</span>
                            <Button onClick={handleSortClick} endIcon={<FaAngleDown />}>
                                {sortOption === "default"
                                    ? "Best selling"
                                    : `Price: ${
                                        sortOption === "price-low-to-high"
                                            ? "Low to High"
                                            : "High to Low"
                                        }`}
                            </Button>
                            <Menu
                                anchorEl={sortAnchorEl}
                                open={openSortMenu}
                                onClose={() => handleSortClose(sortOption)}
                            >
                                <MenuItem onClick={() => handleSortClose("default")}>
                                    Best selling
                                </MenuItem>
                                <MenuItem onClick={() => handleSortClose("price-low-to-high")}>
                                    Price: Low to High
                                </MenuItem>
                                <MenuItem onClick={() => handleSortClose("price-high-to-low")}>
                                    Price: High to Low
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                    {filteredProducts.length > 0 ? (
                        <>
                            <div className={productView === 'grid' ? 'all-products-grid' : 'all-products-list'}>
                                {currentProducts.map((product) => (
                                    <ProductItem key={product._id} product={product} itemView={productView} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="col-12">
                            <p>No products found matching your criteria.</p>
                        </div>
                    )}
                    <div className="flex justify-center mt-8">
                        <Pagination
                            count={pageCount}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;