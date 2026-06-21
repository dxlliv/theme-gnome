<script setup lang="ts">
defineProps<{
  title?: string
  disabled?: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="owd-window-nav__button"
    :title="title"
    :aria-label="title"
    :disabled="disabled"
    @mousedown.stop
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
/* Sizing only — colors/hover in window-chrome.scss */
.owd-window-nav__button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 23px;
  height: 23px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: default;
    pointer-events: none;
  }

  :deep(.iconify),
  :deep(svg) {
    pointer-events: none;
  }
}
</style>
