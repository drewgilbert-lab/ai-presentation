---
class: bg-cover-slide
---

<h1 class="hg-cover-title">When the partner channel breaks, the data layer decides who wins ANZ.</h1>

<p class="hg-cover-subtitle">Recommendation for Interactive's FY27 GTM data foundation. Prepared for Leo Wilhelm, Head of Performance and Insights, and Shriya, Customer Insights Manager. May 28, 2026.</p>

---
class: bg-content-slide
---

<h1 class="hg-title">Broadcom didn't just buy VMware. They closed the partner channel ANZ ran on.</h1>

<div class="grid grid-cols-2 gap-8 mt-8 items-center">
  <div>
    <ul>
      <li>Most reseller and partner relationships were eliminated in the acquisition.</li>
      <li>ANZ companies are evaluating their options now, not next year.</li>
      <li>The companies who can name them first will own the displacement cycle.</li>
    </ul>
  </div>
  <div class="hg-stat-box">
    <div class="hg-stat-num">~600</div>
    <div class="hg-stat-label">ANZ orgs running VMware or Broadcom products</div>
  </div>
</div>

<p class="text-sm italic mt-8">Source: ANZ infrastructure install data, validated April 2026.</p>

---
class: bg-content-slide
---

<h1 class="hg-title">Mid-market is where you compete. Enterprise is where you need to grow.</h1>

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="hg-card">
    <div class="hg-card-header">Today</div>
    <div class="hg-card-body">
      <ul>
        <li>Reps call IT managers because they don't know what the prospect is running.</li>
        <li>Conversations stay tactical.</li>
        <li>Hardware Maintenance carries the volume. Cloud and Cyber stall before the CISO.</li>
      </ul>
    </div>
  </div>
  <div class="hg-card">
    <div class="hg-card-header">FY27</div>
    <div class="hg-card-body">
      <ul>
        <li>Reps reach CISOs and Infrastructure Managers on the first call.</li>
        <li>Enterprise accounts open with signal, not cold pitches.</li>
        <li>The new superannuation pod launches with a named list, not a blind hunt.</li>
      </ul>
    </div>
  </div>
</div>

---
class: bg-content-slide
---

<h1 class="hg-title">The players with signal pull ahead. The ones without compete on price.</h1>

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="hg-panel-royal">
    <p class="font-bold mb-4">Companies with signal</p>
    <ul>
      <li>Install base signal. Pick the fights you can win.</li>
      <li>Displacement triggers. Call at the moment, not before.</li>
      <li>Buying intent. High-margin work, not commodity sweeps.</li>
    </ul>
  </div>
  <div class="hg-card">
    <div class="hg-card-header">Companies without signal</div>
    <div class="hg-card-body">
      <ul>
        <li>Web-scraped firmographics. Stale and shallow.</li>
        <li>Cold calls and IT-manager routing.</li>
        <li>Price competition on the commodity sweep.</li>
      </ul>
    </div>
  </div>
</div>

---
class: bg-content-slide
---

<h1 class="hg-title">Every rep walks into the call already knowing what the prospect is running.</h1>

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="hg-card">
    <div class="hg-card-header">Account: Westpac AU Pty Ltd</div>
    <div class="hg-card-body">
      <div class="grid grid-cols-2 gap-3">
        <div class="hg-card">
          <div class="hg-card-body text-sm">Cisco Catalyst 9300, Q3 2024</div>
        </div>
        <div class="hg-card">
          <div class="hg-card-body text-sm">VMware vSphere 7, support ends 2026</div>
        </div>
        <div class="hg-card">
          <div class="hg-card-body text-sm">Azure, 12 subscriptions</div>
        </div>
        <div class="hg-card">
          <div class="hg-card-body text-sm">AWS, 3 accounts</div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3 mt-4">
        <div class="hg-stat-box">
          <div class="hg-stat-label">TrustRadius: evaluating SIEM</div>
        </div>
        <div class="hg-stat-box">
          <div class="hg-stat-label">Cyber category intent rising</div>
        </div>
      </div>
      <p class="text-sm italic mt-4">Suggested opener: you're running Catalyst 9300 with vSphere 7 support sunsetting in 2026, and Cyber is evaluating SIEM. Worth 20 minutes on co-terming the refresh.</p>
    </div>
  </div>
  <div class="hg-panel-royal">
    <ul>
      <li>Hardware Maintenance opens with the specific Cisco or VMware install.</li>
      <li>Cloud knows whether it's Azure or AWS before the first email.</li>
      <li>The superannuation pod launches with a pre-qualified list of the top 20.</li>
    </ul>
  </div>
</div>

---
class: bg-content-slide
---

<h1 class="hg-title">Three reasons Interactive can't get there on the current stack.</h1>

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="hg-card">
    <div class="hg-card-header">Data quality</div>
    <div class="hg-card-body">Your current providers are web-scraped, broad, and low-signal. They miss ANZ installs and can't show recency.</div>
  </div>
  <div class="hg-card">
    <div class="hg-card-header">CRM trust</div>
    <div class="hg-card-body">Dynamics holds 5,000 accounts with no enrichment, duplicates, and no governance. Reps don't trust what's there.</div>
  </div>
  <div class="hg-card">
    <div class="hg-card-header">Modeling capacity</div>
    <div class="hg-card-body">Databricks has no signal feed. Your team can't build prioritization or scoring on data they don't have.</div>
  </div>
</div>

---
class: bg-divider-slide
---

<h1 class="hg-title">From signals to systems.</h1>

---
class: bg-content-slide
---

<h1 class="hg-title">Offline-sourced ANZ install data, flowing into Dynamics and Databricks.</h1>

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="hg-panel-navy">
    <ul>
      <li>Every install is timestamped, sourced from offline documents.</li>
      <li>Enrichment fields land directly on the Dynamics 365 account record.</li>
      <li>The same data pushes to Databricks for modeling.</li>
    </ul>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <div class="hg-card">
      <div class="hg-card-header">Sources</div>
      <div class="hg-card-body">Cover letters, resumes, RFPs, investor memos.</div>
    </div>
    <div class="hg-card">
      <div class="hg-card-header">HG Platform + Fabric</div>
      <div class="hg-card-body">Offline-sourced install data, refreshed continuously.</div>
    </div>
    <div class="hg-card">
      <div class="hg-card-header">Dynamics 365</div>
      <div class="hg-card-body">Enrichment fields on the account record.</div>
    </div>
    <div class="hg-card">
      <div class="hg-card-header">Databricks</div>
      <div class="hg-card-body">Signal feed for scoring and prioritization.</div>
    </div>
  </div>
</div>

---
class: bg-content-slide
---

<h1 class="hg-title">Three use cases ready on day one.</h1>

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="hg-stat-box">
    <div class="hg-stat-num">~600</div>
    <div class="hg-stat-label">VMware and Broadcom orgs across ANZ, ready as a Hardware Maintenance displacement list.</div>
  </div>
  <div class="hg-stat-box">
    <div class="hg-stat-num">5,000</div>
    <div class="hg-stat-label">Dynamics accounts enriched. Around 30 new accounts per month re-enriched at no extra credit.</div>
  </div>
  <div class="hg-stat-box">
    <div class="hg-stat-num">Top 20</div>
    <div class="hg-stat-label">ANZ superannuation funds, sized and signal-mapped for the new pod.</div>
  </div>
</div>

<p class="text-sm italic mt-8 text-center">First 90 days. The rest of your use case list extends from here.</p>

---
class: bg-content-slide
---

<h1 class="hg-title">Make the FY27 call by June 10.</h1>

<div class="grid grid-cols-2 gap-8 mt-6">
  <div class="hg-card">
    <div class="hg-card-header">Phase 1, FY27 kickoff</div>
    <div class="hg-card-body">Annual enrichment of 5,000 Dynamics accounts, delivered before July 1.</div>
  </div>
  <div class="hg-card">
    <div class="hg-card-header">Phase 2, Shriya-led build</div>
    <div class="hg-card-body">Fabric API into Dynamics and Databricks on the implementation timeline that works.</div>
  </div>
</div>

<p class="text-sm italic mt-4 text-center">Optional add-ons: IT Spend Insights for Cloud LOB. TrustRadius intent for Cyber and Cloud.</p>

<div class="grid grid-cols-3 gap-6 mt-6">
  <div class="hg-stat-box">
    <div class="hg-stat-num">1</div>
    <div class="hg-stat-label">This week: HG validates 20 to 50 of your known accounts.</div>
  </div>
  <div class="hg-stat-box">
    <div class="hg-stat-num">2</div>
    <div class="hg-stat-label">Next week: Leo presents the recommendation to Marketing and Sales.</div>
  </div>
  <div class="hg-stat-box">
    <div class="hg-stat-num">3</div>
    <div class="hg-stat-label">By July 1: FY27 data foundation live.</div>
  </div>
</div>

<p class="text-xs mt-6 text-center">Luke Murphy, Account Executive, HG Insights. lmurphy@hginsights.com. Rajat, Product.</p>
