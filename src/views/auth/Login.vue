<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { useGlobalLoader } from "vue-global-loader";
import { handleSuccess, handleError } from "@/lib/utils";

type PAYLOAD = {
  password: string;
  username: string;
};
const form = ref<PAYLOAD>({
  password: "Mike007*",
  username: "mike"
});

const { displayLoader, destroyLoader, isLoading } = useGlobalLoader({
  screenReaderMessage:
    "Signing-in, redirecting to the dashboard, please wait..."
});

const router = useRouter();
const store = useAuthStore();

const onSubmit = async () => {
  try {
    displayLoader(); // Display loader...
    await store.loginUser(form.value);
    handleSuccess("Login", "Login successful");
    router.push("/");
  } catch (error) {
    handleError(error);
  } finally {
    destroyLoader();
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl"> Welcome Back </CardTitle>
            <CardDescription>
              Enter your details below to login
            </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                v-model="form.username"
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" v-model="form.password" />
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit" :disabled="isLoading">
              Login
            </Button>
            <p>
              Don't have an account?
              <RouterLink
                to="/auth/register"
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >
                Register
              </RouterLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>
