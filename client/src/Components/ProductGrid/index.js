// src/components/ProductGrid.js

import React from 'react';
import ProductItem from './ProductItem';
import { PRODUCTS } from '../data/productsData';

const ProductGrid = () => {
  return (
    <div className="product-grid-container d-flex flex-wrap">
      {PRODUCTS.map(product => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;