<script setup lang="ts">
import { useBattery } from '@vueuse/core'
import { computed } from 'vue'

const { charging, chargingTime, dischargingTime, level } = useBattery()

const batteryPercentage = computed(() => Math.round(level.value * 100))

function getBatteryIconSimplifiedDynamic(level: number): string {
  const percentage = Math.round(level * 100)
  const tens = Math.floor(percentage / 10) * 10

  return `mdi:battery-charging-${tens}`
}
</script>

<template>
  <Button size="large" rounded>
    <Icon :name="getBatteryIconSimplifiedDynamic(level)" />
    {{ batteryPercentage }}%
  </Button>
</template>

<style scoped lang="scss"></style>
