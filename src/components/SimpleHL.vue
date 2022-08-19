<template>
  <h2>Hosea</h2>
  <a @click="wola">wolawolawolawolawola</a>
</template>

<script setup lang="ts">
import {defineExpose} from "vue";

const wola = () => {
  console.log('wola')
}
const wola2 = () => {
  console.log('wola2')
}

defineExpose({
  wola2
})
</script>

<style scoped>

</style>
