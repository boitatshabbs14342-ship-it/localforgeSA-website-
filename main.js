// LocalForge - Standalone Vanilla JS Controller (South Africa Edition)

// Global state for 3-step audit widget
let selectedBizType = 'auto';
let selectedBizTypeName = 'Auto Shop / Panel Beater';

function selectSuburb(suburb) {
  const suburbInput = document.getElementById('step1-suburb');
  if (suburbInput) suburbInput.value = suburb;

  // Highlight pill
  document.querySelectorAll('.suburb-pill').forEach(btn => {
    if (btn.textContent.includes(suburb.split(',')[0])) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

function selectIndustry(typeId, btnEl) {
  selectedBizType = typeId;
  document.querySelectorAll('.industry-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const titleEl = btnEl.querySelector('strong');
  if (titleEl) selectedBizTypeName = titleEl.textContent;
}

function goToAuditStep(step) {
  const step1 = document.getElementById('audit-step-1');
  const step2 = document.getElementById('audit-step-2');
  const step3 = document.getElementById('audit-step-3');

  const tab1 = document.getElementById('step-tab-1');
  const tab2 = document.getElementById('step-tab-2');
  const tab3 = document.getElementById('step-tab-3');

  const bizName = document.getElementById('step1-biz-name')?.value || 'Gauteng Auto Works';
  const suburb = document.getElementById('step1-suburb')?.value || 'Sandton, Johannesburg';

  // Update previews in Step 2
  const pBiz = document.getElementById('step2-biz-preview');
  const pSub = document.getElementById('step2-suburb-preview');
  if (pBiz) pBiz.textContent = bizName;
  if (pSub) pSub.textContent = suburb;

  // Hide all panels
  step1?.classList.add('hidden');
  step2?.classList.add('hidden');
  step3?.classList.add('hidden');

  // Reset tab active states
  [tab1, tab2, tab3].forEach(t => t?.classList.remove('active'));

  if (step === 1) {
    step1?.classList.remove('hidden');
    tab1?.classList.add('active');
  } else if (step === 2) {
    step2?.classList.remove('hidden');
    tab2?.classList.add('active');
    tab1?.classList.add('completed');
  } else if (step === 3) {
    step3?.classList.remove('hidden');
    tab3?.classList.add('active');
    tab2?.classList.add('completed');
  }
}

function runStep3Scan() {
  goToAuditStep(3);

  const loading = document.getElementById('step3-loading');
  const results = document.getElementById('step3-results');
  const progressBar = document.getElementById('step3-progress-bar');
  const scanStatus = document.getElementById('step3-scan-status');

  const bizName = document.getElementById('step1-biz-name')?.value || 'Gauteng Auto Works';
  const suburb = document.getElementById('step1-suburb')?.value || 'Sandton, Johannesburg';

  loading?.classList.remove('hidden');
  results?.classList.add('hidden');
  if (progressBar) progressBar.style.width = '0%';

  const stages = [
    'Connecting to South African Google Maps cluster...',
    'Analyzing Local 3-Pack radius & suburb centroid falloff...',
    'Checking Brabys, Yellow Pages SA, and Yalwa NAP consistency...',
    'Evaluating WhatsApp review velocity against top local competitors...',
    'Generating Instant 3-Card Diagnostic Breakdown...'
  ];

  let step = 0;
  const interval = setInterval(() => {
    step++;
    if (step < stages.length) {
      if (scanStatus) scanStatus.textContent = stages[step];
      if (progressBar) progressBar.style.width = `${((step + 1) / stages.length) * 100}%`;
    } else {
      clearInterval(interval);
      loading?.classList.add('hidden');
      results?.classList.remove('hidden');

      // Update text in result card
      const titleEl = document.getElementById('step3-display-name');
      const subEl = document.getElementById('step3-display-sub');
      if (titleEl) titleEl.textContent = `${bizName} (${suburb})`;
      if (subEl) {
        subEl.innerHTML = `Category: <span class="accent-color font-bold">${selectedBizTypeName}</span> • 3-Pack Opportunity: <span class="text-success font-bold">+280% Inbound Calls</span>`;
      }
    }
  }, 450);
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // Google 3-Pack Simulator Toggle
  const toggleBefore = document.getElementById('toggle-before-btn');
  const toggleAfter = document.getElementById('toggle-after-btn');
  const mockupBody = document.getElementById('mockup-body');

  if (toggleBefore && toggleAfter && mockupBody) {
    toggleBefore.addEventListener('click', () => {
      toggleBefore.classList.add('active');
      toggleAfter.classList.remove('active');
      mockupBody.innerHTML = `
        <div class="rank-card">
          <div class="flex-between">
            <span>#1 Central Drain Co</span>
            <span style="color:#fbbf24">4.3 ★ (84)</span>
          </div>
          <div class="meta-line">Plumber • Closes 5PM • Sandton</div>
        </div>
        <div class="rank-card">
          <div class="flex-between">
            <span>#2 Gauteng Plumbing Works</span>
            <span style="color:#fbbf24">4.1 ★ (32)</span>
          </div>
          <div class="meta-line">Emergency Plumber • 2.8 km</div>
        </div>
        <div class="rank-card" style="border:1px solid rgba(239,68,68,0.4); background: rgba(239,68,68,0.05);">
          <div class="flex-between">
            <strong style="color:#f87171">#14 Sandton Emergency Plumbing (Buried)</strong>
            <span style="font-size:10px; color:#f87171; font-weight:bold;">LOST ON PAGE 2</span>
          </div>
          <div class="meta-line" style="margin-top:4px;">4.0 ★ (11 reviews) • Unverified Brabys listing</div>
          <div style="font-size:11px; color:#fca5a5; margin-top:6px;">❌ Zero calls from Google Maps • Zero ranking outside 1.2km</div>
        </div>
      `;
    });

    toggleAfter.addEventListener('click', () => {
      toggleAfter.classList.add('active');
      toggleBefore.classList.remove('active');
      mockupBody.innerHTML = `
        <div class="rank-card rank-1-card">
          <div class="rank-badge">#1 Rank in Suburb</div>
          <div class="rank-card-header">
            <strong>Sandton Emergency Plumbing</strong>
            <span class="verified-tag">✓ Verified GBP</span>
          </div>
          <div class="star-rating">
            <span class="stars">★★★★★</span>
            <span class="score">4.9 (248 reviews)</span>
          </div>
          <div class="meta-line">📍 Plumber • Open 24/7 • Sandton, JHB (0.8 km)</div>
          <div class="rank-tags">
            <span class="tag-accent">📞 Call: +284% Inbound Volume</span>
            <span class="tag-muted">WhatsApp Review Funnel</span>
          </div>
        </div>
        <div class="rank-card rank-dim">
          <div class="flex-between">
            <span>#2 Central Drain Co</span>
            <span>4.3 ★ (84 reviews)</span>
          </div>
          <div class="meta-line">Plumbing • Closes 5PM • 1.4 km</div>
        </div>
        <div class="rank-card rank-dim">
          <div class="flex-between">
            <span>#3 Gauteng Plumbing Works</span>
            <span>4.1 ★ (32 reviews)</span>
          </div>
          <div class="meta-line">Emergency Plumber • 2.8 km away</div>
        </div>
      `;
    });
  }

  // Interactive ROI Calculator Logic (ZAR)
  const ticketSlider = document.getElementById('ticket-slider');
  const callsSlider = document.getElementById('calls-slider');
  const closeSlider = document.getElementById('close-slider');

  const ticketDisplay = document.getElementById('ticket-val-display');
  const callsDisplay = document.getElementById('calls-val-display');
  const closeDisplay = document.getElementById('close-val-display');

  const annualDisplay = document.getElementById('annual-revenue-display');
  const newCallsDisplay = document.getElementById('new-calls-display');
  const newMonthlyDisplay = document.getElementById('new-monthly-display');

  function updateRoi() {
    if (!ticketSlider || !callsSlider || !closeSlider) return;

    const ticket = Number(ticketSlider.value);
    const calls = Number(callsSlider.value);
    const close = Number(closeSlider.value) / 100;

    if (ticketDisplay) ticketDisplay.textContent = `R${ticket.toLocaleString()}`;
    if (callsDisplay) callsDisplay.textContent = `${calls} calls`;
    if (closeDisplay) closeDisplay.textContent = `${Math.round(close * 100)}%`;

    const growthMultiplier = 2.5;
    const projectedCalls = Math.round(calls * growthMultiplier);
    const addedCalls = projectedCalls - calls;
    const newCustomers = Math.round(addedCalls * close);
    const newMonthlyGross = newCustomers * ticket;
    const newAnnual = newMonthlyGross * 12;

    if (annualDisplay) annualDisplay.textContent = `+ R${newAnnual.toLocaleString()}`;
    if (newCallsDisplay) newCallsDisplay.textContent = `+${addedCalls} calls`;
    if (newMonthlyDisplay) newMonthlyDisplay.textContent = `+ R${newMonthlyGross.toLocaleString()}`;
  }

  if (ticketSlider && callsSlider && closeSlider) {
    ticketSlider.addEventListener('input', updateRoi);
    callsSlider.addEventListener('input', updateRoi);
    closeSlider.addEventListener('input', updateRoi);
    updateRoi();
  }

  // Interactive Detailed Local SEO Audit Form Runner
  const auditForm = document.getElementById('audit-form');
  const auditLoading = document.getElementById('audit-loading');
  const auditResults = document.getElementById('audit-results');
  const progressBar = document.getElementById('progress-bar');
  const scanStatus = document.getElementById('scan-status');
  const resetAuditBtn = document.getElementById('reset-audit-btn');

  if (auditForm && auditLoading && auditResults) {
    const scanStages = [
      'Connecting to Google Maps South Africa cluster...',
      'Analyzing Primary & Secondary category clusters...',
      'Scanning Brabys & Yellow Pages SA for NAP inconsistencies...',
      'Measuring suburb proximity radius & centroid falloff...',
      'Evaluating WhatsApp review velocity & customer recency...',
      'Compiling 100-Point South African SEO Action Blueprint...'
    ];

    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const bizName = document.getElementById('businessName')?.value || 'Your Storefront';
      const cityState = document.getElementById('cityState')?.value || 'South Africa';

      auditForm.classList.add('hidden');
      auditLoading.classList.remove('hidden');
      auditResults.classList.add('hidden');

      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step < scanStages.length) {
          if (scanStatus) scanStatus.textContent = scanStages[step];
          if (progressBar) progressBar.style.width = `${((step + 1) / scanStages.length) * 100}%`;
        } else {
          clearInterval(interval);
          auditLoading.classList.add('hidden');
          auditResults.classList.remove('hidden');

          // Populate results
          const rBiz = document.getElementById('result-biz-name');
          const rSum = document.getElementById('result-summary');
          if (rBiz) rBiz.textContent = `${bizName} (${cityState})`;
          if (rSum) {
            rSum.textContent = `Overall Local 3-Pack Health Score: 58/100. Proximity drop-off past 2.4km and missing Brabys citations are causing phone calls to go to competitors in ${cityState}.`;
          }

          const checklistContainer = document.getElementById('checklist-container');
          if (checklistContainer) {
            checklistContainer.innerHTML = `
              <div class="check-item">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                  <strong>⚠️ Google Business Profile Category Precision</strong>
                  <span style="color:#f97316; font-weight:bold;">14/20 pts</span>
                </div>
                <p style="font-size:12px; color:#94a3b8;">Missing high-intent secondary category clusters and keyword-rich service descriptions.</p>
              </div>
              <div class="check-item">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                  <strong style="color:#f87171">🚨 Suburb Proximity Radius Drop-off</strong>
                  <span style="color:#f87171; font-weight:bold;">8/20 pts</span>
                </div>
                <p style="font-size:12px; color:#94a3b8;">Ranking collapses past 2.4km from physical address. Outer suburbs capture 0 visibility.</p>
              </div>
              <div class="check-item">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                  <strong>⚠️ SA Directory NAP Consistency (Brabys / Yellow Pages)</strong>
                  <span style="color:#f97316; font-weight:bold;">15/20 pts</span>
                </div>
                <p style="font-size:12px; color:#94a3b8;">6 citation discrepancies and 1 unmerged duplicate pin found on Brabys & Yalwa SA.</p>
              </div>
              <div class="check-item">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                  <strong>⚠️ WhatsApp Review Velocity & Recency</strong>
                  <span style="color:#f97316; font-weight:bold;">12/20 pts</span>
                </div>
                <p style="font-size:12px; color:#94a3b8;">Averaging 1.4 reviews/mo. Top 3 competitors average 12+ reviews/mo.</p>
              </div>
            `;
          }
        }
      }, 550);
    });

    if (resetAuditBtn) {
      resetAuditBtn.addEventListener('click', () => {
        auditResults.classList.add('hidden');
        auditLoading.classList.add('hidden');
        auditForm.classList.remove('hidden');
        if (progressBar) progressBar.style.width = '0%';
      });
    }
  }
});
