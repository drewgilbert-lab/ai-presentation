<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { onMounted, watch } from 'vue'

// v2 key resets any stale localStorage value that left the outline open
const showNav = useLocalStorage('hg-outline-visible-v2', false)
const showControls = useLocalStorage('hg-show-slide-controls', false)

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
</script>

<template>
  <div class="hg-global-nav fixed top-3 right-3 z-30 flex flex-col items-end gap-2 pointer-events-none">
    <div class="flex gap-1 pointer-events-auto">
      <button
        type="button"
        class="hg-nav-toggle px-2 py-1 rounded text-[11px] font-bold bg-hg-navy text-white shadow-sm hover:bg-hg-royal transition"
        :title="showNav ? 'Hide slide outline' : 'Show slide outline'"
        @click="toggleNav"
      >
        {{ showNav ? 'Hide Outline' : 'Outline' }}
      </button>
      <button
        type="button"
        class="hg-nav-toggle px-2 py-1 rounded text-[11px] font-bold bg-white text-hg-navy border border-hg-gray shadow-sm hover:bg-hg-light transition"
        :title="showControls ? 'Hide controls' : 'Show controls'"
        @click="toggleControls"
      >
        {{ showControls ? 'Hide Controls' : 'Controls' }}
      </button>
    </div>

    <div
      v-show="showNav"
      class="hg-slide-nav-panel pointer-events-auto bg-white/95 border border-hg-gray rounded-md shadow-lg p-3 max-h-[70vh] overflow-y-auto text-[12px] text-hg-dark min-w-[220px] max-w-[280px]"
    >
      <Toc mode="onlySiblings" :min-depth="1" :max-depth="1" />
    </div>
  </div>
</template>
