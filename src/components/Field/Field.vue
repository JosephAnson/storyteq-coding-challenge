<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";

interface Props {
  label: string;
  labelFor: string;
  warning: string;
}
const props = withDefaults(defineProps<Props>(), {});

const showHelp = computed(() => props.warning && props.warning.length > 0);
</script>

<template>
  <div class="field mb-4">
    <label
      :for="props.labelFor"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ props.label }}
    </label>

    <slot />

    <div v-if="showHelp" class="text-xs text-red-600">
      {{ props.warning }}
    </div>
  </div>
</template>
