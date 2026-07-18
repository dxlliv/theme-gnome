<template>
  <Button rounded pt:root="owd-system-bar__button">
    <slot />
  </Button>
</template>

<style scoped lang="scss">
.owd-system-bar__button {
  display: inline-block;
  cursor: pointer;
  height: 23px;
  padding: 0 8px;
  font-weight: bold;
  font-size: 16px;
  background: none;

  &-rounded {
    border-radius: 16px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>
