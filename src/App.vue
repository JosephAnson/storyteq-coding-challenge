<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import VAutoComplete from "./components/AutoComplete/AutoComplete.vue";
import { useCityStore } from "./store/CityStore";
import { useBookStore } from "./store/BookStore";
import { storeToRefs } from "pinia";

const form = ref();
const { activate } = useFocusTrap(form, { immediate: true });

const cityStore = useCityStore();
const { cities } = storeToRefs(cityStore);

const bookSearch = ref("");
const bookStore = useBookStore();
const { books } = storeToRefs(bookStore);

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
          :data="cities"
        ></v-auto-complete>

        <!-- V-Model -->
        <!-- Uses search key to identify where to search in object -->
        <v-auto-complete
          id="book"
          v-model:search="bookSearch"
          label="Books"
          search-key="title"
          :data="books"
        >
          <template #result="result">
            <dt class="text-sm font-medium text-gray-500">
              {{ result.item.title }}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ result.item.author }}
            </dd>
          </template>
        </v-auto-complete>
      </div>
    </form>
  </div>
</template>
