<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'

const showNav = ref(false)
const showControls = ref(false)

function syncBodyClasses() {
  document.body.classList.toggle('hg-show-slide-nav', showNav.value)
  document.body.classList.toggle('hg-show-slide-controls', showControls.value)
}

watch(showNav, syncBodyClasses, { immediate: true })
watch(showControls, syncBodyClasses, { immediate: true })

onMounted(syncBodyClasses)

function toggleNav() {
  showNav.value = !showNav.value
}

function toggleControls() {
  showControls.value = !showControls.value
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement))
    return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable
}

useEventListener('keydown', (e: KeyboardEvent) => {
  if (isTypingTarget(e.target))
    return

  if (e.key === 'Escape' && showNav.value) {
    showNav.value = false
    e.preventDefault()
    return
  }

  if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 'o') {
    toggleNav()
    e.preventDefault()
    return
  }

  if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 'c') {
    toggleControls()
    e.preventDefault()
  }
})
</script>

<template>
  <div
    v-show="showNav"
    class="hg-global-nav fixed top-3 right-3 z-30 pointer-events-auto"
  >
    <div
      class="hg-slide-nav-panel bg-white/95 border border-hg-gray rounded-md shadow-lg p-3 max-h-[70vh] overflow-y-auto text-[12px] text-hg-dark min-w-[220px] max-w-[280px]"
    >
      <Toc mode="onlySiblings" :min-depth="1" :max-depth="1" />
    </div>
  </div>
</template>
