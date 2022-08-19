<template>
  <div>
    <div class="file-upload-container" @click.stop="triggerUpload">
      <slot name="loading" v-if="fileStatus==='uploading'">
        <button class="btn btn-primary">上传中</button>
      </slot>
      <slot name="uploaded" v-if="fileStatus==='success'" :uploadData="uploadData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot name="error" v-if="fileStatus==='error'">
        <button class="btn btn-primary">上传失败</button>
      </slot>
      <slot v-else v-if="fileStatus==='ready'">
        <button class="btn btn-primary">上传文件</button>
      </slot>
      <div  @click.stop="restData" v-if="fileStatus==='success'">
        <slot name="delete" >
          <button class="btn-warning" @click.stop="restData">删除图片</button>
        </slot>
      </div>

    </div>
    <input type="file" class="d-none" ref="fileRef" @change="handleFileChoose">
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, ref} from "vue";
import axios from "axios";

type uploadStatus = 'success' | 'ready' | 'uploading' | 'error'
const fileRef = ref<null | HTMLInputElement>()

const fileStatus = ref<uploadStatus>('ready')
const uploadData = ref<Avatar>()


interface UploadEvents {
  (e: 'onFileCompleted', result: BaseResult<Avatar>): void,

  (e: 'fileUploadError', error: String): void

  (e: 'beforeUpload', file: File): boolean
}

const emits = defineEmits<UploadEvents>()
type checkFunction = (file: File) => boolean

//
// const props = defineProps({
//   user_info: {
//     type: Object as PropType<IUser>,
//     required: true,
//   },
//   user_list: {
//     type: Array as PropType<IUser[]>,
//     required: true,
//   },
//   callback: {
//     type: Function as PropType<() => void>,
//   },
// });


const props = defineProps({
      beforeUpload: {
        type: Function as PropType<checkFunction>
      }
    }
)

const triggerUpload = () => {
  console.log(fileRef.value)
  if (fileRef.value) {
    fileRef.value.click()
  }
}


import {PropType} from "vue";
import {Avatar, BaseResult} from "@/model/ModelDeclare";


const restData = () => {
  fileStatus.value = 'ready'
  console.log('fileRef.value', fileRef.value)
  fileRef.value!!.value = ''

}
const handleFileChoose = (e: Event) => {
  console.log('handleFileChoose')
  const inputFile = e.target as HTMLInputElement
  console.log('handleFileChoose', inputFile)

  fileStatus.value = 'uploading'
  console.log('handleFileChoose', inputFile.files)
  const file = inputFile.files?.item(0);
  console.log('handleFileChoose', file)

  if (file) {
    // const isPass = emits("beforeUpload", file)
    let isPass = true
    if (props.beforeUpload) {
      isPass = props.beforeUpload(file);
    }

    if (isPass) {
      console.log('before ', true)
    } else {
      console.log('before ', false)
      fileStatus.value = 'ready'
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    axios.post('/o/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      fileStatus.value = 'success'
      console.log(response)
      uploadData.value = response.data.data
      emits("onFileCompleted", response.data)

    }).catch((e) => {
      fileStatus.value = 'error'
    }).finally(() => {
      // fileStatus.value = 'ready'
      inputFile.value = ''
    })
  } else {
    emits("fileUploadError", '未选择文件')

  }


}

</script>

<style scoped>

</style>
