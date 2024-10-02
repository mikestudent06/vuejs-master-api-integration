import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import type { APIResponse, Categories, Category } from "@/types";

export const useCategoryStore = defineStore("CategoryStore", {
  state: () => ({
    categoriesData: {} as Categories
  }),
  actions: {
    async createCategory(form: Record<string, string>) {
      return new Promise<Category>(async (resolve, reject) => {
        try {
          const { data } = await axios.post<APIResponse<Category>>(
            "ecommerce/categories",
            { ...form }
          );
          console.log("data :>> ", data);
          resolve(data.data);
        } catch (err) {
          reject(err);
        }
      });
    },
    async getCategories(page: number, limit: number) {
      return new Promise<Categories>(async (resolve, reject) => {
        try {
          const { data } = await axios.get<APIResponse<Categories>>(
            `ecommerce/categories?page=${page}&limit=${limit}`
          );
          this.categoriesData = data.data;
          console.log("data :>> ", data);
          resolve(data.data);
        } catch (err) {
          reject(err);
        }
      });
    }
  }
});
