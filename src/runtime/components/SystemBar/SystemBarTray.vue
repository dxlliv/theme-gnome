<script setup>
import { useDesktop } from '@owdproject/core/runtime/composables/useDesktop'
import { useTemplateRef, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const { tray } = useDesktop()

const activeIconId = ref(null)
const trayElement = useTemplateRef('trayElement')

onClickOutside(trayElement, () => {
  activeIconId.value = null
})

function toggleMenu(itemId) {
  activeIconId.value = activeIconId.value === itemId ? null : itemId
}

function isComponent(val) {
  return typeof val === 'object' || typeof val === 'function'
}
</script>

<template>
  <div v-if="tray?.items?.value && tray.items.value.length > 0" ref="trayElement" class="owd-system-bar-tray">
    <div 
      v-for="item in tray.items.value" 
      :key="item.id" 
      class="owd-system-bar-tray__item"
    >
      <SystemBarButton
        @click="toggleMenu(item.id)"
        :class="{ 'owd-system-bar-button--active': activeIconId === item.id }"
        :title="item.label"
      >
        <component 
          v-if="isComponent(item.icon)"
          :is="item.icon"
        />
        <Icon 
          v-else
          :name="item.icon || 'mdi:cube-outline'" 
          :size="18" 
          style="vertical-align: -3px" 
        />
      </SystemBarButton>

      <!-- Popover custom menu -->
      <SystemBarMenu
        v-if="activeIconId === item.id && item.component"
        class="owd-system-bar-tray__menu"
      >
        <component :is="item.component" :is-tray-popover="true" />
      </SystemBarMenu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.owd-system-bar-tray {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  &__item {
    display: inline-block;
  }

  &__menu {
    min-height: auto;
    width: 400px;
    padding: 16px;
    border-radius: 32px !important;
  }
}
</style>
