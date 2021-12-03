<template>
  <div class="auto-complete">
    <v-field
      :label-for="id"
      :label="label"
      :warning="!searchLength ? 'Type at least 3 characters' : ''"
    >
      <v-input
        :id="id"
        v-model:value="newSearch"
        :name="id"
        data-test="autocomplete-input"
      />
    </v-field>
    <div v-if="searchLength" class="autocomplete__items">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Results
      </label>
      <ul v-if="!filteredResultsEmpty" class="rounded overflow-hidden">
        <li v-for="(item, index) in filteredData" :key="item">
          <v-auto-complete-item>
            <slot name="result" :item="item" :index="index">
              <dt class="text-sm font-medium text-gray-500">
                {{ item }}
              </dt>
            </slot>
          </v-auto-complete-item>
        </li>
      </ul>
      <v-auto-complete-item v-else class="text-sm font-medium text-gray-500">
        No results
      </v-auto-complete-item>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useVModel } from "@vueuse/core";
import get from "lodash.get";

import Input from "../Input/Input.vue";
import Field from "../Field/Field.vue";
import AutoCompleteItem from "./AutoCompleteItem.vue";

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
      type: Array as PropType<(Record<string, string | number> | string)[]>,
      required: true,
    },
  },
  emits: ["update:search"],
  setup(props, { emit }) {
    const newSearch = useVModel(props, "search", emit, { passive: true });

    const searchLength = computed(() => newSearch.value.length >= 3);
    const filteredResultsEmpty = computed(() => filteredData.value.length <= 0);
    const filteredData = computed(() => {
      const lowerCaseSearch = newSearch.value.toLowerCase();

      return props.data
        .filter((item) => {
          if (!lowerCaseSearch) {
            return false;
          }

          if (typeof item === "string") {
            return item.toLowerCase().indexOf(lowerCaseSearch) >= 0;
          } else {
            const node = get(item, props.searchKey).toString().toLowerCase();
            return node.indexOf(lowerCaseSearch) >= 0;
          }
        })
        .sort();
    });
    return {
      newSearch,
      searchLength,
      filteredResultsEmpty,
      filteredData,
    };
  },
});
</script>
