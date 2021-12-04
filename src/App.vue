<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { useCityStore } from "./store/CityStore";
import { useBookStore } from "./store/BookStore";

import VAutoComplete from "./components/AutoComplete/AutoComplete.vue";

const form = ref();
const { activate } = useFocusTrap(form, {
  immediate: true,
  allowOutsideClick: true,
});

const cityStore = useCityStore();
const bookStore = useBookStore();

const appState = reactive({
  selectedItem: "",
  bookSearch: "",
});

onMounted(() => {
  activate();
});
</script>

<template>
  <div class="container mx-auto py-16 px-4">
    <form ref="form">
      <div class="grid sm:grid-cols-2 gap-4">
        <!-- No V-Model -->
        <v-auto-complete
          id="city"
          label="Cities"
          :data="cityStore.cities"
          @select="appState.selectedItem = $event"
        ></v-auto-complete>

        <!-- V-Model -->
        <!-- Uses search key to identify where to search in object -->
        <v-auto-complete
          id="book"
          v-model:search="appState.bookSearch"
          label="Books"
          search-key="title"
          :data="bookStore.books"
          @select="appState.selectedItem = $event"
        >
          <template #result="result">
            <dt
              class="text-sm font-medium text-gray-500 group-hover:text-white mb-1"
            >
              {{ result.item.title }}
            </dt>
            <dd
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 group-hover:text-white"
            >
              {{ result.item.author }}
            </dd>
          </template>
        </v-auto-complete>
      </div>
    </form>

    <div class="">
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Selected item</label
      >
      <code>
        <pre>{{ appState.selectedItem }}</pre>
      </code>
    </div>
  </div>
</template>
