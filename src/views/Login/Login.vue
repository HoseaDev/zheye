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
import {UserProps} from "@/model/ModelDeclare";
import createMessage from "@/views/utils/CreateMessage";


const emailRules: RulesProp = [
  {type: "required", message: '不能为空'},
  {type: "email", message: '请填写正确的email'},
]
const requiredRules: RulesProp = [
  {type: "required", message: '不能为空'}
]

const validForm = ref<any>()
const router = useRouter()
const store = useStore()
const emailRef = ref<any>()
const passwordRef = ref<any>()


const submitForm = (result: Boolean) => {
  if (result) {
    // console.log(emailRef.getInputValue)
    // console.log(passwordRef.value.getInputValue())
    store.dispatch('login', {
      email: emailRef.value.getInputValue(),
      password: passwordRef.value.getInputValue()
    }).then((data) => {
      console.log('login success', data)
      let message = createMessage('登录成功', 'success');
      setTimeout(() => {
        message.destroy()
        router.push({path: '/'})
      }, 2000)

    }).catch(e => {
      let message = createMessage(e, 'error');
      setTimeout(() => {
        message.destroy()
      }, 2000)
      console.log('login catch', e)
    })

  }

}


</script>

<template>
  <div class="container p-0">
    <valid-form @submit-form="submitForm"
                ref="validForm"
    >
      <label for="validationServer05" class="form-label">邮箱</label>
      <valid-input :rules="emailRules"
                   placeholder="请输入邮箱"
                   ref="emailRef"
      />
      <label for="validationServer05" class="form-label">密码</label>
      <valid-input :rules="requiredRules"
                   placeholder="请输入密码"
                   type="password"
                   ref="passwordRef"
      />
      <template v-slot:submit>
        <button class="btn-primary btn">立即登录</button>
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
