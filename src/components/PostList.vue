<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post._id}`">{{ post.title }}</router-link>
        </h4>
        <div class=" d-flex flex-row my-3 align-items-center gap-3">

          <img :src="post.image.url" :alt="post.title" class="rounded small post-thumbnail col-1" v-if="post.image.url">
          <p class="text-muted flex-grow-0">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, computed} from 'vue'
import {PostProps} from "@/model/ModelDeclare";


export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup(props) {
    const posts = computed(() => {
      return props.list.map(post => {

        return post
      })
    })
    return {
      posts
    }
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}

.post-list h4 a:hover {
  color: #0d6efd;
}


</style>
