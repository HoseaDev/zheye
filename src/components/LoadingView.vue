<template>
  <!-- Modal -->
  <teleport to="#modal">
    <div class="modal d-block  d-flex  justify-content-center flex-column align-items-center " tabindex="-1"
         v-if="isShow">
      <div class="spinner-border text-success  ">

      </div>
      <div class="mt-2">
        loading.....
      </div>
    </div>


  </teleport>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import store from "@/store";
import useDOMCreateRootNode from "@/hooks/UseDOMCreateRootNode";

const props = defineProps<{ isShow: boolean }>()

useDOMCreateRootNode('modal')

</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
