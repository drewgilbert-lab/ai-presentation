<script setup lang="ts">
import logoBlue from '../public/HGInsights-Logo-blue.svg'
</script>
<template>
  <div class="slidev-layout default bg-white text-hg-dark h-full w-full p-12">
    <slot />
    
    <div class="absolute bottom-4 left-12 right-12 flex justify-between items-end text-[9px] text-[#818282]">
      <img :src="logoBlue" class="w-[1.55in] object-contain" alt="HG Insights" />
      
      <div class="absolute left-1/2 transform -translate-x-1/2 bottom-0">
        ©2026 HG Insights proprietary and confidential.
      </div>
      
      <div class="mb-0.5"><SlideCurrentNo /></div>
    </div>
  </div>
</template>
