---
layout: cover
---

# AI Presentation Pipeline
A proof of concept: LLM authoring, code-enforced brand, zero manual PowerPoint

---
layout: default
---

# The Hidden Tax on GTM Speed

<div class="grid grid-cols-2 gap-8 mt-6">
<div>
<div class="text-[15px] text-hg-dark leading-relaxed">Research gets done. Data looks good. Competitive intel is solid.</div>
<div class="mt-4 text-[15px] text-hg-dark leading-relaxed">Then it sits, waiting for someone to open PowerPoint.</div>
<div class="mt-6 border-l-4 border-hg-red bg-hg-gray pl-6 py-4 rounded-r-md">
<div class="font-bold text-hg-red text-[15px] mb-1">The bottleneck is not the thinking.</div>
<div class="text-[14px] text-hg-dark">It is the presentation layer.</div>
</div>
<div class="mt-6 text-[14px] text-hg-dark">When deck production is slow, high-quality research sits. Campaigns stall. Sales conversations are under-equipped.</div>
</div>
<div class="flex flex-col gap-4">
<div class="flex items-center gap-4 p-4 bg-hg-gray rounded-lg">
<div class="text-hg-red text-[28px] font-bold">1</div>
<div><div class="font-bold text-hg-navy text-[13px]">Content exists</div><div class="text-[13px] text-hg-dark">Research, data, competitive intel</div></div>
</div>
<div class="flex items-center gap-4 p-4 bg-hg-gray rounded-lg opacity-60">
<div class="text-hg-red text-[28px] font-bold">⏱</div>
<div><div class="font-bold text-hg-navy text-[13px]">The gap</div><div class="text-[13px] text-hg-dark">Copy, reformat, rebrand, export, resend</div></div>
</div>
<div class="flex items-center gap-4 p-4 bg-hg-gray rounded-lg">
<div class="text-hg-navy text-[28px] font-bold">2</div>
<div><div class="font-bold text-hg-navy text-[13px]">Content lands</div><div class="text-[13px] text-hg-dark">In front of the right person</div></div>
</div>
<div class="mt-2 text-[13px] text-hg-dark italic">Speed is leverage. That gap costs more than it appears.</div>
</div>
</div>

---
layout: default
---

# The Traditional Loop

<div class="flex justify-between items-center mt-10 gap-3">
<div class="bg-hg-gray text-hg-navy p-4 rounded-lg flex-1 text-center shadow-md">
<div class="text-[13px] font-bold mb-1">Gather</div>
<div class="text-[12px] text-hg-dark">Research brief lands in inbox</div>
</div>
<div class="text-hg-red text-2xl font-bold">→</div>
<div class="bg-hg-gray text-hg-navy p-4 rounded-lg flex-1 text-center shadow-md">
<div class="text-[13px] font-bold mb-1">Format</div>
<div class="text-[12px] text-hg-dark">Copy into slides, fight the template</div>
</div>
<div class="text-hg-red text-2xl font-bold">→</div>
<div class="bg-hg-gray text-hg-navy p-4 rounded-lg flex-1 text-center shadow-md">
<div class="text-[13px] font-bold mb-1">Rebrand</div>
<div class="text-[12px] text-hg-dark">Fix logo, fix navy, fix font</div>
</div>
<div class="text-hg-red text-2xl font-bold">→</div>
<div class="bg-hg-gray text-hg-navy p-4 rounded-lg flex-1 text-center shadow-md">
<div class="text-[13px] font-bold mb-1">Export</div>
<div class="text-[12px] text-hg-dark">PDF, email link, link expires</div>
</div>
<div class="text-hg-red text-2xl font-bold">→</div>
<div class="bg-hg-red text-white p-4 rounded-lg flex-1 text-center shadow-md">
<div class="text-[13px] font-bold mb-1">Repeat</div>
<div class="text-[12px] opacity-90">When anything changes</div>
</div>
</div>
<div class="mt-8 border-l-4 border-hg-royal bg-hg-light pl-6 py-4 rounded-r-md">
<div class="font-bold text-hg-navy text-[15px] mb-1">Better templates do not solve this.</div>
<div class="text-[14px] text-hg-dark">Someone still has to manually move content into the format. That someone is usually not the person who created it.</div>
</div>

---
layout: default
---

# The Hypothesis: Brand as Code

<div class="grid grid-cols-2 gap-10 mt-6">
<div>
<div class="text-[14px] font-bold text-hg-navy mb-3 uppercase tracking-wide">The old assumption</div>
<div class="flex flex-col gap-3">
<div class="flex items-start gap-3">
<div class="flex-shrink-0 w-6 h-6 rounded-full bg-hg-red text-white flex items-center justify-center text-[12px] font-bold mt-0.5">✗</div>
<div class="text-[14px] text-hg-dark">Brand review is a human step at the end</div>
</div>
<div class="flex items-start gap-3">
<div class="flex-shrink-0 w-6 h-6 rounded-full bg-hg-red text-white flex items-center justify-center text-[12px] font-bold mt-0.5">✗</div>
<div class="text-[14px] text-hg-dark">Designers are the brand guardrail</div>
</div>
<div class="flex items-start gap-3">
<div class="flex-shrink-0 w-6 h-6 rounded-full bg-hg-red text-white flex items-center justify-center text-[12px] font-bold mt-0.5">✗</div>
<div class="text-[14px] text-hg-dark">AI output needs manual cleanup before sharing</div>
</div>
</div>
</div>
<div>
<div class="text-[14px] font-bold text-hg-navy mb-3 uppercase tracking-wide">The bet</div>
<div class="flex flex-col gap-3">
<div class="flex items-start gap-3">
<div class="flex-shrink-0 w-6 h-6 rounded-full bg-hg-navy text-white flex items-center justify-center text-[12px] font-bold mt-0.5">✓</div>
<div class="text-[14px] text-hg-dark">Brand enforcement lives in the repo, not in review cycles</div>
</div>
<div class="flex items-start gap-3">
<div class="flex-shrink-0 w-6 h-6 rounded-full bg-hg-navy text-white flex items-center justify-center text-[12px] font-bold mt-0.5">✓</div>
<div class="text-[14px] text-hg-dark">The model owns story and structure; code owns chrome</div>
</div>
<div class="flex items-start gap-3">
<div class="flex-shrink-0 w-6 h-6 rounded-full bg-hg-navy text-white flex items-center justify-center text-[12px] font-bold mt-0.5">✓</div>
<div class="text-[14px] text-hg-dark">Draft to live URL in minutes, not days of polish</div>
</div>
</div>
</div>
</div>
<div class="mt-8 bg-hg-navy text-white px-6 py-4 rounded-lg">
<div class="text-[15px] font-bold mb-1">Target outcome</div>
<div class="text-[14px] opacity-90">Claude writes valid Markdown. The pipeline guarantees every slide gets the HG navy cover, footer, CONFIDENTIAL tag, and color tokens. No designer in the loop for any of that.</div>
</div>

---
layout: default
---

# The Pipeline: Four Layers

<div class="flex flex-col gap-4 mt-6">
<div class="flex items-start gap-5">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-hg-navy text-white flex items-center justify-center font-bold text-[16px]">1</div>
<div class="flex-1 p-4 bg-hg-gray rounded-lg">
<div class="flex items-center gap-3 mb-1">
<HgIcon name="ai-copilot" size="22px" />
<div class="font-bold text-hg-navy text-[14px]">AI Authoring via Structured Prompt</div>
</div>
<div class="text-[13px] text-hg-dark">A 580-line system prompt defines the grammar the model must write within: allowed layouts, component names, table density limits, HTML composition rules. The model has creative latitude on content. Zero latitude on design.</div>
</div>
</div>
<div class="flex items-start gap-5">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-hg-royal text-white flex items-center justify-center font-bold text-[16px]">2</div>
<div class="flex-1 p-4 bg-hg-gray rounded-lg">
<div class="flex items-center gap-3 mb-1">
<HgIcon name="ai-infrastructure" size="22px" />
<div class="font-bold text-hg-navy text-[14px]">Brand Enforcement via Slidev Theme</div>
</div>
<div class="text-[13px] text-hg-dark">hg-theme/ is the brand in code. Cover slides get navy + logo + CONFIDENTIAL automatically. Default slides get the footer and slide number. The model cannot pick the wrong blue. The system prevents it.</div>
</div>
</div>
<div class="flex items-start gap-5">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-hg-medium text-white flex items-center justify-center font-bold text-[16px]">3</div>
<div class="flex-1 p-4 bg-hg-gray rounded-lg">
<div class="flex items-center gap-3 mb-1">
<HgIcon name="config-wizard" size="22px" />
<div class="font-bold text-hg-navy text-[14px]">Validation as Guardrail</div>
</div>
<div class="text-[13px] text-hg-dark">deck-validation.js runs on upload, Drive sync, and pre-build. Wide tables, off-brand colors, forbidden patterns: caught before they ship. The model does not have to remember every rule.</div>
</div>
</div>
<div class="flex items-start gap-5">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-hg-purple text-white flex items-center justify-center font-bold text-[16px]">4</div>
<div class="flex-1 p-4 bg-hg-gray rounded-lg">
<div class="flex items-center gap-3 mb-1">
<HgIcon name="gtm-efficiency" size="22px" />
<div class="font-bold text-hg-navy text-[14px]">Automation Glue: Drive to Vercel</div>
</div>
<div class="text-[13px] text-hg-dark">A GitHub Action polls Google Drive every 5 minutes. New deck file lands, action commits it, Vercel builds and deploys. Each deck gets its own URL. Zero-touch after the model writes valid Markdown.</div>
</div>
</div>
</div>

---
layout: default
---

# What the Theme Enforces

<div class="grid grid-cols-2 gap-8 mt-6">
<div>
<div class="text-[13px] font-bold text-hg-navy mb-3 uppercase tracking-wide">Manual process</div>
<div class="flex flex-col gap-3">
<div class="p-3 border border-hg-gray rounded-lg flex items-start gap-3">
<span class="text-hg-red font-bold text-[16px]">✗</span>
<div class="text-[13px] text-hg-dark">Someone opens the PPTX template and drags the logo to the right corner</div>
</div>
<div class="p-3 border border-hg-gray rounded-lg flex items-start gap-3">
<span class="text-hg-red font-bold text-[16px]">✗</span>
<div class="text-[13px] text-hg-dark">They apply navy from memory, or eyeball it from the last deck</div>
</div>
<div class="p-3 border border-hg-gray rounded-lg flex items-start gap-3">
<span class="text-hg-red font-bold text-[16px]">✗</span>
<div class="text-[13px] text-hg-dark">Brand review happens after the fact, often skipped under deadline</div>
</div>
<div class="p-3 border border-hg-gray rounded-lg flex items-start gap-3">
<span class="text-hg-red font-bold text-[16px]">✗</span>
<div class="text-[13px] text-hg-dark">CONFIDENTIAL tag added manually, sometimes forgotten</div>
</div>
</div>
</div>
<div>
<div class="text-[13px] font-bold text-hg-navy mb-3 uppercase tracking-wide">Code-enforced brand</div>
<div class="flex flex-col gap-3">
<div class="p-3 bg-hg-light rounded-lg flex items-start gap-3">
<span class="text-hg-navy font-bold text-[16px]">✓</span>
<div class="text-[13px] text-hg-dark">layout: cover gives every first slide navy + logo + CONFIDENTIAL, always</div>
</div>
<div class="p-3 bg-hg-light rounded-lg flex items-start gap-3">
<span class="text-hg-navy font-bold text-[16px]">✓</span>
<div class="text-[13px] text-hg-dark">Color tokens (hg-navy, hg-royal, hg-medium) are the only available palette</div>
</div>
<div class="p-3 bg-hg-light rounded-lg flex items-start gap-3">
<span class="text-hg-navy font-bold text-[16px]">✓</span>
<div class="text-[13px] text-hg-dark">Off-brand hex values fail validation before the deck ever deploys</div>
</div>
<div class="p-3 bg-hg-light rounded-lg flex items-start gap-3">
<span class="text-hg-navy font-bold text-[16px]">✓</span>
<div class="text-[13px] text-hg-dark">Footer with copyright and slide numbers on every content slide, automatically</div>
</div>
</div>
</div>
</div>
<div class="mt-6 border-l-4 border-hg-purple bg-hg-gray pl-5 py-3 rounded-r-md">
<div class="text-[13px] text-hg-dark"><span class="font-bold text-hg-navy">Brand is not a review step. </span>It is a property of the build system.</div>
</div>

---
layout: default
---

# What Broke in Production

<div class="grid grid-cols-2 gap-6 mt-6">
<div class="flex flex-col gap-4">
<div class="p-4 bg-hg-gray rounded-lg border-l-4 border-hg-red">
<div class="font-bold text-hg-navy text-[13px] mb-1">Linux case sensitivity</div>
<div class="text-[13px] text-hg-dark">public/ and Public/ are different directories on a case-sensitive filesystem. Works locally on macOS. Fails silently in CI. The error only surfaces in deployment.</div>
</div>
<div class="p-4 bg-hg-gray rounded-lg border-l-4 border-hg-red">
<div class="font-bold text-hg-navy text-[13px] mb-1">Blank lines inside HTML blocks</div>
<div class="text-[13px] text-hg-dark">Slidev ends HTML parsing at a blank line. Sibling divs after a blank line render as raw code. Invisible cause, obvious symptom. Now an explicit rule in the prompt with examples.</div>
</div>
</div>
<div class="flex flex-col gap-4">
<div class="p-4 bg-hg-gray rounded-lg border-l-4 border-hg-red">
<div class="font-bold text-hg-navy text-[13px] mb-1">Table overflow on dense slides</div>
<div class="text-[13px] text-hg-dark">A CRM export pasted into a six-column Markdown table overflows the canvas. Columns bleed. Text becomes unreadable. Required both a prompt rule (max 4 columns) and a CSS constraint.</div>
</div>
<div class="p-4 bg-hg-gray rounded-lg border-l-4 border-hg-red">
<div class="font-bold text-hg-navy text-[13px] mb-1">Drive sync edge cases</div>
<div class="text-[13px] text-hg-dark">Service account permissions, sync frequency, and token scoping interact in undocumented ways. Only surfaces in production. Required iteration on the integration, not just the code.</div>
</div>
</div>
</div>
<div class="mt-6 border-l-4 border-hg-royal bg-hg-light pl-5 py-3 rounded-r-md">
<div class="text-[13px] text-hg-dark"><span class="font-bold text-hg-navy">The system is done </span>when output survives the full path from generation to deployment under real conditions. Not when it looks right in a demo.</div>
</div>

---
layout: default
---

# Architecture: Prompt + Validator + Build = One System

```mermaid
flowchart LR
  A["Claude\nwrites Markdown"] --> B["deck-validation.js\nchecks on upload"]
  B --> C["GitHub Action\ncommits on sync"]
  C --> D["Vercel\nbuilds + deploys"]
  D --> E["Live URL\n/{slug}/"]
  B -- "Fail: wide table,\noff-brand color,\nbad HTML" --> F["Rejected\nbefore ship"]
  classDef navy fill:#003366,color:#fff
  classDef royal fill:#2D59A7,color:#fff
  classDef medium fill:#3B86D4,color:#fff
  classDef red fill:#CC1E4C,color:#fff
  classDef gray fill:#EAEBED,color:#424242
  class A navy
  class B royal
  class C,D medium
  class E navy
  class F red
```

<div class="grid grid-cols-3 gap-4 mt-6">
<div class="p-3 bg-hg-gray rounded-lg text-center">
<div class="font-bold text-hg-navy text-[13px] mb-1">Prompt is a grammar</div>
<div class="text-[12px] text-hg-dark">Constrains output format, not creativity. The model writes within a narrow schema.</div>
</div>
<div class="p-3 bg-hg-gray rounded-lg text-center">
<div class="font-bold text-hg-navy text-[13px] mb-1">Validator catches drift</div>
<div class="text-[12px] text-hg-dark">LLMs drift over time. Validation at the boundary is more reliable than prompting perfection.</div>
</div>
<div class="p-3 bg-hg-gray rounded-lg text-center">
<div class="font-bold text-hg-navy text-[13px] mb-1">Build is enforcement</div>
<div class="text-[12px] text-hg-dark">The last gate before deployment. Prompt + validator + build work as one system, not three.</div>
</div>
</div>

---
layout: default
---

# If This Scales

<div class="flex items-start gap-6 mt-8">
<div class="flex flex-col items-center gap-3 flex-1 text-center">
<HgIcon name="gtm-modernization" size="52px" />
<div class="font-bold text-hg-navy text-[14px]">Cowork Integration</div>
<div class="text-[13px] text-hg-dark">The web-deck skill in Cowork already connects to this pipeline. Marketers and sales reps generate decks today, no CLI required. Scaling this path means UI for non-technical publishers.</div>
</div>
<div class="w-px bg-hg-gray self-stretch mx-2"></div>
<div class="flex flex-col items-center gap-3 flex-1 text-center">
<HgIcon name="ai-infrastructure" size="52px" />
<div class="font-bold text-hg-navy text-[14px]">Reference Architecture</div>
<div class="text-[13px] text-hg-dark">The three-layer design (model, validator, deploy) applies to any structured output: reports, briefs, landing pages, email sequences. The question is whether to generalize the schema and validation layer into shared infrastructure.</div>
</div>
<div class="w-px bg-hg-gray self-stretch mx-2"></div>
<div class="flex flex-col items-center gap-3 flex-1 text-center">
<HgIcon name="invest-future" size="52px" />
<div class="font-bold text-hg-navy text-[14px]">Production Path</div>
<div class="text-[13px] text-hg-dark">Making this a real internal tool requires a publishing UI, tighter error surfaces, and more robust sync. A meaningful investment. The value case depends on how often teams need branded decks fast, and what that loop actually costs today.</div>
</div>
</div>
<div class="mt-8 border-l-4 border-hg-purple bg-hg-gray pl-5 py-3 rounded-r-md">
<div class="text-[13px] text-hg-dark"><span class="font-bold text-hg-navy">The immediate argument: </span>use this as a model for how we build AI-assisted content systems going forward, not a mandate to scale this specific project immediately.</div>
</div>

---
layout: default
---

# Honest Scope

<div class="grid grid-cols-3 gap-5 mt-6">
<div class="hg-card">
<div class="hg-card-header">What it is</div>
<div class="hg-card-body">
<div class="flex flex-col gap-3 mt-2">
<div class="flex items-start gap-2"><span class="text-hg-navy font-bold text-[14px]">+</span><div class="text-[13px]">Proof the pipeline works end-to-end</div></div>
<div class="flex items-start gap-2"><span class="text-hg-navy font-bold text-[14px]">+</span><div class="text-[13px]">Branded web narratives: readouts, briefs, summaries, comparisons</div></div>
<div class="flex items-start gap-2"><span class="text-hg-navy font-bold text-[14px]">+</span><div class="text-[13px]">Live today at 6 deck URLs via Vercel</div></div>
<div class="flex items-start gap-2"><span class="text-hg-navy font-bold text-[14px]">+</span><div class="text-[13px]">Connected to Cowork via web-deck skill</div></div>
</div>
</div>
</div>
<div class="hg-card">
<div class="hg-card-header">What it is not</div>
<div class="hg-card-body">
<div class="flex flex-col gap-3 mt-2">
<div class="flex items-start gap-2"><span class="text-hg-red font-bold text-[14px]">-</span><div class="text-[13px]">A replacement for PowerPoint everywhere</div></div>
<div class="flex items-start gap-2"><span class="text-hg-red font-bold text-[14px]">-</span><div class="text-[13px]">Production-ready without prompt discipline</div></div>
<div class="flex items-start gap-2"><span class="text-hg-red font-bold text-[14px]">-</span><div class="text-[13px]">Animated PPTX, embedded video, pixel-perfect design</div></div>
<div class="flex items-start gap-2"><span class="text-hg-red font-bold text-[14px]">-</span><div class="text-[13px]">A productized internal tool yet</div></div>
</div>
</div>
</div>
<div class="hg-card">
<div class="hg-card-header">What comes next</div>
<div class="hg-card-body">
<div class="flex flex-col gap-3 mt-2">
<div class="flex items-start gap-2"><span class="text-hg-royal font-bold text-[14px]">→</span><div class="text-[13px]">Non-technical publishing UI</div></div>
<div class="flex items-start gap-2"><span class="text-hg-royal font-bold text-[14px]">→</span><div class="text-[13px]">Tighter validation that blocks, not just warns</div></div>
<div class="flex items-start gap-2"><span class="text-hg-royal font-bold text-[14px]">→</span><div class="text-[13px]">Decision on whether to generalize the pipeline pattern</div></div>
<div class="flex items-start gap-2"><span class="text-hg-royal font-bold text-[14px]">→</span><div class="text-[13px]">Onboarding so others can run this without a dev setup</div></div>
</div>
</div>
</div>
</div>

---
layout: default
---

# Four Principles Worth Carrying Forward

<div class="flex flex-col gap-5 mt-6">
<div class="flex items-start gap-5 p-4 bg-hg-gray rounded-lg">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-hg-navy text-white flex items-center justify-center font-bold text-[16px]">1</div>
<div>
<div class="font-bold text-hg-navy text-[14px] mb-1">Constrain the output format, not the creativity</div>
<div class="text-[13px] text-hg-dark">Asking an LLM to "make a deck" produces inconsistent results. Asking it to produce Markdown that satisfies a grammar produces repeatable ones. The creative surface stays wide when the structural surface is narrow and enforced.</div>
</div>
</div>
<div class="flex items-start gap-5 p-4 bg-hg-gray rounded-lg">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-hg-royal text-white flex items-center justify-center font-bold text-[16px]">2</div>
<div>
<div class="font-bold text-hg-navy text-[14px] mb-1">Brand is code</div>
<div class="text-[13px] text-hg-dark">Logos, footers, color tokens, and slide numbers belong in a theme, not in a prompt instruction that can drift. When brand lives in code, it cannot be forgotten under deadline or ignored by a distracted model.</div>
</div>
</div>
<div class="flex items-start gap-5 p-4 bg-hg-gray rounded-lg">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-hg-medium text-white flex items-center justify-center font-bold text-[16px]">3</div>
<div>
<div class="font-bold text-hg-navy text-[14px] mb-1">Treat prompt, validator, and build as one system</div>
<div class="text-[13px] text-hg-dark">A good prompt without validation drifts. Validation without a clean prompt catches too many errors too late. A clean build with neither produces confident-looking garbage. They only work as a system.</div>
</div>
</div>
<div class="flex items-start gap-5 p-4 bg-hg-gray rounded-lg">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-hg-purple text-white flex items-center justify-center font-bold text-[16px]">4</div>
<div>
<div class="font-bold text-hg-navy text-[14px] mb-1">Automation glue is what makes AI feel like a product</div>
<div class="text-[13px] text-hg-dark">Drive sync + GitHub Actions + Vercel is what turns a capability into something a person can use without knowing what is happening. The engineering is not impressive. The result is.</div>
</div>
</div>
</div>
