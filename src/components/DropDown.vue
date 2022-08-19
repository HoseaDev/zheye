<template>
  <div class="dropdown" ref="dropDownRef">
    <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
            @click.prevent="handleChangeShow">
      你好 {{ title }}
    </button>
    <ul class="dropdown-menu" style="display: block" v-if="isShow">
      <slot></slot>
    </ul>
  </div>

</template>

<script setup lang="ts">
import {defineProps, onMounted, onUnmounted, ref, watch} from "vue";
import {useClickOutside} from "@/hooks/UseClickOutside";

const props = defineProps<{
  title: string
}>()
const dropDownRef = ref<null | HTMLElement>(null)
let isShow = ref(false)
const handleChangeShow = () => {
  console.log(isShow.value)
  isShow.value = !isShow.value
}

const isCO = useClickOutside(dropDownRef)
watch(isCO, (value, oldValue, onCleanup) => {
  // console.log(value, oldValue, onCleanup)
  console.log('isShow',isShow,'isCO',isCO)
  if (isShow.value && !isCO.value) {
    isShow.value = false
  }
})

</script>

<style scoped>

</style>
