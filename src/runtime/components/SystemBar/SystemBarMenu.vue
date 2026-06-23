<template>
  <Card class="owd-system-bar__menu p-card--border">
    <template #content>
      <slot />
    </template>
  </Card>
</template>

<style scoped lang="scss">
.owd-system-bar__menu {
  position: absolute;
  top: calc(var(--p-system-bar-height) + var(--p-system-bar-menu-spacing));
  padding: 8px;
}
</style>
