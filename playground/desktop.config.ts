import { defineDesktopConfig } from '@owdproject/core'

export default defineDesktopConfig({
  theme: '@owdproject/theme-gnome',
  modules: ['@owdproject/module-fs', '@owdproject/module-persistence'],
  apps: [
    '@owdproject/app-classic-audioplayer',
    '@owdproject/app-classic-videoplayer',
    '@owdproject/app-gridsky',
    '@owdproject/app-wasmboy',
    '@owdproject/app-terminal',
    '@owdproject/app-youtube',
    '@owdproject/app-soundcloud',
    '@owdproject/app-todo',
  ],
  systemBar: { enabled: true, startButton: true },
  terminal: {
    welcomeMessage: 'Welcome to GNOME',
    prompt: '$',
  },
  fs: {
    mounts: {
      '/mnt/test': '/test-small.zip',
    },
  },
})
