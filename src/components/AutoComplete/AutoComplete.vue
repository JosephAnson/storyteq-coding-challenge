<template>
  <div class="auto-complete" ref="autocomplete">
    <v-field
      class="relative"
      :label-for="id"
      :label="label"
      :warning="!searchLength ? 'Type at least 3 characters' : ''"
    >
      <v-input
        :id="id"
        v-model:value="newSearch"
        :name="id"
        data-test="autocomplete-input"
        @focus="open = true"
      />

      <div
        v-if="searchLength && open"
        class="autocomplete__items absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
        <div v-if="!filteredResultsEmpty">
          <v-auto-complete-item
            v-for="(item, index) in filteredData"
            :key="item"
            @click="select(item)"
          >
            <slot name="result" :item="item" :index="index">
              <dt
                class="text-sm font-medium text-gray-500 group-hover:text-white"
              >
                {{ item }}
              </dt>
            </slot>
          </v-auto-complete-item>
        </div>
        <v-auto-complete-item v-else class="text-sm font-medium text-gray-500">
          No results
        </v-auto-complete-item>
      </div>
    </v-field>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { onClickOutside, templateRef, useVModel } from "@vueuse/core";
import get from "lodash.get";

import Input from "../Input/Input.vue";
import Field from "../Field/Field.vue";
import AutoCompleteItem from "./AutoCompleteItem.vue";

type DataItem = Record<string, string | number> | string;

export default defineComponent({
  components: {
    VInput: Input,
    VField: Field,
    VAutoCompleteItem: AutoCompleteItem,
  },
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    search: { type: String, default: "" },
    searchKey: { type: String, default: "" },
    data: {
      type: Array as PropType<DataItem[]>,
      required: true,
    },
  },
  emits: ["update:search", "select"],
  setup(props, { emit }) {
    const autocomplete = templateRef("autocomplete");

    const newSearch = useVModel(props, "search", emit, { passive: true });

    const open = ref(false);

    onClickOutside(autocomplete, () => (open.value = false));

    const searchLength = computed(() => newSearch.value.length >= 3);
    const filteredResultsEmpty = computed(() => filteredData.value.length <= 0);
    const filteredData = computed(() => {
      const lowerCaseSearch = newSearch.value.toLowerCase();

      if (!lowerCaseSearch) {
        return [];
      }

      return props.data
        .filter((item) => {
          if (typeof item === "string") {
            return item.toLowerCase().indexOf(lowerCaseSearch) >= 0;
          } else {
            const node = get(item, props.searchKey).toString().toLowerCase();
            return node.indexOf(lowerCaseSearch) >= 0;
          }
        })
        .sort();
    });

    function select(item: DataItem) {
      if (typeof item === "string") {
        newSearch.value = item;
      } else {
        newSearch.value = get(item, props.searchKey).toString();
      }

      emit("select", item);
      open.value = false;
    }

    return {
      newSearch,
      searchLength,
      open,
      filteredResultsEmpty,
      filteredData,
      select,
    };
  },
});
</script>
