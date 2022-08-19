<template>
  <nav class="navbar  bg-primary  justify-content-between mb-4 px-4">
    <div class="container-fluid">
      <router-link class="navbar-brand text-white" to="/">Navbar</router-link>
      <div v-if="!user.isLogin">
        <router-link class="btn btn-outline-light me-3 " to="/login">登录</router-link>
        <router-link class="btn btn-outline-light me-3 " to="/register">注册</router-link>
        <!--        <div class="btn btn-outline-light me-3"><router-link >注册</router-link></div>-->
        <!--        <div class="btn btn-outline-light"><router-link>注册</router-link></div>-->
      </div>
      <div v-else>
        <!--        <button class="btn btn-outline-light" type="submit">欢迎{{ user.name }}</button>-->
        <DropDown :title="user.nickName">
          <drap-down-item>
            <router-link class="dropdown-item" to="/column/create">新增文章</router-link>
          </drap-down-item>
          <drap-down-item :disabled="true">
            <a class="dropdown-item" href="#">强烈欢迎</a>
          </drap-down-item>
          <drap-down-item>
            <a class="dropdown-item" href="#">退出</a>
          </drap-down-item>
        </DropDown>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import DropDown from "@/components/DropDown.vue";
import DrapDownItem from "@/components/DrapDownItem.vue";
import {UserProps} from "@/model/ModelDeclare";


const props = defineProps<{ user: UserProps }>()

</script>

<style scoped>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
