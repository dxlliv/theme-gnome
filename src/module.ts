import {
  createResolver,
  addComponentsDir,
  addPlugin,
  addImportsDir,
  installModule,
} from '@nuxt/kit'
import { defineDesktopTheme } from '@owdproject/core'
import { registerThemeTailwindPath } from '@owdproject/kit-primevue/kit/registerTailwindPath'
import {
  GNOME_EXPLORER_QUICK_ACCESS_SEED,
  GNOME_EXPLORER_SPECIAL_FOLDERS,
} from './runtime/apps/explorer/explorerNav.defaults'

export default defineDesktopTheme({
  meta: {
    name: 'desktop-theme-gnome',
  },
  defaults: {
    name: 'gnome',
    systemBar: {
      enabled: true,
      position: 'top',
      startButton: false,
    },
    workspaces: {
      enabled: true,
    },
    explorer: {
      quickAccess: GNOME_EXPLORER_QUICK_ACCESS_SEED,
      quickAccessExtra: [],
      quickAccessOverride: [],
      specialFolders: GNOME_EXPLORER_SPECIAL_FOLDERS,
      specialFoldersExtra: [],
      specialFoldersOverride: [],
      mountLabels: {
        '/home': 'Home',
      },
    },
  },
  async setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    await installModule('@owdproject/kit-primevue')
    registerThemeTailwindPath(nuxt, import.meta.url)

    addComponentsDir({
      path: resolve('./runtime/components'),
    })

    nuxt.hook('i18n:registerModule', (register) => {
      register({
        langDir: resolve('./i18n'),
        locales: [
          {
            code: 'en',
            file: 'locales/en.ts',
          },
        ],
      })
    })

    nuxt.options.css.push('vue3-carousel/dist/carousel.css')

    addImportsDir(resolve('./runtime/composables'))
    addImportsDir(resolve('./runtime/consts'))
    addImportsDir(resolve('./runtime/stores'))
    addImportsDir(resolve('./runtime/utils'))

    addPlugin({
      src: resolve('./runtime/plugins/50.desktop-theme-gnome-dialogs.client.ts'),
      mode: 'client',
    })

    if (nuxt.options.modules.includes('@owdproject/module-fs')) {
      addPlugin({
        src: resolve('./runtime/apps/explorer/plugin.ts'),
        mode: 'client',
      })

      addComponentsDir({
        path: resolve('./runtime/apps/explorer/components'),
      })
    }
  },
})
