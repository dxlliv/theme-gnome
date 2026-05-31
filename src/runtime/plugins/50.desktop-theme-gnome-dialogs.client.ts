import { defineNuxtPlugin } from 'nuxt/app'
import { useConfirm } from 'primevue/useconfirm'
import { DESKTOP_DIALOG_PROVIDER_KEY } from '@owdproject/kit-theme/runtime/dialogs/desktopDialogProvider'
import { createPrimeVueDesktopDialogs } from '@owdproject/kit-theme/runtime/dialogs/createPrimeVueDesktopDialogs'

export default defineNuxtPlugin({
  name: 'desktop-theme-gnome-dialogs',
  enforce: 'post',
  setup(nuxtApp) {
    const confirm = useConfirm()
    nuxtApp.vueApp.provide(
      DESKTOP_DIALOG_PROVIDER_KEY,
      createPrimeVueDesktopDialogs(confirm),
    )
  },
})
