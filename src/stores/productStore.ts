import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import type { APIResponse, Product, Products } from "@/types";
import { handleError, handleSuccess } from "@/lib/utils";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    productsData: {} as Products
  }),
  actions: {
    async createProduct(product: {
      name: string;
      price: number;
      stock: number;
      mainImage: File | undefined;
      subImages: File[] | undefined;
      description: string;
      category: string | undefined;
    }) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const formData = new FormData();
          formData.append("name", product.name);
          formData.append("description", product.description);
          formData.append("price", product.price.toString());
          formData.append("stock", product.stock.toString());
          if (product.category) formData.append("category", product.category);
          if (product.mainImage)
            formData.append("mainImage", product.mainImage);

          if (product.subImages) {
            for (let i = 0; i < product.subImages.length; i++) {
              formData.append("subImages", product.subImages[i]);
            }
          }
          const { data } = await axios.post<APIResponse<Product>>(
            "ecommerce/products",
            formData
          );
          console.log("data :>> ", data);
          handleSuccess(data.statusCode.toString(), data.message);
          resolve(data.data);
        } catch (err) {
          handleError(err);
          reject(err);
        }
      });
    },
    async getProducts(page: number, limit: number) {
      return new Promise<Products>(async (resolve, reject) => {
        try {
          const { data } = await axios.get<APIResponse<Products>>(
            `ecommerce/products?page=${page}&limit=${limit}`
          );
          this.productsData = data.data;
          console.log("data :>> ", data);
          handleSuccess(data.statusCode.toString(), data.message);
          resolve(data.data);
        } catch (err) {
          handleError(err);
          reject(err);
        }
      });
    },
    async deleteProduct(productId: string) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const { data } = await axios.delete<APIResponse<Product>>(
            `ecommerce/products/${productId}`
          );
          console.log("data :>> ", data);
          this.productsData.products = this.productsData.products.filter(
            (product) => product._id !== productId
          );
          resolve(data.data);
        } catch (err) {
          handleError(err);
          reject(err);
        }
      });
    },
    async getProduct(productId: string) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const { data } = await axios.get<APIResponse<Product>>(
            `ecommerce/products/${productId}`
          );
          resolve(data.data);
        } catch (err) {
          handleError(err);
          reject(err);
        }
      });
    },
    async editProduct(
      productId: string,
      product: {
        name: string;
        price: number;
        stock: number;
        mainImage: File | undefined;
        subImages: File[] | undefined;
        description: string;
        category: string | undefined;
      }
    ) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const formData = new FormData();
          formData.append("name", product.name);
          formData.append("description", product.description);
          formData.append("price", product.price.toString());
          formData.append("stock", product.stock.toString());
          if (product.category) formData.append("category", product.category);
          if (product.mainImage)
            formData.append("mainImage", product.mainImage);

          if (product.subImages) {
            for (let i = 0; i < product.subImages.length; i++) {
              formData.append("subImages", product.subImages[i]);
            }
          }

          const { data } = await axios.patch<APIResponse<Product>>(
            `ecommerce/products/${productId}`,
            formData
          );
          console.log("data :>> ", data);
          resolve(data.data);
        } catch (err) {
          handleError(err);
          reject(err);
        }
      });
    }
  }
});
