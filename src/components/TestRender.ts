import {h} from "vue";

export default {
  name: "TestRender",
  setup() {
    return () => [h('div', {id: 'foo', class: 'bar'}, 'Hosea Render')]
  }
}

