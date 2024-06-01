import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchProducts, fetchProductDetails } from '../../utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      const { category, n, minPrice, maxPrice, page, sortBy, order } = query;

      if (category && n && minPrice && maxPrice) {
        const company = 'AMZ';
        const products = await fetchProducts(
          company,
          category.toString(),
          parseInt(n.toString()),
          parseInt(minPrice.toString()),
          parseInt(maxPrice.toString()),
          page ? parseInt(page.toString()) : 1,
          sortBy ? sortBy.toString() : undefined,
          order as 'asc' | 'desc' | undefined
        );

        res.status(200).json(products);
      } else {
        res.status(400).json({ error: 'Missing required parameters' });
      }
      break;

    case 'GET':
      const { productId } = query;

      if (productId) {
        const product = await fetchProductDetails(productId.toString());
        res.status(200).json(product);
      } else {
        res.status(400).json({ error: 'Missing required parameters' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}