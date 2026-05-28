<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const containerRef = ref<HTMLElement>()
const innerRef = ref<HTMLElement>()
const scale = ref(1)

function recalculateScale() {
  const container = containerRef.value
  const inner = innerRef.value
  if (!container || !inner)
    return

  scale.value = 1
  void inner.offsetHeight

  const availableHeight = container.clientHeight
  const contentHeight = inner.scrollHeight

  if (contentHeight > availableHeight && availableHeight > 0)
    scale.value = Math.max(0.55, availableHeight / contentHeight)
}

useResizeObserver(containerRef, recalculateScale)
useResizeObserver(innerRef, recalculateScale)

onMounted(() => nextTick(recalculateScale))
watch(scale, () => nextTick(recalculateScale))
</script>

<template>
  <div ref="containerRef" class="hg-fit-content h-full w-full overflow-hidden">
    <div
      ref="innerRef"
      class="hg-fit-content-inner"
      :style="scale < 1 ? {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${100 / scale}%`,
      } : undefined"
    >
      <slot />
    </div>
  </div>
</template>
