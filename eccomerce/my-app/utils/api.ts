import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'http://20.244.56.144/test';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  discount: number;
  company: string;
}

export const fetchProducts = async (
  company: string,
  category: string,
  n: number,
  minPrice: number,
  maxPrice: number,
  page: number = 1,
  sortBy?: string,
  order?: 'asc' | 'desc'
) => {
  const queryParams = {
    minPrice,
    maxPrice,
    n,
    page,
    ...(sortBy && order && { sortBy, order }),
  };

  const queryString = qs.stringify(queryParams, { addQueryPrefix: true });
  const response = await axios.get<Product[]>(
    `${API_BASE_URL}/companies/${company}/categories/${category}/products/top-n${queryString}`
  );

  return response.data.map((product, index) => ({
    ...product,
    id: `${company}-${category}-${index + 1}`,
  }));
};

export const fetchProductDetails = async (productId: string) => {
  const [company, category, id] = productId.split('-');
  const response = await axios.get<Product>(
    `${API_BASE_URL}/companies/${company}/categories/${category}/products/${id}`
  );

  return response.data;
};