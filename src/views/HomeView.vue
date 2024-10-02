<script setup lang="ts">
import ProductModal from "@/components/ProductModal.vue";
import Button from "@/components/ui/button/Button.vue";
import useProductModal from "@/composables/useProductModal";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import { ref, computed, onMounted } from "vue";
import { useGlobalLoader } from "vue-global-loader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icon } from "@iconify/vue";

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from "@/components/ui/pagination";
import { useRouter } from "vue-router";

const currentPage = ref(1);
const { isOpen, onClose, onOpen } = useProductModal();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const products = computed(() => productStore.productsData.products);
const totalPages = computed(() => productStore.productsData.totalPages);
const totalProducts = computed(() => productStore.productsData.totalProducts);
const productsData = computed(() => productStore.productsData);
const router = useRouter();

const { displayLoader, destroyLoader, isLoading } = useGlobalLoader({
  screenReaderMessage: "Fetching products and categories, please wait..."
});

const fetchCategories = async () => {
  try {
    await categoryStore.getCategories(currentPage.value, 5);
    console.log("categories :>> ", categoryStore.categoriesData);
  } catch (err) {
    console.log("error :>> ", err);
  }
};

const fetchProducts = async () => {
  try {
    await productStore.getProducts(currentPage.value, 2);
    console.log("products :>> ", productStore.productsData);
  } catch (err) {
    console.log("error :>> ", err);
  }
};

const initialSetup = async () => {
  try {
    displayLoader();
    await fetchCategories();
    await fetchProducts();
  } catch (err) {
    console.log("error :>> ", err);
  } finally {
    destroyLoader();
  }
};

const deleteProduct = async (productId: string) => {
  try {
    await productStore.deleteProduct(productId);
  } catch (err) {
    console.log("error :>> ", err);
  }
};

onMounted(async () => {
  await initialSetup();
});
</script>

<template>
  <ProductModal v-if="isOpen" />
  <div class="mx-auto w-full max-w-4xl my-10">
    <div class="flex justify-between items-center">
      <h3 class="text-2xl font-bold">All products</h3>
      <Button @click="onOpen">Add product</Button>
    </div>
    <div class="w-full grid grid-cols-3 gap-4 my-10">
      <Card v-for="product in products" :key="product._id">
        <CardContent class="grid gap-4 p-4 pt-4">
          <div class="overflow-hidden rounded-md">
            <img
              :src="product.mainImage.url"
              :alt="product.name"
              class="h-auto w-full object-cover transition-all hover:scale-105"
            />
          </div>
          <h3 class="text-xl font-semibold">
            {{ product.name }}
          </h3>
          <p>
            {{ product.description }}
          </p>
        </CardContent>
        <CardFooter class="border-t p-4 pt-4 w-full justify-between">
          <p>{{ product.price }}$</p>
          <div class="flex space-x-2">
            <Button
              variant="secondary"
              @click="router.push(`/products/${product._id}`)"
            >
              <Icon icon="tabler:pencil" class="h-4 w-4" />
            </Button>
            <Button variant="destructive" @click="deleteProduct(product._id)">
              <Icon icon="tabler:trash" class="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
    <div
      class="w-full flex justify-center"
      v-if="Object.keys(productsData).length && productsData.products.length"
    >
      <Pagination
        v-slot="{ page }"
        :total="totalProducts"
        :default-page="1"
        :items-per-page="2"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst
            @click="
              async () => {
                currentPage = 1;
                await fetchProducts();
              }
            "
          />
          <PaginationPrev
            @click="
              async () => {
                currentPage = currentPage - 1;
                await fetchProducts();
              }
            "
          />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-10 h-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="
                  async () => {
                    currentPage = item.value;
                    await fetchProducts();
                  }
                "
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext
            @click="
              async () => {
                currentPage = currentPage + 1;
                await fetchProducts();
              }
            "
          />
          <PaginationLast
            @click="
              async () => {
                currentPage = totalPages;
                await fetchProducts();
              }
            "
          />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
