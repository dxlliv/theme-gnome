<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'
import type { IWindowController } from '@owdproject/core'
import { createExplorerWindowMenuItems } from '@owdproject/module-fs/runtime/composables/useExplorerWindowMenu'
import GnomeExplorerShell from '../explorer/GnomeExplorerShell.vue'

const props = defineProps<{
  window: IWindowController
}>()

const { t } = useI18n()
const confirm = useConfirm()

const explorerMenu = createExplorerWindowMenuItems(
  () => props.window,
  t,
  () =>
    confirm.require({
      group: 'about',
      header: 'About',
      acceptProps: {
        label: 'OK',
        class: 'p-button--primary',
      },
      rejectProps: {
        class: 'hidden',
      },
      accept: () => {},
    }),
)

props.window.setMenu(explorerMenu)
</script>

<template>
  <GnomeExplorerShell v-bind="$props" :overflow-menu="explorerMenu" />
</template>
