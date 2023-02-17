<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <div>
    <div>
      <slot name="title">
        {{ props.item.meta.title }}
      </slot>
    </div>
    <slot />
  </div>
</template>
