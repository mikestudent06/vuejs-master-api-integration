<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import GlobalLoader from "vue-global-loader/GlobalLoader.vue";
import CircleSpinner from "vue-global-loader/CircleSpinner.vue";
import { Notivue, Notification, push } from "notivue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
  <GlobalLoader>
    <CircleSpinner />
  </GlobalLoader>
  <NavBar />
  <RouterView />
</template>

<style lang="ts" scoped></style>
