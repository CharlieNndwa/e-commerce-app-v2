// src/services/productService.js
import axios from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

/**
 * Fetches products from the Platzi Fake Store API with optional filtering and pagination.
 * @param {object} params - The parameters for the API call.
 * @param {string} params.categorySlug - The URL-friendly name of the category.
 * @param {number} params.minPrice - The minimum price for filtering.
 * @param {number} params.maxPrice - The maximum price for filtering.
 * @param {number} params.limit - The number of items to return per page.
 * @param {number} params.offset - The number of items to skip.
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 */
export const fetchProducts = async (params = {}) => {
  try {
    const { categorySlug, minPrice, maxPrice, limit, offset } = params;

    const queryParams = new URLSearchParams();
    if (categorySlug && categorySlug !== 'allproducts') {
      // Platzi API filters by categoryId, so we'll need to fetch it first
      const categoryResponse = await axios.get(`${API_BASE_URL}/categories`);
      const category = categoryResponse.data.find(cat => cat.name.toLowerCase().replace(/\s+/g, '-') === categorySlug);
      if (category) {
        queryParams.append("categoryId", category.id);
      }
    }
    if (minPrice !== undefined) queryParams.append("price_min", minPrice);
    if (maxPrice !== undefined) queryParams.append("price_max", maxPrice);
    if (limit !== undefined) queryParams.append("limit", limit);
    if (offset !== undefined) queryParams.append("offset", offset);

    const response = await axios.get(`${API_BASE_URL}/products?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};