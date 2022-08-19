<template>
  <div class="col">
    <input
        v-if="props.currentTagType==='input'"
        type="text" class="form-control" id="validationServer05" aria-describedby="validationServer05Feedback"
        @blur="validValue"
        :class="{'is-invalid' :inputRef.error}"
        :value="inputRef.val"
        @input="updateValue"
        v-bind="$attrs"
    >
    <textarea
        v-else
        class="form-control" id="validationServer05" aria-describedby="validationServer05Feedback"
        @blur="validValue"
        :class="{'is-invalid' :inputRef.error}"
        :value="inputRef.val"
        @input="updateValue"
        v-bind="$attrs"
        rows="10"
    />
    <div id="validationServer05Feedback" class="invalid-feedback">
      {{ inputRef.message }}
    </div>
  </div>

</template>

<script setup lang="ts">

console.log('script--setup')
import {defineExpose, getCurrentInstance, onMounted, reactive, useAttrs} from "vue";
import emitter from "@/hooks/Emitter";

interface RulePro {
  type: 'required' | 'email' | 'range' | 'phone' | 'custom',
  message: string,
  min: { message: string, length: number },
  max: { message: string, length: number },
  custom: () => boolean
}

export type RulesProp = RulePro[]
type tagType = 'input' | 'textarea'


interface IInput {
  val: string,
  error?: boolean,
  message?: string
}

interface IModelValueEvent {
  (e: 'update:modelValue', str: string): void

  (e: 'update:hosea', str: string): void
}


const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

const props = withDefaults(defineProps<{ rules: RulesProp, modelValue: string, currentTagType: tagType }>(), {
  currentTagType: 'input'
})
const inputRef = reactive<IInput>({val: props.modelValue || ''})

const emit = defineEmits<IModelValueEvent>();


const updateValue = (e: InputEvent) => {
  const nVualue = (e.target as HTMLInputElement).value
  inputRef.val = nVualue
  emit("update:modelValue", nVualue)
}

const validValue = () => {
  // console.log('target', (ev.target as HTMLInputElement).value)
  if (props.rules) {
    const allPassed = props.rules?.every((rule, index, array) => {
      let passed = true
      console.log(rule, index, array)
      switch (rule.type) {
        case "required":
          passed = inputRef.val.trim() !== ''
          break
        case "email":
          passed = emailRegex.test(inputRef.val)
          break
        case "phone":
          break
        case "range":
          if (inputRef.val.length < rule.min.length) {
            rule.message = rule.min.message
            passed = false
          } else if (inputRef.val.length > rule.max.length) {
            rule.message = rule.max.message
            passed = false
          }
          break
        case "custom":
          passed = rule.custom ? rule.custom() : true
          break
        default:
          break
      }
      console.log('passed', passed)
      if (!passed) {
        inputRef.message = rule.message
      }
      return passed
    })
    inputRef.error = !allPassed
    return allPassed
  } else {
    return true
  }
}
const clearInput = () => {
  inputRef.val = ""
}

onMounted(() => {
  // console.log('send emit' + this)
  // console.log('send emit' + getCurrentInstance())
  // getCurrentInstance()?.exposed?.clearInput()
  emitter.emit("input-created", getCurrentInstance())
})
const getInputValue = () => {
  return inputRef.val
}


defineExpose({
  clearInput, validValue, getInputValue
})
</script>
<script lang="ts">
console.log('script--')
export default {
  inheritAttrs: false,
}
</script>
<style scoped>

</style>
