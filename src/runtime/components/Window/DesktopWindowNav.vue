<script setup lang="ts">
import { computed, inject } from 'vue'
import type { IWindowController } from '@owdproject/core'
import { useToggleWindowMaximize } from '@owdproject/core/runtime/composables/useToggleWindowMaximize'

const windowController = inject<IWindowController>('windowController')
const toggleWindowMaximize = useToggleWindowMaximize()

const maximizeIcon = computed(() =>
  windowController?.isMaximized ? 'mdi:window-restore' : 'mdi:window-maximize',
)

function onWindowMinimize() {
  if (!windowController?.instanced) return
  windowController.actions.minimize()
}

function onWindowMaximize() {
  if (!windowController) return
  toggleWindowMaximize(windowController)
}

function onWindowClose() {
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

    <template v-if="$slots.title">
      <slot name="title" />
    </template>
    <template v-else-if="windowController?.windowTitle">
      <div class="owd-window-nav__title">
        <div
          class="owd-window-nav__title-inner truncate"
          v-text="windowController.windowTitle"
        />
      </div>
    </template>

    <div class="owd-window-nav__btn-group owd-window-nav__btn-group--append">
      <div
        v-if="$slots.append"
        class="owd-window-nav__btn-group owd-window-nav__btn-group--append-inner"
      >
        <slot name="append" />
      </div>

      <DesktopWindowNavButton
        v-if="!windowController?.instanced || windowController?.isMinimizable"
        title="Minimize"
        class="owd-window-nav__button--minimize"
        @mousedown.stop
        @click.stop="onWindowMinimize"
      >
        <Icon name="mdi:minus" :size="14" />
      </DesktopWindowNavButton>

      <DesktopWindowNavButton
        v-if="windowController?.isMaximizable"
        title="Maximize"
        class="owd-window-nav__button--maximize"
        @mousedown.stop
        @click.stop="onWindowMaximize"
      >
        <Icon :name="maximizeIcon" :size="12" />
      </DesktopWindowNavButton>

      <DesktopWindowNavButton
        v-if="!windowController?.instanced || windowController?.isDestroyable"
        title="Close"
        class="owd-window-nav__button--close"
        @mousedown.stop
        @click.stop="onWindowClose"
      >
        <Icon name="mdi:close" :size="14" />
      </DesktopWindowNavButton>
    </div>
  </DesktopCoreWindowNav>
</template>

<style scoped lang="scss">
.owd-window-nav__btn-group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
  padding: 0 7px;
}

.owd-window-nav__btn-group--prepend {
  padding-left: 4px;
}

.owd-window-nav__btn-group--append {
  margin-left: auto;
}

.owd-window-nav__btn-group--append-inner {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  border: 0;
  pointer-events: auto;
}

.owd-window-nav__title {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  padding: 0 96px;
  text-align: center;
}

.owd-window-nav__title-inner {
  margin: 0 auto;
  max-width: 100%;
}
</style>
