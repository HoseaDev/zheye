<template>
  <teleport to="#message">
    <div class="alert   w-50  position-absolute  top-50 start-50 translate-middle"
         :class="classObject"
    >
      <div class="d-flex">
        <strong class="flex-grow-1">{{ msg }}</strong>
        <button type="button" class="btn-close" @click="hide"></button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">

import useDOMCreateRootNode from "@/hooks/UseDOMCreateRootNode";

useDOMCreateRootNode('message')
export type MessageType = 'error' | 'success' | 'default'


const props = defineProps<{ msg: string, type: MessageType }>()

const emits = defineEmits(['close-message'])
const hide = () => {
  console.log('点击隐藏')
  emits('close-message')
}
 const classObject = {
  'alert-success': props.type == 'success',
  'alert-danger': props.type == 'error',
  'alert-primary': props.type == 'default',
}


</script>

<style scoped>

</style>
