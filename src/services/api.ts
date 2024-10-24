   // src/services/api.ts
   import axios from 'axios';

   const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL, 
   });

   export default api;
   export const fetchProducts = () => api.get('/products');
   export const createProduct = (data: any) => api.post('/products', data);