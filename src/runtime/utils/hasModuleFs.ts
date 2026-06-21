import type { Nuxt } from '@nuxt/schema'

/** True when `desktop.config.ts` lists `@owdproject/module-fs` (theme setup runs before installModule). */
export function hasModuleFs(nuxt: Nuxt): boolean {
  const desktop = nuxt.options.runtimeConfig.public.desktop as {
    modules?: string[]
  }
  const modules = desktop?.modules ?? []
  return modules.some((m) => String(m).includes('module-fs'))
}
