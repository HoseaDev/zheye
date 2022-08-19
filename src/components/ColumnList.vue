<template>
  <div class="row">
    <div v-for="item in computedColumnProps" :key="item.id" class="col-3 ">
      <div class="card mb-3">
        <div class="card-body text-center">
          <img :src="item.avatar.url" class="my-3 rounded-circle border border-light w-25">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-start">{{ item.description }}</p>
<!--          <router-link :to="{name:'column' ,params:{id:item.id}}" class="btn btn-outline-primary">进入专栏</router-link>-->
          <router-link :to="`/column/${item._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import img1 from '@/assets/placeholder2.webp'
import {ColumnProps} from "@/model/ModelDeclare";

// import img1 from '@/assets/placeholder.png'
console.log('columnList --- setup ')



const props = defineProps<{ list: ColumnProps[] }>()

const computedColumnProps = computed(() => {
  return props.list.map(column => {
    console.log('computedColumnProps', column)
    if (column.avatar) {
      column.avatar.url = img1
    }
    return column
  })
})
console.log('...setup done')
</script>

<style scoped>

</style>
