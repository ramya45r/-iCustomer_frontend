import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import "./ProductList.css";  

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await fetchProducts(token);
          setProducts(data);
        } catch (error) {
          console.error("Failed to fetch products.");
        }
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const name = product.productName ? product.productName.toLowerCase() : "";
    const category = product["dataCategory"] ? product["dataCategory"].toLowerCase() : "";

    return (
      name.includes(search.toLowerCase()) ||
      category.includes(search.toLowerCase())
    );
  });

  return (
    <div className="product-list">
      <h2>Product Catalog</h2>
      <input
        type="text"
        placeholder="Search by name or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.productName}</h3>
            <p>Category: {product["dataCategory"]}</p>
            <p>Record Count: {product["recordCount"]}</p>
            <p>Fields:</p>
            <ul>
              {Object.keys(product.fields).map((key) => (
                <li key={key}>
                  {key}: {product.fields[key]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
