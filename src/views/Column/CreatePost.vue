<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import 'bootstrap/dist/css/bootstrap.css'
//这里如果只导入了bootstrap的css文件,复制代码的时候 js代码将无法生效. 这里我们在学习阶段.故暂时不导入js
// import 'bootstrap/dist/js/bootstrap.js'
import ValidInput, {RulesProp} from "@/components/ValidInput.vue";
import {onMounted, reactive, ref} from "vue";
import ValidForm from "@/components/ValidForm.vue";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";
import {UserProps, PostProps, BaseResult, ImageProps,} from "@/model/ModelDeclare";
import {GlobalDataPros} from "@/store";
import createMessage from "@/views/utils/CreateMessage";
import Uploader from "@/components/Uploader.vue";
import EasyMDE, {Options} from "easymde";
import Editor from "@/components/Editor.vue";

const requiredRules: RulesProp = [
  {type: "required", message: '不能为空'}
]

const router = useRouter()
const route = useRoute()
const store = useStore<GlobalDataPros>()
const titleVal = ref()
const contentVal = ref()
const imgUrl = ref()
const isEditMode = ref(false)
const uploadedData = ref()
const contentRef = ref<null | HTMLTextAreaElement>()
let imageId = ''
isEditMode.value = !!route.query.id
const editStatus = reactive({
  error: false,
  message: ''
})
const uploadCheck = (file: File): boolean => {
  const isImg = file.type === 'image/jpeg'
  if (!isImg) {
    createMessage('只能上传jpg格式的文件', 'error', 2000)
  }
  console.log('isImg', isImg, file.type)
  return isImg
}
const handleFileUploaded = (data: BaseResult<ImageProps>) => {
  console.log('data', data.data.url)
  imgUrl.value = data.data.url
  imageId = data.data.url!!
}
const editOptions: Options = {
  spellChecker: false
}
const checkEditor = () => {
  console.log('editBlur', contentVal.value)
  if (contentVal.value.trim() === '') {
    editStatus.error = true
    editStatus.message = "内容不能为空"
  } else {
    editStatus.error = false
    editStatus.message = ""
  }
}

const onFormSubmit = (result: boolean) => {
  checkEditor()
  if (result && !editStatus.error) {
    const {column, _id} = store.state.user
    console.log('onFormSubmit')
    if (column) {
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id
      }
      if (imageId) {
        newPost.image = imageId
      }
      const actionName = isEditMode ? 'updatePost' : 'createPost'
      const sendData = isEditMode
          ? {
            id: route.query.id,
            payload: newPost
          }
          : newPost
      console.log('request ---')
      store.dispatch(actionName, sendData).then(() => {
        createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
        setTimeout(() => {
          router.push({name: 'column', params: {id: column}})
        }, 2000)
      })
    }
  }

}

onMounted(() => {
  if (isEditMode.value) {
    console.log('isEditMode', isEditMode)
    store.dispatch('getPostById', route.query.id).then((rawData: BaseResult<PostProps>) => {
      const currentPost = rawData.data;
      if (currentPost.image) {
        uploadedData.value = {data: currentPost.image}
      }
      titleVal.value = currentPost.title
      contentVal.value = currentPost.content || ''

    })

  }
})

</script>

<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? '编辑文章' : '新建文章' }}</h4>
    <uploader
        action="/upload"
        :beforeUpload="uploadCheck"
        @file-uploaded="handleFileUploaded"
        :uploaded="uploadedData"
        class="uploader d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <template #default>
        <div class="uploader--child d-flex align-items-center ">
          <h2 class="text-center">点击上传头图</h2>
        </div>
      </template>
      <template #loading>
        <div class="uploader--child d-flex align-items-center">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area uploader--child d-flex align-items-center">
          <img :src="dataProps.uploadedData && dataProps.uploadedData.url">
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <valid-form @submit-form="onFormSubmit">
      <div class="mb-3 ">
        <label class="form-label">文章标题：</label>
        <valid-input
            :rules="requiredRules" v-model="titleVal"
            placeholder="请输入文章标题"
            type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <editor
            v-model="contentVal"
            :class="{'is-invalid':editStatus.error}"
            @blur="checkEditor"
            :options="editOptions"
        >
        </editor>
        <span class="invalid-feedback mt-1" v-if="editStatus.error">{{ editStatus.message }}wula</span>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{ isEditMode ? '更新文章' : '发表文章' }}
        </button>
      </template>
    </valid-form>
  </div>
</template>

<style scoped lang="scss">
.create-post-page {
  .uploader--child {
    height: 200px;
    cursor: pointer;
    overflow: hidden;

  }
}


.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploaded-area {
  position: relative;
}

.uploaded-area:hover h3 {
  display: block;
}

.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
