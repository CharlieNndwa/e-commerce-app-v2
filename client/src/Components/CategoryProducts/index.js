import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Button, Menu, MenuItem, Pagination } from "@mui/material";
import { IoIosMenu } from "react-icons/io";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Sidebar from "../SideBar";
import ProductItem from "../ProductItem";
import { PRODUCTS } from "../data/productsData";
import BannerStrip from "../../assets/images/slidez.png";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [productView, setProductView] = useState("four");
  const [sortOption, setSortOption] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const openSortMenu = Boolean(sortAnchorEl);
  const [filters, setFilters] = useState(null);

  // Use useCallback to memoize the function and prevent re-creation on every render.
  const applyFiltersAndSort = useCallback(() => {
    // 1. Filter products by category first. The categoryName from the URL
    // needs to be matched to the product's category string.
    let tempProducts = PRODUCTS.filter((product) => {
      // Create a URL-friendly slug from the product's category name to compare.
      const productCategorySlug = product.category
        .replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();
      return productCategorySlug === categoryName;
    });

    // 2. Apply other filters (price, stock, etc.).
    if (filters) {
      if (filters.priceRange) {
        tempProducts = tempProducts.filter(
          (product) =>
            product.price >= filters.priceRange[0] &&
            product.price <= filters.priceRange[1]
        );
      }
      if (filters.inStockOnly) {
        tempProducts = tempProducts.filter((product) => product.inStock);
      } else if (filters.showOutOfStock) {
        tempProducts = tempProducts.filter((product) => !product.inStock);
      }
    }

    // 3. Apply sorting based on the current sortOption.
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
    setCurrentPage(1); // Reset to the first page when filters/sort change.
  }, [categoryName, filters, sortOption]); // Dependencies for useCallback

  // The useEffect hook now depends on applyFiltersAndSort,
  // which will only change when its dependencies (categoryName, filters, sortOption) change.
  // This prevents the infinite render loop.
  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option) => {
    setSortOption(option);
    setSortAnchorEl(null);
  };

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

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

  const formatCategoryName = (name) => {
    return name
      .replace(/-/g, " & ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1
        className="font-bold mb-6"
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginTop: "1rem",
          marginBottom: "2rem",
        }}
      >
        {formatCategoryName(categoryName)} ({filteredProducts.length})
      </h1>
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            minWidth: 260,
            maxWidth: 320,
            flex: "0 0 320px",
            paddingLeft: "12px",
          }}
        >
          <Sidebar onFilterChange={handleFilterChange} />
        </div>
        <div style={{ flex: 1, maxWidth: "1200px" }}>
          <div
            className="mb-6 mx-auto"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "1000px",
              marginBottom: "2rem",
            }}
          >
            <div className="flex space-x-2">
              <Button
                className={`p-2 rounded-md ${
                  productView === "one" && "bg-gray-200"
                }`}
                onClick={() => setProductView("one")}
              >
                <IoIosMenu size={24} />
              </Button>
              <Button
                className={`p-2 rounded-md ${
                  productView === "four" && "bg-gray-200"
                }`}
                onClick={() => setProductView("four")}
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
                <MenuItem onClick={() => handleSortClose("A-Z")}>
                  Name: A-Z
                </MenuItem>
                <MenuItem onClick={() => handleSortClose("Z-A")}>
                  Name: Z-A
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                productView === "four" ? "repeat(4, 1fr)" : "repeat(1, 1fr)",
              gap: "32px",
              justifyContent: "center",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {filteredProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  itemView={productView}
                />
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
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
      <div className="full-width-banner">
        <div className="banner-content">
          <img
            src={BannerStrip}
            alt="Ask Oreo - Let the Cookies Decide"
            className="banner-image"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;