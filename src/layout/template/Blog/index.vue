<script lang="ts">
import { defineComponent } from "vue";
import BlogHeader from "./components/BlogHeader/index.vue";
import BlogBody from "./components/BlogBody/index.vue";
export default defineComponent({
  components: { BlogHeader, BlogBody },
  setup() {
    return {};
  },
});
</script>

<template>
  <Header>
    <BlogHeader>
      <h3 class="blogTitle">博客</h3>
      <RouterMenu path="/blog" mode="horizontal" />
    </BlogHeader>
  </Header>
  <BlogBody><Main /> </BlogBody>
</template>
<style lang="scss" scoped>
$blog-header-height: 60px;
$blog-header-padding: 20px;
$blog-title-color: green ;
.BlogHeader {
  box-sizing: content-box;
  padding: 0 $blog-header-padding;
  display: flex;
  align-items: center;
  height: $blog-header-height;
  .el-menu{
    padding-left: $blog-header-padding;
    padding-right: $blog-header-padding;
    height: 100%;
    flex-grow: 1;
  }
}
.BlogBody {
  box-sizing: content-box;
  margin: auto;
}
.blogTitle{
  font-size: 24px;
  text-shadow: -2px 2px 1px $blog-title-color;
}
</style>
