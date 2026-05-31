---
layout: cover
---

# Marketo Email Performance
2026-05-28 snapshot, 31 emails, ~67K sends

---
layout: default
---

# Headline Read

<div class="grid grid-cols-4 gap-4 mt-8">
  <div class="hg-stat-box"><div class="hg-stat-num">91%</div><div class="hg-stat-label">Of send volume is one webinar program</div></div>
  <div class="hg-stat-box"><div class="hg-stat-num">&lt;5%</div><div class="hg-stat-label">Delivery rate on 5 of our larger sends</div></div>
  <div class="hg-stat-box"><div class="hg-stat-num">5.31%</div><div class="hg-stat-label">Click rate on Top Rated Email 7, best in set</div></div>
  <div class="hg-stat-box"><div class="hg-stat-num">74%</div><div class="hg-stat-label">Of emails carry "Low Open Rate" flag</div></div>
</div>

<div class="mt-6 border-l-4 border-hg-red bg-hg-light pl-6 py-4 rounded-r-md">
  <div class="font-bold text-hg-navy text-[16px] mb-1">The real story</div>
  <div class="text-[14px] text-hg-dark">Two programs (ABM Demo Video, Churned Customer) are failing at the delivery layer in Marketo, not at the creative layer. Audience scoping or suppression rules are silently killing the send. Fix the plumbing before anything else.</div>
</div>

---
layout: default
---

# Deliverability Alarm: 5 Sends Under 5%

<div class="mt-6">
  <div class="flex justify-between text-[12px] font-bold text-hg-navy mb-1">
    <span>ABM Demo - Manager (10,223 sent)</span><span class="text-hg-red">1.26%</span>
  </div>
  <div class="h-4 bg-hg-gray rounded-full overflow-hidden mb-3">
    <div class="h-full bg-hg-red rounded-full" style="width: 1.26%"></div>
  </div>
  <div class="flex justify-between text-[12px] font-bold text-hg-navy mb-1">
    <span>ABM Demo - Director+ (8,710 sent)</span><span class="text-hg-red">0.55%</span>
  </div>
  <div class="h-4 bg-hg-gray rounded-full overflow-hidden mb-3">
    <div class="h-full bg-hg-red rounded-full" style="width: 0.55%"></div>
  </div>
  <div class="flex justify-between text-[12px] font-bold text-hg-navy mb-1">
    <span>Churned Demand Gen (2,640 sent)</span><span class="text-hg-red">0.87%</span>
  </div>
  <div class="h-4 bg-hg-gray rounded-full overflow-hidden mb-3">
    <div class="h-full bg-hg-red rounded-full" style="width: 0.87%"></div>
  </div>
  <div class="flex justify-between text-[12px] font-bold text-hg-navy mb-1">
    <span>Churned Sales (1,838 sent)</span><span class="text-hg-red">0.44%</span>
  </div>
  <div class="h-4 bg-hg-gray rounded-full overflow-hidden mb-3">
    <div class="h-full bg-hg-red rounded-full" style="width: 0.44%"></div>
  </div>
  <div class="flex justify-between text-[12px] font-bold text-hg-navy mb-1">
    <span>Churned RevOps (813 sent)</span><span class="text-hg-red">0.62%</span>
  </div>
  <div class="h-4 bg-hg-gray rounded-full overflow-hidden mb-3">
    <div class="h-full bg-hg-red rounded-full" style="width: 0.62%"></div>
  </div>
</div>

<div class="mt-4 border-l-4 border-hg-royal bg-hg-light pl-6 py-3 rounded-r-md">
  <div class="text-[14px] text-hg-dark">This is not a benchmark conversation. Suppression rules, smart-list scoping, or audience hygiene are killing the send before it leaves the building.</div>
</div>

---
layout: default
---

# Churned Customer Campaign: Failing at Every Persona

<div class="grid grid-cols-4 gap-4 mt-8">
  <div class="hg-card">
    <div class="hg-card-header">Demand Gen</div>
    <div class="hg-card-body">
      <div class="text-[24px] font-bold text-hg-red">23 / 2,640</div>
      <div class="text-[12px] mt-2">Delivered of sent. 4 opens, 0 clicks.</div>
    </div>
  </div>
  <div class="hg-card">
    <div class="hg-card-header">Sales</div>
    <div class="hg-card-body">
      <div class="text-[24px] font-bold text-hg-red">8 / 1,838</div>
      <div class="text-[12px] mt-2">Delivered of sent. 4 clicks on 8 emails is a phantom "50% CTR".</div>
    </div>
  </div>
  <div class="hg-card">
    <div class="hg-card-header">RevOps</div>
    <div class="hg-card-body">
      <div class="text-[24px] font-bold text-hg-red">5 / 813</div>
      <div class="text-[12px] mt-2">Delivered of sent. Zero engagement.</div>
    </div>
  </div>
  <div class="hg-card">
    <div class="hg-card-header">Data Analyst</div>
    <div class="hg-card-body">
      <div class="text-[24px] font-bold text-hg-red">1 / 290</div>
      <div class="text-[12px] mt-2">Delivered of sent. Statistically nothing.</div>
    </div>
  </div>
</div>

<div class="mt-6 border-l-4 border-hg-red bg-hg-light pl-6 py-4 rounded-r-md">
  <div class="font-bold text-hg-navy text-[16px] mb-1">Same root cause across all four personas</div>
  <div class="text-[14px] text-hg-dark">Persona segmentation is fine in theory. Execution is failing at the delivery layer. The whole program needs to pause until the audience filter is rebuilt.</div>
</div>

---
layout: default
---

# What's Actually Working

<div class="flex items-center gap-12 mt-8">
  <div class="hg-stat-box flex-1 py-10">
    <div class="hg-stat-num text-[48px]">5.31%</div>
    <div class="hg-stat-label">Click rate, Top Rated Campaign Email 7</div>
  </div>
  <div class="flex-1 text-[14px] space-y-3">
    <div><span class="font-bold text-hg-navy">Delivered:</span> 4,366 of 4,379 (99.7%)</div>
    <div><span class="font-bold text-hg-navy">Opens:</span> 302 (6.92%)</div>
    <div><span class="font-bold text-hg-navy">Clicks:</span> 232</div>
    <div><span class="font-bold text-hg-navy">Click-to-open:</span> 76.8%</div>
    <div class="text-hg-royal font-bold mt-2">Strongest performer in the dataset on meaningful volume.</div>
  </div>
</div>

<div class="mt-8 border-l-4 border-hg-royal bg-hg-light pl-6 py-4 rounded-r-md">
  <div class="font-bold text-hg-navy text-[16px] mb-1">Why it works</div>
  <div class="text-[14px] text-hg-dark">A 76.8% click-to-open ratio means the offer and CTA are doing the heavy lifting once the email is opened. Subject line and creative are both earning their place. This is the pattern to replicate in the next two nurture sends and the HG Insider follow-up.</div>
</div>

---
layout: default
---

# The HG Insider Webinar Problem

<div class="grid grid-cols-2 gap-6 mt-8">
  <div class="hg-card">
    <div class="hg-card-header">Email 4 (initial)</div>
    <div class="hg-card-body">
      <div class="text-[14px]">Sent: 20,052</div>
      <div class="text-[14px]">Delivered: 19,981 (99.7%)</div>
      <div class="text-[14px]">Open rate: <span class="font-bold text-hg-navy">9.84%</span></div>
      <div class="text-[14px]">Click rate: <span class="font-bold text-hg-navy">0.74%</span></div>
    </div>
  </div>
  <div class="hg-card">
    <div class="hg-card-header">Email 3 ReSend</div>
    <div class="hg-card-body">
      <div class="text-[14px]">Sent: 17,749</div>
      <div class="text-[14px]">Delivered: 17,655 (99.5%)</div>
      <div class="text-[14px]">Open rate: <span class="font-bold text-hg-red">3.61%</span></div>
      <div class="text-[14px]">Click rate: <span class="font-bold text-hg-navy">1.14%</span></div>
    </div>
  </div>
</div>

<div class="mt-6 border-l-4 border-hg-royal bg-hg-light pl-6 py-4 rounded-r-md">
  <div class="font-bold text-hg-navy text-[16px] mb-1">91% of total send volume, weakest engagement at scale</div>
  <div class="text-[14px] text-hg-dark">Open rate dropped 63% from initial to resend. That is classic subject-line and cadence fatigue, not a list-quality problem. Either cut the resend or rebuild it as fresh content rather than a duplicate.</div>
</div>

---
layout: default
---

# The "Low Open Rate" Flag Is Crying Wolf

<div class="flex items-end gap-6 h-48 mt-8">
  <div class="flex flex-col items-center flex-1 h-full justify-end">
    <div class="w-full bg-hg-red rounded-t-md" style="height: 74%"></div>
    <div class="text-[13px] mt-2 font-bold text-hg-navy">Low Open Rate</div>
    <div class="text-[12px] text-hg-dark">23 of 31 emails</div>
  </div>
  <div class="flex flex-col items-center flex-1 h-full justify-end">
    <div class="w-full bg-hg-medium rounded-t-md" style="height: 19%"></div>
    <div class="text-[13px] mt-2 font-bold text-hg-navy">No flag</div>
    <div class="text-[12px] text-hg-dark">6 of 31 emails</div>
  </div>
  <div class="flex flex-col items-center flex-1 h-full justify-end">
    <div class="w-full bg-hg-purple rounded-t-md" style="height: 6%"></div>
    <div class="text-[13px] mt-2 font-bold text-hg-navy">High Bounce</div>
    <div class="text-[12px] text-hg-dark">2 of 31 emails</div>
  </div>
</div>

<div class="mt-8 border-l-4 border-hg-royal bg-hg-light pl-6 py-4 rounded-r-md">
  <div class="font-bold text-hg-navy text-[16px] mb-1">Flag has stopped meaning anything</div>
  <div class="text-[14px] text-hg-dark">When 74% of sends trigger the same alarm, the alarm is the problem. Recalibrate the threshold to current B2B SaaS norms (sub-15% open rate) so the flag goes back to surfacing real outliers.</div>
</div>

---
layout: default
---

# Recommendations

<div class="flex flex-col gap-3 mt-6">
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-hg-red text-white flex items-center justify-center font-bold text-[14px]">1</div>
    <div><div class="font-bold text-hg-navy">Pause the ABM Optimization Demo Video sends (Manager + Director+).</div><div class="text-[13px]">Under 1.3% delivery. Fix the audience filter in Marketo before resending another byte.</div></div>
  </div>
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-hg-red text-white flex items-center justify-center font-bold text-[14px]">2</div>
    <div><div class="font-bold text-hg-navy">Pause the Churned Customer Campaign across all four personas.</div><div class="text-[13px]">Same root cause. Audit the program-level audience filter, then relaunch with revalidated persona splits.</div></div>
  </div>
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-hg-royal text-white flex items-center justify-center font-bold text-[14px]">3</div>
    <div><div class="font-bold text-hg-navy">Investigate the 300% click rate on the WC INT Modern Data Infrastructure autoresponder.</div><div class="text-[13px]">3 clicks on 1 delivered email. Tracking artifact, but it is polluting reporting.</div></div>
  </div>
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-hg-medium text-white flex items-center justify-center font-bold text-[14px]">4</div>
    <div><div class="font-bold text-hg-navy">Replicate Top Rated Campaign Email 7 in the next two nurture sends.</div><div class="text-[13px]">5.31% CTR on 4.4K delivered. Reuse the offer, subject line, and CTA pattern.</div></div>
  </div>
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-hg-medium text-white flex items-center justify-center font-bold text-[14px]">5</div>
    <div><div class="font-bold text-hg-navy">Recalibrate the "Low Open Rate" flag threshold to sub-15%.</div><div class="text-[13px]">Current threshold fires on the majority of sends. Move it so the flag surfaces real outliers again.</div></div>
  </div>
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-hg-navy text-white flex items-center justify-center font-bold text-[14px]">6</div>
    <div><div class="font-bold text-hg-navy">Rework the HG Insider Webinar resend.</div><div class="text-[13px]">Open rate dropped from 9.84% to 3.61%. Cut the resend or rebuild it with fresh content instead of a duplicate.</div></div>
  </div>
</div>
