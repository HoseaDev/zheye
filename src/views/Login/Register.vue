<template>
  <div class="container p-0">
    <valid-form @submit-form="submitForm"
                ref="validForm"
    >
      <label for="validationServer05" class="form-label">邮箱</label>
      <valid-input :rules="emailRules"
                   placeholder="请输入邮箱"
                   ref="emailRef"
                   v-model="registerModel.email"
      />
      <label for="validationServer05" class="form-label">昵称</label>
      <valid-input :rules="requiredRules"
                   placeholder="请输入昵称"
                   v-model="registerModel.name"

      />
      <label for="validationServer05" class="form-label">密码</label>
      <valid-input :rules="passwordRules"
                   placeholder="请输入密码"
                   type="password"
                   v-model="registerModel.password"
      />
      <label for="validationServer05" class="form-label">确认密码</label>
      <valid-input :rules="repasswordRules"
                   placeholder="请输入密码"
                   type="password"
                   ref="passwordRef"
                   v-model="registerModel.repassword"
      />
      <template v-slot:submit>
        <button class="btn-primary btn">立即注册</button>
      </template>
    </valid-form>
  </div>

</template>

<script setup lang="ts">
import {reactive, toRefs} from "vue";
import ValidInput, {RulesProp} from "@/components/ValidInput.vue";
import ValidForm from "@/components/ValidForm.vue";
import axios from "axios";
import {useRouter} from "vue-router";
import createMessage from "@/views/utils/CreateMessage";

const registerModel = reactive({
  email: null,
  name: null,
  password: null,
  repassword: null
})
const router = useRouter()

const emailRules: RulesProp = [
  {type: "required", message: '不能为空'},
  {type: "email", message: '请填写正确的email'},
]
const passwordRules: RulesProp = [
  {type: "required", message: '不能为空'}
]
const repasswordRules: RulesProp = [
  {type: "required", message: '不能为空'},
  {
    type: 'custom', custom: () => {
      return registerModel.password === registerModel.repassword
    },
    message: '密码不相同'
  }
]
const submitForm = (result: Boolean) => {
  if (result) {
    console.log(registerModel)
    doRegister()
  }
}

async function doRegister() {
  const playload = {
    email: registerModel.email,
    nickName: registerModel.name,
    password: registerModel.password,
  }
  axios.post('/o/api/users', playload).then((response) => {
    console.log(response)
    router.push('/login')
  }, (e) => {
    createMessage(e, 'error', 2000)
    router.push('/login')
  })
}

</script>

<style scoped>

</style>
