import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Sidebar from "../../Components/SideBar";
import ProductItem from "../../Components/ProductItem"; // This component needs to be created
import { fetchProducts } from "../../services/productService";

// Import your dynamic banner images
import appliancesBanner from "../../assets/images/s.jpg";
import electronicsBanner from "../../assets/images/a.jpg";
import homeKitchenBanner from "../../assets/images/z.png";
import groceriesBanner from "../../assets/images/f.jpg";
import defaultBanner from "../../assets/images/t.png";

const categoryBanners = {
    "appliances": appliancesBanner,
    "electronics": electronicsBanner,
    "home-and-kitchen": homeKitchenBanner,
    "groceries": groceriesBanner,
    "allproducts": defaultBanner,
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

    // State for API data and loading
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for component UI and filtering
    const [productView, setProductView] = useState("grid");
    const [sortOption, setSortOption] = useState("default");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const openSortMenu = Boolean(sortAnchorEl);

    // Initial price range will be based on fetched data
    const [priceRange, setPriceRange] = useState([0, 1000]);

    // Fetch products from the Platzi API
    const getProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const products = await fetchProducts({
                categorySlug: category,
                limit: 200, // Fetch a larger set of products
            });
            setAllProducts(products);

            // Set initial price range based on fetched products
            const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 1000;
            setPriceRange([0, maxPrice]);

        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError("Failed to load products. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    // This hook applies filters and sorting whenever dependencies change
    const applyFiltersAndSort = useCallback(() => {
        let tempProducts = [...allProducts];

        // Apply Category Filter
        if (category && category !== 'allproducts') {
            tempProducts = tempProducts.filter(
                (product) => product.category && slugify(product.category.name) === category
            );
        }

        // Apply Price Range Filter
        tempProducts = tempProducts.filter(
            (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply Sorting
        switch (sortOption) {
            case "price-low-to-high":
                tempProducts.sort((a, b) => a.price - b.price);
                break;
            case "price-high-to-low":
                tempProducts.sort((a, b) => b.price - a.price);
                break;
            case "A-Z":
                tempProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "Z-A":
                tempProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        setFilteredProducts(tempProducts);
        setCurrentPage(1); // Reset to first page on filter/sort change
    }, [allProducts, category, priceRange, sortOption]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [applyFiltersAndSort]);

    // Corrected function to get category counts from the fetched data
    const getCategoryCounts = useCallback(() => {
        const counts = {};
        allProducts.forEach(product => {
            if (product.category && product.category.name) {
                const slug = slugify(product.category.name);
                counts[slug] = (counts[slug] || 0) + 1;
            }
        });
        return counts;
    }, [allProducts]);

    const categoryCounts = getCategoryCounts();

    const handlePriceChange = (values) => {
        setPriceRange(values);
    };

    const handleReset = () => {
        const newMaxPrice = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.price)) : 1000;
        setPriceRange([0, newMaxPrice]);
        setSortOption("default");
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

    const currentBanner = category && categoryBanners[category] ? categoryBanners[category] : defaultBanner;

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-200px)]">
            <div className="w-full h-48 sm:h-64 overflow-hidden relative mb-8">
                <img
                    src={currentBanner}
                    alt={`${category} Banner`}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-lg uppercase">
                        {category && category !== 'allproducts'
                            ? category.replace(/-/g, " ")
                            : "All Products"}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar container - becomes hidden on small screens and reappears on large screens */}
                    <div className="lg:col-span-1 hidden lg:block">
                        <Sidebar
                            selectedCategory={category}
                            priceRange={priceRange}
                            onPriceChange={handlePriceChange}
                            handleReset={handleReset}
                            categoryCounts={categoryCounts} // Corrected prop
                        />
                    </div>

                    {/* Main content grid */}
                    <div className="lg:col-span-3 col-span-1">
                        {/* Header for product count and view options */}
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between">
                            {loading ? (
                                <span className="text-gray-600 text-sm">Loading...</span>
                            ) : error ? (
                                <span className="text-red-500 text-sm">Error: {error}</span>
                            ) : (
                                <span className="text-gray-600 text-sm mb-4 sm:mb-0">
                                    Showing **{currentProducts.length}** of **{filteredProducts.length}** products
                                </span>
                            )}
                            <div className="flex items-center space-x-4">
                                {/* View options */}
                                <div className="flex space-x-2">
                                    <button
                                        className={`p-2 rounded-md transition-colors duration-200 ${productView === "list" ? "bg-gray-200 text-gray-800" : "bg-white text-gray-500 hover:bg-gray-100"}`}
                                        onClick={() => setProductView("list")}
                                    >
                                        <IoIosMenu size={24} />
                                    </button>
                                    <button
                                        className={`p-2 rounded-md transition-colors duration-200 ${productView === "grid" ? "bg-gray-200 text-gray-800" : "bg-white text-gray-500 hover:bg-gray-100"}`}
                                        onClick={() => setProductView("grid")}
                                    >
                                        <TfiLayoutGrid4Alt size={24} />
                                    </button>
                                </div>
                                {/* Sort dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={handleSortClick}
                                        className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <span className="mr-2">Sort by:</span>
                                        <span className="font-semibold capitalize">
                                            {sortOption.replace(/-/g, " ")}
                                        </span>
                                        <FaAngleDown className="ml-2" />
                                    </button>
                                    {openSortMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                            <ul className="py-1">
                                                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleSortClose("default")}>Best selling</li>
                                                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleSortClose("price-low-to-high")}>Price: Low to High</li>
                                                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleSortClose("price-high-to-low")}>Price: High to Low</li>
                                                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleSortClose("A-Z")}>Name: A-Z</li>
                                                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleSortClose("Z-A")}>Name: Z-A</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500 text-lg">Loading products...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-10">
                                <p className="text-red-500 text-lg">Error: {error}</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className={
                                productView === 'grid'
                                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6"
                                    : "grid grid-cols-1 gap-6"
                            }>
                                {currentProducts.map((product) => (
                                    <ProductItem key={product.id} product={product} itemView={productView} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                            </div>
                        )}

                        <div className="flex justify-center mt-10">
                            {filteredProducts.length > 0 && (
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => handlePageChange(null, currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(null, page)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                                ? "z-10 bg-blue-50 border-blue-600 text-blue-600"
                                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(null, currentPage + 1)}
                                        disabled={currentPage === pageCount}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;