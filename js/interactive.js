/**
 * THINAIRA - Interactive Domain Micro-Tools
 * Powers Agro Estimator, Cyber Security Health Checker, and Thinai Travel Route Explorer
 */

document.addEventListener('DOMContentLoaded', () => {
  initAgroEstimator();
  initCyberHealthChecker();
  initTravelRouteExplorer();
});

/* ==========================================================================
   1. AGRO TECH POTENTIAL & SUSTAINABILITY ESTIMATOR
   ========================================================================== */
function initAgroEstimator() {
  const farmSizeInput = document.getElementById('farmSize');
  const farmSizeDisplay = document.getElementById('farmSizeDisplay');
  const cropTypeSelect = document.getElementById('cropType');
  const techTierSelect = document.getElementById('techTier');

  const waterSavedVal = document.getElementById('metricWaterSaved');
  const yieldBoostVal = document.getElementById('metricYieldBoost');
  const carbonOffsetVal = document.getElementById('metricCarbonOffset');

  if (!farmSizeInput || !cropTypeSelect) return;

  function updateEstimates() {
    const acres = parseFloat(farmSizeInput.value) || 10;
    if (farmSizeDisplay) {
      farmSizeDisplay.textContent = `${acres} Acres`;
    }

    const cropFactor = parseFloat(cropTypeSelect.selectedOptions[0]?.getAttribute('data-factor') || 1.0);
    const techFactor = parseFloat(techTierSelect.selectedOptions[0]?.getAttribute('data-tech') || 1.0);

    // Dynamic calculations
    const baseWaterSaving = Math.min(48, Math.round(28 * techFactor));
    const baseYieldBoost = Math.min(38, Math.round(18 * cropFactor * techFactor));
    const annualCarbonOffset = (acres * 0.45 * techFactor).toFixed(1);

    if (waterSavedVal) waterSavedVal.textContent = `${baseWaterSaving}%`;
    if (yieldBoostVal) yieldBoostVal.textContent = `+${baseYieldBoost}%`;
    if (carbonOffsetVal) carbonOffsetVal.textContent = `${annualCarbonOffset} T`;
  }

  farmSizeInput.addEventListener('input', updateEstimates);
  cropTypeSelect.addEventListener('change', updateEstimates);
  techTierSelect.addEventListener('change', updateEstimates);

  // Initial calculation
  updateEstimates();
}

/* ==========================================================================
   2. CYBER SECURITY POSTURE HEALTH CHECKER
   ========================================================================== */
function initCyberHealthChecker() {
  const auditAgeSelect = document.getElementById('cyberAuditAge');
  const infraTypeSelect = document.getElementById('cyberInfra');
  const complianceSelect = document.getElementById('cyberCompliance');

  const scoreDisplay = document.getElementById('cyberScoreVal');
  const postureStatus = document.getElementById('cyberPostureStatus');
  const recommendationEl = document.getElementById('cyberRecommendation');

  if (!auditAgeSelect || !infraTypeSelect) return;

  function assessPosture() {
    let score = 50;
    const auditVal = auditAgeSelect.value;
    const infraVal = infraTypeSelect.value;
    const compVal = complianceSelect.value;

    if (auditVal === 'recent') score += 25;
    else if (auditVal === 'medium') score += 10;
    else if (auditVal === 'never') score -= 20;

    if (infraVal === 'cloud') score += 10;
    else if (infraVal === 'hybrid') score += 5;

    if (compVal === 'all') score += 15;
    else if (compVal === 'iso') score += 10;

    score = Math.max(25, Math.min(96, score));

    if (scoreDisplay) scoreDisplay.textContent = `${score}/100`;

    if (postureStatus && recommendationEl) {
      if (score >= 80) {
        postureStatus.textContent = "Fortified Posture (Strong)";
        postureStatus.style.color = "var(--agro-light)";
        recommendationEl.textContent = "Your digital perimeter is in good standing. Maintain with automated weekly penetration scans and continuous ISO/CERT-In recertification.";
      } else if (score >= 60) {
        postureStatus.textContent = "Moderate Risk Exposure";
        postureStatus.style.color = "var(--travel-light)";
        recommendationEl.textContent = "Potential vulnerabilities exist in API integrations and IAM roles. We recommend a Comprehensive VAPT Audit and DPDP Act alignment.";
      } else {
        postureStatus.textContent = "Critical Perimeter Alert";
        postureStatus.style.color = "#f43f5e";
        recommendationEl.textContent = "Urgent: Elevated vulnerability to zero-day attacks and regulatory non-compliance. Immediate White-Box Penetration Audit and Zero-Trust remediation required.";
      }
    }
  }

  auditAgeSelect.addEventListener('change', assessPosture);
  infraTypeSelect.addEventListener('change', assessPosture);
  complianceSelect.addEventListener('change', assessPosture);

  assessPosture();
}

/* ==========================================================================
   3. THINAI TRAVEL ROUTE EXPLORER
   ========================================================================== */
function initTravelRouteExplorer() {
  const routeButtons = document.querySelectorAll('.route-select-btn');
  const routeTitle = document.getElementById('routeTitle');
  const routeTamil = document.getElementById('routeTamil');
  const routeDuration = document.getElementById('routeDuration');
  const routeDescription = document.getElementById('routeDescription');
  const routeHighlights = document.getElementById('routeHighlights');

  const routeData = {
    kurinji: {
      title: "Kurinji High-Altitude Eco-Sanctuary Trail",
      tamil: "குறிஞ்சி — மலையும் மலை சார்ந்த வாழ்வியலும்",
      duration: "5 Days / 4 Nights",
      description: "Traverse misty Shola forests, ancient hill-tribe settlement pathways, and endemic Neelakurinji biodiversity sanctuaries with indigenous naturalist guides.",
      highlights: ["Misty Shola Forest Cloud Treks", "Indigenous Toda & Badaga Artisan Encounters", "Ethical Wildlife Photography Corridors", "Organic High-Elevation Tea & Honey Foraging"]
    },
    marutham: {
      title: "Marutham Cauvery Valley Heritage & Agri-Odyssey",
      tamil: "மருதம் — வயலும் வயல் சார்ந்த நெற்களஞ்சியமும்",
      duration: "4 Days / 3 Nights",
      description: "Immerse in the timeless agricultural heartland of Tamil Nadu along the Cauvery Delta, exploring Chola hydraulic canal architecture and heirloom paddy farms.",
      highlights: ["Grand Anicut (Kallanai) Hydraulic Wonders", "Heirloom Traditional Seed Bank Workshops", "Farm-to-Table Sangam Organic Dining", "Temple Tank Ecosystem Conservation Walks"]
    },
    neythal: {
      title: "Neythal Maritime Silk & Coastal Fisherfolk Voyage",
      tamil: "நெய்தல் — கடலும் கடல் சார்ந்த துறைமுகப் பயணம்",
      duration: "4 Days / 3 Nights",
      description: "Follow the maritime ancient spice routes from ancient Poompuhar to the corals of Gulf of Mannar, honoring sustainable artisanal boatmaking and coastal cultures.",
      highlights: ["Ancient Submerged Port Archaeology Exploration", "Coral Reef Conservation & Snorkeling", "Catamaran Craftsmanship Heritage Sessions", "Bioluminescent Night Lagoon Kayaking"]
    },
    mullai: {
      title: "Mullai Woodland & Pastoral Folkways Expedition",
      tamil: "முல்லை — காடும் காடு சார்ந்த ஆநிரை வாழ்வும்",
      duration: "3 Days / 2 Nights",
      description: "Experience the gentle rhythms of deciduous forests, pastoral grasslands, native cattle sanctuaries, and timeless Sangam folk music under starlit canopies.",
      highlights: ["Kangayam & Umblachery Indigenous Cattle Sanctuaries", "Herbal Botanical Canopy Night Walks", "Live Villu Paatu & Folk Bard Storytelling", "Zero-Waste Forest Camp Retreat"]
    }
  };

  routeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      routeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const landscape = btn.getAttribute('data-route');
      const data = routeData[landscape];

      if (data && routeTitle) {
        routeTitle.textContent = data.title;
        if (routeTamil) routeTamil.textContent = data.tamil;
        if (routeDuration) routeDuration.textContent = data.duration;
        if (routeDescription) routeDescription.textContent = data.description;

        if (routeHighlights) {
          routeHighlights.innerHTML = data.highlights
            .map(item => `
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.88rem;color:#cbd5e1;margin-bottom:0.4rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--travel-light)" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                ${item}
              </li>
            `).join('');
        }
      }
    });
  });
}
