<script setup>
import { useNotificationsMenu } from '../../../composables/useNotificationsMenu'
import { useTemplateRef, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useDesktop } from '@owdproject/core/runtime/composables/useDesktop'

const notificationsMenu = useNotificationsMenu()
const notificationsMenuElement = useTemplateRef('notificationsMenuElement')
const desktop = useDesktop()

const currentDate = ref(new Date())

onClickOutside(
  notificationsMenuElement,
  () => (notificationsMenu.enabled.value = false),
)
</script>

<template>
  <div ref="notificationsMenuElement">
    <SystemBarButton
      @click="
        notificationsMenu.enabled.value = !notificationsMenu.enabled.value
      "
    >
      <DesktopCoreTime />
    </SystemBarButton>

    <SystemBarMenu
      v-if="notificationsMenu.enabled.value"
      class="desktop-system-bar__notifications-menu"
    >
      <!-- Column 1: Calendar -->
      <div class="calendar-column">
        <DatePicker v-model="currentDate" inline />
      </div>

      <!-- Column 2: Notifications -->
      <div class="notifications-column">
        <div class="notifications-header">
          <span class="title">{{ $t('systemBar.notifications.title') }}</span>
          <button
            v-if="desktop.notifications.list.value.length > 0"
            class="clear-btn"
            @click="desktop.notifications.clear"
          >
            {{ $t('systemBar.notifications.clear') }}
          </button>
        </div>

        <div class="notifications-list">
          <div
            v-for="notification in desktop.notifications.list.value"
            :key="notification.id"
            class="notification-item"
          >
            <div class="notification-meta">
              <span class="notification-title">{{ notification.title }}</span>
              <button class="remove-item-btn" @click="desktop.notifications.remove(notification.id)">×</button>
            </div>
            <p class="notification-body">{{ notification.body }}</p>
          </div>

          <div v-if="desktop.notifications.list.value.length === 0" class="empty-state">
            {{ $t('systemBar.notifications.empty') }}
          </div>
        </div>
      </div>
    </SystemBarMenu>
  </div>
</template>

<style lang="scss" scoped>
.desktop-system-bar__notifications-menu {
  left: 50%;
  transform: translateX(-50%);
  height: 400px;
  max-height: 80dvh;
  width: 600px;
  display: flex;
  flex-direction: row;
  padding: 16px !important;
  gap: 16px;

  .calendar-column {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    padding-right: 16px;

    :deep(.p-datepicker) {
      background: transparent;
      border: none;
      width: 100%;
      padding: 0;

      .p-datepicker-header {
        background: transparent;
        padding: 4px 0 12px 0;
        border-bottom: none;
      }
      .p-datepicker-calendar-container {
        padding: 0;
      }
      table {
        font-size: 0.85rem;
        td {
          padding: 2px;
        }
      }
    }
  }

  .notifications-column {
    width: 55%;
    display: flex;
    flex-direction: column;
    height: 100%;

    .notifications-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);

      .title {
        font-weight: bold;
        font-size: 0.95rem;
      }

      .clear-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        border-radius: 4px;
        padding: 4px 10px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
          background: rgba(255, 255, 255, 0.18);
        }
      }
    }

    .notifications-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-right: 4px;

      .notification-item {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 10px 12px;
        border: 1px solid rgba(255, 255, 255, 0.04);
        position: relative;

        .notification-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;

          .notification-title {
            font-weight: 600;
            font-size: 0.85rem;
          }

          .remove-item-btn {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            font-size: 1.1rem;
            line-height: 1;
            padding: 0 4px;
            cursor: pointer;
            border-radius: 4px;

            &:hover {
              color: white;
              background: rgba(255, 255, 255, 0.1);
            }
          }
        }

        .notification-body {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }
      }

      .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.85rem;
      }
    }
  }
}
</style>
