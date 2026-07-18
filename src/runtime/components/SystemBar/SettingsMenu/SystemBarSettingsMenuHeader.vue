<script setup lang="ts">
import { useDesktopDefaultAppsStore } from '#imports'
import { useApplicationManager } from '#imports'

const defaultAppsStore = useDesktopDefaultAppsStore()
const applicationManager = useApplicationManager()

function handleAuthClick() {
  const defaultAuthApp = defaultAppsStore.getDefaultApp('auth')
  if (defaultAuthApp && applicationManager.isAppDefined(defaultAuthApp.applicationId)) {
    applicationManager.launchAppEntry(
      defaultAuthApp.applicationId,
      defaultAuthApp.entry
    )
  } else {
    console.warn('[Gnome Theme] No default auth app is registered.')
  }
}
</script>

<template>
  <div class="owd-system-bar__settings-menu__header">
    <div>
      <SystemBarSettingsMenuButtonBattery />
    </div>

    <div>
      <Button 
        size="large" 
        rounded 
        pt:root="p-button--icon"
        @click="handleAuthClick"
        title="Account Login / Verification"
      >
        <Icon name="mdi:account-circle-outline" :size="20" />
      </Button>
      <Button size="large" rounded pt:root="p-button--icon">
        <Icon name="mdi:power" :size="20" />
      </Button>
    </div>

    <!--

      <Button size="large" rounded>
        <div>
          <b>qwe</b>
        </div>
        qwe
      </Button>
    -->
  </div>
</template>

<style scoped lang="scss">
.owd-system-bar__settings-menu__header {
  display: flex;
  flex-direction: row;
  width: 100%;

  > div {
    &:nth-child(1) {
      text-align: left;
      flex: 1;
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: row;
      gap: 12px;
      flex: 0;
    }
  }
}
</style>
