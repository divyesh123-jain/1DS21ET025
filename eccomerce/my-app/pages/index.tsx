import React, { useState } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  discount: number;
  company: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('Laptop');
  const [n, setN] = useState<number>(10);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('/api/products', {
        params: {
          category,
          n,
          minPrice,
          maxPrice,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Top Products</h1>
      <div>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Number of Products:
          <input
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
          />
        </label>
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value))}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
        </label>
        <button onClick={fetchProducts}>Fetch Products</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} (Rating: {product.rating})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;