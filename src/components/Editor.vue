<template>
  <div class="editor-container">
    <textarea ref="textAreaRef"></textarea>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, onMounted, onUnmounted, ref, watch} from "vue";
import EasyMDE, {Options} from "easymde";

interface EditProps {
  modelValue?: string,
  options?: Options
}

interface EditEvents {
  (e: 'update:modelValue', str: string): void,

  (e: 'change', str: string): void,

  (e: 'blur'): void
}


const props = defineProps<EditProps>()
const emits = defineEmits<EditEvents>()
const innerValue = ref(props.modelValue || '')

const textAreaRef = ref<null | HTMLTextAreaElement>()
let easyMDEInstance: null | EasyMDE = null

watch(() => props.modelValue, (newValue) => {
  console.log('props.newValue', props.modelValue)
  console.log('newValue', newValue)
  console.log('innerValue.value', innerValue.value)
  if (newValue !== innerValue.value) {
    easyMDEInstance?.value(newValue!!)
  }

},)


onMounted(() => {
  if (!easyMDEInstance) {
    easyMDEInstance = new EasyMDE({...props.options || {}, initialValue: innerValue.value})
    easyMDEInstance.codemirror.on('change', () => {
      console.log('change......')
      const newValue = easyMDEInstance!!.value()
      innerValue.value = newValue
      emits('update:modelValue', newValue!!)
      emits('change', newValue!!)

    })
    easyMDEInstance.codemirror.on('blur', () => {
      emits('blur')
    })
  }
})
onUnmounted(() => {
  if (easyMDEInstance) {
    easyMDEInstance.cleanup()
  }
  easyMDEInstance = null
})

const clear = () => {
  if (easyMDEInstance) {
    easyMDEInstance.value()
  }
}
const getCoreInstance = () => {
  return easyMDEInstance
}

defineExpose({
  clear, getCoreInstance
})

</script>

<style scoped lang="scss">
.editor-container.is-invalid {
  border: 1px solid red;
}

</style>
