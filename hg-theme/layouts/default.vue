<script setup lang="ts">
import logoBlue from '../public/HGInsights-Logo-blue.svg'
</script>
<template>
  <div class="slidev-layout default bg-white text-hg-dark h-full w-full flex flex-col px-12 pt-12 pb-6">
    <div class="default-layout-content flex-1 min-h-0 overflow-hidden">
      <slot />
    </div>

    <footer class="default-layout-footer relative flex-shrink-0 flex items-center justify-between h-14 mt-6 text-[9px] text-[#818282]">
      <img
        :src="logoBlue"
        class="w-[1.55in] max-h-10 object-contain object-left flex-shrink-0"
        alt="HG Insights"
      />

      <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap m-0">
        ©2026 HG Insights proprietary and confidential.
      </p>

      <div class="flex-shrink-0 leading-none"><SlideCurrentNo /></div>
    </footer>
  </div>
</template>
