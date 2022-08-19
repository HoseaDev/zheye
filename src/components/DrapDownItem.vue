<template>
  <li class="dropdown-item" :class="{'disabled':disabled}">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{ disabled: Boolean }>();
</script>

<style scoped lang="scss">
.dropdown-item.disabled {
  color: red;
  pointer-events: none;
  background: transparent;

}

</style>
