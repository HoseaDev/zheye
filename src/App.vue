<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import 'bootstrap/dist/css/bootstrap.css'
//这里如果只导入了bootstrap的css文件,复制代码的时候 js代码将无法生效. 这里我们在学习阶段.故暂时不导入js
// import 'bootstrap/dist/js/bootstrap.js'
import ColumnList from "./components/ColumnList.vue";
import GlobalHeader from "@/components/GlobalHeader.vue";
import Home from "@/views/Home/Home.vue";
import Login from "@/views/Login/Login.vue";
import {useStore} from "vuex";
import {computed, createApp, onMounted} from "vue";
import LoadingView from "@/components/LoadingView.vue";
import axios from "axios";
import {GlobalDataPros} from "@/store";
import Message from "@/components/Message.vue";
import TestRender from "@/components/TestRender";
import Uploader from "@/components/Uploader.vue";
import createMessage from "@/views/utils/CreateMessage";
import {Avatar, BaseResult} from "@/model/ModelDeclare";

const store = useStore<GlobalDataPros>()
// const user = store.state.user
const user2 = computed(() => store.state.user)
const token = computed(() => store.state.token)
const isShow = computed(() => {
  return store.state.isShowLoading
})
const error = computed(() => {
  console.log('error computed', store.state.error)

  return store.state.error
})
const closeError = function () {
  console.log('click close ')

}
const onUploadBefore = (file: File): boolean => {
  const isImg = file.type === 'image/jpeg'
  if (!isImg) {
    createMessage('只能上传jpg格式的文件', 'error', 2000)
  }
  console.log('isImg', isImg, file.type)
  return isImg
}
const onUploadCompleted = (data: BaseResult<Avatar>) => {
  console.log('data', data.data.url)
}


onMounted(() => {
  console.log('isLogin', user2.value.isLogin)
  if (token.value) {
    console.log('token', true)
  } else {
    console.log('token', false)
  }
})

</script>

<template>
  <div class="container-fluid">
    <global-header :user="user2"></global-header>
    <uploader :beforeUpload="onUploadBefore" @onFileCompleted="onUploadCompleted" >
      <!--    <uploader @beforeUpload="onUploadBefore" @onFileCompleted="onUploadCompleted">-->
      <h2>点击上传</h2>
      <template #uploaded="{ uploadData }">
        <img :src="uploadData.url" alt="">
      </template>

    </uploader>
    <loading-view :isShow="isShow"></loading-view>
    <!--    <message :error="error" @close-message="closeError" v-if="error.status" :type="'success'"></message>-->
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<style scoped>


</style>
