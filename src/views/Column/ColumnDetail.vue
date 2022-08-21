<template>
  <div class="d-flex  align-items-center  gap-4 mb-4 w-75   mx-auto border-bottom  pb-4 ">
    <img :src="column?.avatar?.url" class="rounded-circle column-img border-1"/>
    <div class="d-flex   flex-column justify-content-center ">
      <h3>{{ column?.title }}</h3>
      <p class="opacity-75 ">{{ column?.description }}</p>
    </div>

  </div>
  <post-list :list="posts"></post-list>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {GlobalDataPros} from "@/store";
import {computed} from "vue";
import PostList from "@/components/PostList.vue";
import {objToArr} from "@/hooks/helper";

const route = useRoute()
const columId = route.params.id;
console.log('columnId= ' + columId)
console.log('columndetail setup = ')
const store = useStore<GlobalDataPros>()
const column = computed(() => {
  return store.state.columns.find(c => c._id === columId)
})
const posts = computed(() => store.getters.getPostsByCId(columId))
store.dispatch('getPostsByColumnId', columId)


</script>

<style scoped>
.column-img {
  width: 10rem;
  height: 10rem;
}
</style>
