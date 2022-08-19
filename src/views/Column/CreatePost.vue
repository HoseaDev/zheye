<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import 'bootstrap/dist/css/bootstrap.css'
//这里如果只导入了bootstrap的css文件,复制代码的时候 js代码将无法生效. 这里我们在学习阶段.故暂时不导入js
// import 'bootstrap/dist/js/bootstrap.js'
import ValidInput, {RulesProp} from "@/components/ValidInput.vue";
import {onMounted, ref} from "vue";
import ValidForm from "@/components/ValidForm.vue";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";
import {UserProps, PostProps,} from "@/model/ModelDeclare";
import {GlobalDataPros} from "@/store";

const requiredRules: RulesProp = [
  {type: "required", message: '不能为空'}
]

const validForm = ref<any>()
const router = useRouter()
const route = useRoute()
const store = useStore<GlobalDataPros>()
const titleRef = ref()
const contentRef = ref()


const submitForm = (result: Boolean) => {
  if (result) {
    const {column} = store.state.user
    const post = <PostProps>{
      column,
      image: '',
      createAt: new Date().toLocaleString(),
      _id: new Date().getTime().toString(),
      description: contentRef.value,
      title: titleRef.value

    }
    store.commit('createPost', post)
    router.push({name: 'column', params: {id: column}})
  }

}


</script>

<template>
  <div class="container p-0">
    <valid-form @submit-form="submitForm"
                ref="validForm"
    >
      <label for="validationServer05" class="form-label">标题</label>

      <valid-input :rules="requiredRules"
                   placeholder="请输入标题"
                   type="text"
                   v-model="titleRef"
      />
      <label for="validationServer05" class="form-label">内容</label>
      <valid-input :rules="requiredRules"
                   placeholder="请输入内容"
                   type="text"
                   :current-tag-type="'textarea'"
                   v-model="contentRef"
      />
      <template v-slot:submit>
        <button class="btn-primary btn">提交文章</button>
      </template>
    </valid-form>
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
