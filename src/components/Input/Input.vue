<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from "vue";
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

const emit = defineEmits(["update:value", "focus", "blur"]);

const newValue = useVModel(props, "value", emit);
</script>

<template>
  <div class="input mb-1 relative rounded-md shadow-sm">
    <input
      :id="props.id"
      :value="newValue"
      type="text"
      :name="props.name"
      class="input focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md"
      placeholder="Start Searching..."
      autocomplete="off"
      @input="$emit('update:value', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
  </div>
</template>
