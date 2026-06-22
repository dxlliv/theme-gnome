<template>
  <DesktopCoreWindowContent>
    <div class="desktop-window-body">
      <slot />
    </div>
  </DesktopCoreWindowContent>
</template>
<style scoped lang="scss">
.owd-window__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;

  &--padded {
    padding: var(--owd-card-body-padding, 12px);
  }

  &--centered {
    justify-content: center;
    align-items: center;

    .desktop-window-body {
      flex: 0 1 auto;
      height: auto;
      justify-content: center;
      align-items: center;
    }
  }
}

.desktop-window-body {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow-x: hidden;
}
</style>
