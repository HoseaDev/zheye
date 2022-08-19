<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="@/assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <column-list :list="columns2"/>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <!--    <button-->
    <!--        class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"-->
    <!--        @click="loadMorePage" v-if="!isLastPage"-->
    <!--    >-->
    <!--      加载更多-->
    <!--    </button>-->

  </div>
</template>
<script setup lang="ts">
import ColumnList from "@/components/ColumnList.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import {GlobalDataPros} from "@/store";

const store = useStore<GlobalDataPros>()
// const columns = store.state.columns
// console.log('columns=' + columns)
const columns2 = computed(() => store.state.columns)
// console.log('columns2=' + columns2)
console.log('user=' + store.state.user.name)
store.dispatch('getColumn')

</script>
