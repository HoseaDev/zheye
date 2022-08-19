<template>
  <div>
    <slot></slot>
    <div @click.prevent="submitForm">
      <slot class="submit-area" name="submit">
        <button type="submit" class="btn btn-primary">Submit</button>
      </slot>

    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineExpose, onMounted, onUnmounted} from "vue";
import emitter from "@/hooks/Emitter";
import {ComponentInternalInstance} from "@vue/runtime-core";

type ValidFunc = () => boolean
let vaildFs: ComponentInternalInstance[] = []
const emits = defineEmits(['submit-form'])
const submitForm = () => {

  const result = vaildFs.map(func => {
    const b = func.exposed?.validValue()
    if (!b) {
      func.exposed?.clearInput()
    }
    return b
  }).every(b => {
   return  b
  })
  console.log('result ', result)
  emits('submit-form', result)
}
// const eventCallBack = (fuc: ValidFunc) => {
//   vaildFs.push(fuc)
//   // console.log('eventCallBack' + fuc)
// }
const eventCallBack = (cii: ComponentInternalInstance) => {
  vaildFs.push(cii)
  console.log('eventCallBack' + cii)
}
// 这里不能放在onMounted中, 因为父类的onmounted比子类的后加载
emitter.on('input-created', eventCallBack)
onUnmounted(() => {
  emitter.off('input-created', eventCallBack)
  vaildFs = []
})
const clearInputs = () => {
  vaildFs.map(func => func.exposed?.clearInput())
}

defineExpose({
  clearInputs
})

</script>

<style scoped>

</style>
