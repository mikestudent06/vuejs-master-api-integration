import "./assets/main.css";
import { globalLoader } from "vue-global-loader";
import { createNotivue } from "notivue";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "notivue/notification.css"; // Only needed if using built-in <Notification />
import "notivue/animations.css"; // Only needed if using default animations

const notivue = createNotivue(/* Options */);

const app = createApp(App);

app.use(notivue);
app.use(globalLoader, {
  // Options
});
app.use(createPinia());
app.use(router);

app.mount("#app");
