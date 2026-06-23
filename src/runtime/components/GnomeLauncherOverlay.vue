<script setup lang="ts">
import { ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { useGnomeLauncher } from '../composables/useGnomeLauncher'

const {
  open,
  searchQuery,
  filteredEntries,
  allEntries,
  close,
  launchEntry
} = useGnomeLauncher()

const searchRef = ref<HTMLInputElement | null>(null)

onKeyStroke('Escape', () => {
  if (open.value) close()
})

watch(open, (isOpen) => {
  if (!isOpen) return
  requestAnimationFrame(() => {
    searchRef.value?.focus()
  })
})
</script>

<template>
  <Teleport to="body">
    <Transition name="gnome-launcher" appear>
      <div
        v-if="open"
        class="gnome-launcher"
        role="dialog"
        aria-modal="true"
        aria-label="Applications Launcher"
      >
        <button
          type="button"
          class="gnome-launcher__backdrop"
          aria-label="Close Launcher"
          @click="close()"
        />

        <div class="gnome-launcher__panel">
          <header class="gnome-launcher__header" @click.stop>
            <div class="gnome-launcher__header-inner">
              <span class="gnome-launcher__search-icon" aria-hidden="true">
                <Icon name="lucide:search" :size="20" />
              </span>
              <input
                ref="searchRef"
                v-model="searchQuery"
                type="search"
                class="gnome-launcher__search-input"
                placeholder="Type to search..."
                autocomplete="off"
              />
            </div>
          </header>

          <div
            class="gnome-launcher__body"
            @click="close()"
          >
            <div
              v-if="filteredEntries.length === 0"
              class="gnome-launcher__empty"
              role="status"
            >
              <Icon
                :name="allEntries.length === 0 ? 'lucide:layout-grid' : 'lucide:search-slash'"
                :size="48"
                class="gnome-launcher__empty-icon"
                aria-hidden="true"
              />
              <span>{{
                allEntries.length === 0 ? 'No applications installed' : 'No results found'
              }}</span>
            </div>

            <ul
              v-else
              class="gnome-launcher__grid"
              role="listbox"
              @click.stop
            >
              <li
                v-for="(entry, index) in filteredEntries"
                :key="`${entry.application.id}:${entry.command}:${index}`"
                role="presentation"
              >
                <button
                  type="button"
                  class="gnome-launcher__app-tile"
                  role="option"
                  @click="launchEntry(entry)"
                >
                  <div class="gnome-launcher__app-tile-icon-wrap" aria-hidden="true">
                    <Icon
                      v-if="entry.icon"
                      :name="entry.icon"
                      :size="64"
                    />
                    <Icon v-else name="lucide:box" :size="64" />
                  </div>
                  <span class="gnome-launcher__app-tile-title">{{ entry.title }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
