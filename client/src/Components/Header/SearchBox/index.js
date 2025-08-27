import Button from "@mui/material/Button";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { MyContext } from "../../../App";

const SearchBox = () => {
    const context = useContext(MyContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query.trim() === "") {
            setSearchResults([]);
            return;
        }

        const filteredProducts = context.productList.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredProducts);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setSearchResults([]);
    };

    return (
        <div className="headerSearch ml-3 mr-3">
            <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {searchTerm && (
                <Button className="close-button" onClick={handleClearSearch}>
                    <IoMdClose />
                </Button>
            )}
            <Button>
                <IoIosSearch />
            </Button>

            {searchResults.length > 0 && (
                <div className="search-results-dropdown">
                    {searchResults.map((product) => (
                        <Link
                            to={`/product/${product._id}`}
                            key={product._id}
                            onClick={handleClearSearch}
                        >
                            <div className="search-item">
                                <div className="search-item-details">
                                    <p className="product-name">{product.name}</p>
                                    <span className="price">R{product.price.toFixed(2)}</span>
                                    <p className="stock-status">
                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBox;