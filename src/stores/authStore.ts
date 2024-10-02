import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import type { APIResponse, User } from "@/types";
import { getLocalStorageData } from "@/lib/utils";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    // user: {} as User | null,
    user: getLocalStorageData<User | null>("currentUserContent", true)
  }),
  actions: {
    async registerUser(form: Record<string, string>) {
      return new Promise<User>(async (resolve, reject) => {
        try {
          const { data } = await axios.post<APIResponse<{ user: User }>>(
            "users/register",
            { ...form }
          );
          console.log("data :>> ", data);
          resolve(data.data.user);
        } catch (err) {
          reject(err);
        }
      });
    },
    async loginUser(form: Record<string, string>) {
      return new Promise<User>(async (resolve, reject) => {
        try {
          const { data } = await axios.post<
            APIResponse<{
              user: User;
              accessToken: string;
              refreshToken: string;
            }>
          >("users/login", { ...form });
          console.log("data :>> ", data);
          this.user = data.data.user;
          localStorage.setItem(
            "currentUserContent",
            JSON.stringify(data.data.user)
          );
          localStorage.setItem(
            "currentUserCredentials",
            JSON.stringify({
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken
            })
          );
          resolve(data.data.user);
        } catch (err) {
          reject(err);
        }
      });
    }
  }
});
