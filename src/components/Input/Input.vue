<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";
import { useVModel } from "@vueuse/core";

interface InputProps {
  id?: string;
  name?: string;
  value?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  id: undefined,
  name: undefined,
  value: "",
});

const newValue = useVModel(props, "value");
</script>

<template>
  <div class="input mb-1 relative rounded-md shadow-sm">
    <input
      :id="props.id"
      v-model="newValue"
      type="text"
      :name="props.name"
      class="input focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md"
      placeholder="Start Searching..."
      autocomplete="off"
    />
  </div>
</template>
