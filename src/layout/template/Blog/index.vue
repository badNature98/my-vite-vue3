<script lang="ts">
import { defineComponent } from "vue";
import BlogHeader from "./components/BlogHeader/index.vue";
import BlogBody from "./components/BlogBody/index.vue";
import BlogUser from "./components/BlogUser/index.vue";
import BlogQuery from "./components/BlogQuery/index.vue";
export default defineComponent({
  components: { BlogHeader, BlogBody, BlogUser, BlogQuery },
  setup() {
    return {};
  },
});
</script>

<template>
  <Header>
    <!-- <BlogHeader>
      <h3 class="blog-title">博客</h3>
      <RouterMenu :ellipsis="false" path="/blog" mode="horizontal" />
      <BlogQuery />
      <BlogUser />
    </BlogHeader> -->
    <BlogHeader>
      <BlogUser />
      <BlogQuery />
      <RouterMenu :ellipsis="false" path="/blog" mode="horizontal" />
      <h3 class="blog-title">博客</h3>
    </BlogHeader>
  </Header>
  <BlogBody><Main /> </BlogBody>
</template>
<style lang="scss" scoped>
$blog-header-height: 60px;
$blog-header-padding: 20px;
$blog-title-color: green;
.layout-header {
  z-index: 1000;
  position: sticky;
  top: 0;
}
.blog-header {
  box-sizing: content-box;
  padding: 0 $blog-header-padding;
  display: flex;
  align-items: center;
  height: $blog-header-height;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  overflow: hidden;
  .el-menu {
    padding-left: $blog-header-padding;
    padding-right: $blog-header-padding;
    height: 100%;
    flex-grow: 1;
    flex-wrap: wrap;
    overflow: hidden;
    min-width: 120px;
    padding-left: 0;
    //el-menu el-menu--horizontal el-menu-vertical-demo
    :deep() {
      .el-sub-menu {
        display: none;
      }
    }
  }
}
.blog-body {
  box-sizing: content-box;
  margin: auto;
}
.blog-title {
  padding-right: 20px;
  flex-shrink: 0;
  font-size: 2rem;
  text-shadow: -2px 2px 1px $blog-title-color;
}
.blog-query {
  flex-shrink: 0;
  :deep() {
    .el-input {
      .el-input__wrapper {
        border-radius: 60px 0 0 60px;
      }
      .el-input-group__append {

        padding: 0;
        border-radius: 0 60px 60px 0;
        cursor: pointer;
        color: blueviolet;
        background-color: #fff;
        transition: background 0.3s;
        &:hover {
          background-color: whitesmoke;
        }
        .icon{
          padding: 0 20px;
        }
      }
    }
  }
}
.blog-user {
  display: flex;
  align-items: center;
  height: $blog-header-height;
  flex-shrink: 0;
  padding-left: 30px;
  width: 100px;
  :deep(){
    .toolbar{
      .avatar{
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
