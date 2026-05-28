<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useSlideContext } from '@slidev/client'

const MIN_SCALE = 0.55
const SCALE_EPSILON = 0.001

const containerRef = ref<HTMLElement>()
const innerRef = ref<HTMLElement>()
const scale = ref(1)

let isMeasuring = false
let rafId = 0

function recalculateScale() {
  if (isMeasuring)
    return

  const container = containerRef.value
  const inner = innerRef.value
  if (!container || !inner)
    return

  isMeasuring = true
  const previousScale = scale.value

  scale.value = 1
  void inner.offsetHeight

  const availableHeight = container.clientHeight
  const contentHeight = inner.scrollHeight

  const nextScale =
    contentHeight > availableHeight && availableHeight > 0
      ? Math.max(MIN_SCALE, availableHeight / contentHeight)
      : 1

  if (Math.abs(nextScale - previousScale) > SCALE_EPSILON)
    scale.value = nextScale

  isMeasuring = false
}

function scheduleRecalc() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(recalculateScale)
}

useResizeObserver(containerRef, scheduleRecalc)

onMounted(() => nextTick(scheduleRecalc))

const { $page } = useSlideContext()
watch($page, () => nextTick(scheduleRecalc))
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
