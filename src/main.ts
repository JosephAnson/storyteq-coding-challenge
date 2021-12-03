import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import "windi.css";

createApp(App).use(createPinia()).mount("#app");
