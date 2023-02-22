<script setup lang="ts">
import Item from "./components/item.vue";
import { provide, inject } from "vue";
interface item {
  type: string;
  name: string;
  child?: item;
}

const props = withDefaults(
  defineProps<{
    list?: item[];
    drop?: boolean;
  }>(),
  {
    list: () => [],
    drop: false,
  }
);

//是第几级文件
let length = inject("file-manager-length", 1);
provide("file-manager-length", length + 1);
</script>
<template>
  <div class="file-manager">
    <template v-if="props.list && props.list">
      <template v-for="(item, ind) in props.list" :key="ind">
        <Item v-if="item.type === 'file'" :data="item">
          <slot :date="item" />
        </Item>
        <div class="file-manager-drop-list" v-else-if="item.type === 'dir'">
          <DropBox
            :length="length"
            :defaultDrop="props.drop"
            class="file-manager-drop-body"
          >
            <template #header>
              <div class="file-manager-drop-title">
                {{ item.name }}
              </div>
            </template>
            <FileManager :list="item.child">
              <slot :date="item" />
            </FileManager>
          </DropBox>
        </div>
      </template>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.file-manager {
  .file-manager-item {
    cursor: pointer;
    background: white;
    &:hover {
      background: burlywood;
    }
  }
  .file-manager-drop-title {
    cursor: default;
  }
  // .file-manager-drop-list {
    // background: rgba(63, 3, 3, 0.158);
  // }
}
</style>
