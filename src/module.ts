import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addPlugin,
  addImportsDir,
  installModule,
} from '@nuxt/kit'
import { defu } from 'defu'
import { registerTailwindPath } from '@owdproject/core/runtime/utils/utilApp'
import {
  GNOME_EXPLORER_QUICK_ACCESS_SEED,
  GNOME_EXPLORER_SPECIAL_FOLDERS,
} from './runtime/apps/explorer/explorerNav.defaults'

export default defineNuxtModule({
  meta: {
    name: 'owd-theme-gnome',
    configKey: 'desktop',
  },
  defaults: {
    name: 'gnome',
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
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    await installModule('@owdproject/kit-theme')

    const themeDefaults = (await import(resolve('./desktop.config.ts'))).default
    nuxt.options.runtimeConfig.public.desktop = defu(
      nuxt.options.runtimeConfig.public.desktop ?? {},
      defu(themeDefaults, options),
    )

    {
      // add components

      addComponentsDir({
        path: resolve('./runtime/components'),
      })
    }

    {
      // configure tailwind

      registerTailwindPath(
        nuxt,
        resolve('./runtime/components/**/*.{vue,mjs,ts}'),
      )
    }

    {
      // import i18n

      nuxt.hook('i18n:registerModule', (register) => {
        register({
          // langDir path needs to be resolved
          langDir: resolve('./i18n'),
          locales: [
            {
              code: 'en',
              file: 'locales/en.ts',
            },
          ],
        })
      })
    }

    {
      // add other files

      nuxt.options.css.push('vue3-carousel/dist/carousel.css')

      addImportsDir(resolve('./runtime/composables'))
      addImportsDir(resolve('./runtime/consts'))
      addImportsDir(resolve('./runtime/stores'))
      addImportsDir(resolve('./runtime/utils'))
    }

    {
      addPlugin({
        src: resolve('./runtime/plugins/50.desktop-theme-gnome-dialogs.client.ts'),
        mode: 'client',
      })
    }

    {
      if (nuxt.options.modules.includes('@owdproject/module-fs')) {
        await installModule('@owdproject/kit-explorer')

        addPlugin({
          src: resolve('./runtime/apps/explorer/plugin.ts'),
          mode: 'client',
        })

        addComponentsDir({
          path: resolve('./runtime/apps/explorer/components'),
        })

        registerTailwindPath(
          nuxt,
          resolve('./runtime/apps/explorer/components/**/*.{vue,mjs,ts}'),
        )
      }
    }
  },
})
