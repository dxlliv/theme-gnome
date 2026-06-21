<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  title?: string
  disabled?: boolean
  rounded?: boolean
}>()
</script>

<template>
  <DesktopWindowNavButton
    :title="title"
    :disabled="disabled"
    :rounded="rounded"
    v-bind="$attrs"
  >
    <slot />
  </DesktopWindowNavButton>
</template>
