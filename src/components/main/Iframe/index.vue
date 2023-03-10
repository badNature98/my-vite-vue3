<template>
  <iframe :src="getUrl || props.src " class="Iframe">
    <div>默认</div>
  </iframe>
</template>
<script setup lang="ts">
import axios from "axios";
import { Ref, ref } from "vue";
const props = defineProps({
  get: {
    type: String,
    default: null,
  },
  //$attrs.src
  src: {
    type: String,
    default: ''
  }
});
let getUrl: Ref<string> = ref("");
if (props.get) get();
//获取文件
async function get(url = props.get) {
  if (url) {
    try {
      const { data } = await axios.get(url, {
        responseType: "blob",
      });
      getUrl.value = URL.createObjectURL(data);
    } catch (e) {
      getUrl.value = url;
    }
  }
}
</script>
<style lang="scss" scoped>
.Iframe {
  border: none;
}
</style>
