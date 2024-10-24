   // src/services/productService.ts
   import api from './api';

   export const fetchProducts = async () => {
     try {
       const response = await api.get('/products');
       return response.data;
     } catch (error) {
       console.error('Error fetching products:', error);
       throw error;
     }
   };

   export const createProduct = async (productData: any) => {
     try {
       const response = await api.post('/products', productData);
       return response.data;
     } catch (error) {
       console.error('Error creating product:', error);
       throw error;
     }
   };

