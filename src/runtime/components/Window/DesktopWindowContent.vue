<template>
  <DesktopCoreWindowContent>
    <div class="desktop-window-body">
      <slot />
    </div>
  </DesktopCoreWindowContent>
</template>

<style scoped lang="scss">
:deep(.owd-window__content) {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.desktop-window-body {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
}
</style>
