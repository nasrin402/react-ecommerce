import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getProductBySlug = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const deleteProduct = async(slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/products/${slug}`, {
    headers:{
      authtoken
    }
  } )  

export const updateProduct = async(slug, product, authtoken) =>
await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
  headers: {
    authtoken,
  },
})
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,category, {
    headers: {
      authtoken,
    },
  });

  export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {sort, order, page});

  export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

  export const updateStarRating = async(productId, star, authtoken) =>
await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`, {star}, {
  headers: {
    authtoken,
  },
})