<script setup lang="ts">
import { inject } from 'vue'
import type { IWindowController } from '@owdproject/core'
import { useToggleWindowMaximize } from '@owdproject/core/runtime/composables/useToggleWindowMaximize'
import ButtonWindowNavMinimize from '../Button/ButtonWindowNavMinimize.vue'
import ButtonWindowNavMaximize from '../Button/ButtonWindowNavMaximize.vue'
import ButtonWindowNavClose from '../Button/ButtonWindowNavClose.vue'

const windowController = inject<IWindowController>('windowController')
const toggleWindowMaximize = useToggleWindowMaximize()

function onWindowMinimize() {
  if (!windowController?.instanced) return
  windowController.actions.minimize()
}

function onWindowMaximize() {
  if (!windowController) return
  toggleWindowMaximize(windowController)
}

function onWindowNavDestroy() {
  if (!windowController?.instanced) return
  windowController.actions.destroy()
}
</script>

<template>
  <DesktopCoreWindowNav @dblclick="onWindowMaximize">
    <div
      v-if="$slots.prepend"
      class="owd-window-nav__btn-group owd-window-nav__btn-group--prepend"
    >
      <slot name="prepend" />
    </div>

    <div v-if="windowController?.windowTitle" class="owd-window-nav__title">
      <div
        class="owd-window-nav__title-inner text-ellipsis"
        v-text="windowController.windowTitle"
      />
    </div>

    <div class="owd-window-nav__btn-group owd-window-nav__btn-group--append">
      <div
        v-if="$slots.append"
        class="owd-window-nav__btn-group owd-window-nav__btn-group--append-inner"
      >
        <slot name="append" />
      </div>

      <ButtonWindowNavMinimize
        v-if="!windowController?.instanced || windowController?.isMinimizable"
        @mousedown.stop
        @click.stop="onWindowMinimize"
      />
      <ButtonWindowNavMaximize
        v-if="windowController?.isMaximizable"
        @mousedown.stop
        @click.stop="onWindowMaximize"
      />
      <ButtonWindowNavClose
        v-if="!windowController?.instanced || windowController?.isDestroyable"
        @mousedown.stop
        @click.stop="onWindowNavDestroy"
      />
    </div>
  </DesktopCoreWindowNav>
</template>

<style scoped lang="scss">
:deep(.owd-window-nav) {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 35px;
  min-height: 35px;
  line-height: 35px;
  font-weight: bold;
  background: #353535;
  box-shadow:
    inset 0 1px 0 0 #383838,
    0 1px 0 0 #202020;
  border-radius: var(--p-window-border-radius) var(--p-window-border-radius) 0 0;
  text-align: center;

  &.owd-window-nav--focused {
    background: linear-gradient(to bottom, #2b2b2b, #262626);
    box-shadow:
      inset 0 1px 0 0 #383838,
      0 1px 0 0 #070707;
  }
}

.owd-window-nav__btn-group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
  padding: 0 7px;
}

.owd-window-nav__btn-group--append-inner {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  border: 0;
}

.owd-window-nav__title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  min-width: 0;
  padding: 0 8px;
  gap: 4px;
  text-align: center;
}

.owd-window-nav__title-inner {
  margin: 0 auto;
  max-width: 100%;
}
</style>
