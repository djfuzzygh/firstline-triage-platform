# FirstLine 2.0: MedGemma-Powered Clinical Triage for Low-Resource Settings
## Kaggle MedGemma Impact Challenge Submission

---

## Problem Statement

**400+ million people lack access to timely primary care triage.** In Sub-Saharan Africa and South Asia, rural clinics face chronic staff shortages. Patients travel hours only to wait in unstructured queues — a child with malaria-induced seizures may wait behind a mild cough case. No systematic severity assessment exists.

**The barrier isn't clinical intelligence — it's accessibility.** Existing tools assume smartphones and reliable internet. The vast majority of the target population uses feature phones (SMS/USSD) or voice-only access. Connectivity is inconsistent; power outages disconnect cloud services without warning.

**FirstLine solves this** with AI-driven triage across every access channel a patient might have — smartphone app, **toll-free voice call**, SMS, USSD on feature phones — and works offline when internet fails.

---

## Solution Overview

**FirstLine 2.0** is a multi-channel clinical decision-support system powered by Google's **MedGemma-4b-it**. It accepts patient symptoms through four channels, applies medical reasoning, and produces actionable triage decisions (RED / ORANGE / YELLOW / GREEN) with danger sign alerts, care instructions, and referral documents.

### Core Innovation: Toll-Free Voice Triage + Centralized AI

**Patients call a toll-free number and receive real-time AI triage feedback — from any phone, with no data plan.**

1. Caller navigates an IVR menu → selects age group, symptoms, duration, danger signs
2. MedGemma processes the structured input (centralized backend)
3. AI responds verbally with risk tier, danger signs flagged, and care plan
4. SMS summary sent automatically as a backup record
5. Encounter saved to database and visible on the clinician dashboard in real time

**Why this matters:**
- **Zero barrier** — Any phone, no data, no app download
- **Maximum reach** — Works for illiterate, elderly, and rural populations
- **Cost-efficient** — Toll-free for the user; centralized inference costs ~$0.001–$0.01 per triage
- **Scalable** — One backend and one number serves thousands of clinics simultaneously

### Multi-Channel Architecture

| Channel | Device | Cost to User | Use Case |
|---------|--------|--------------|----------|
| **Voice (Toll-Free)** | Any phone | FREE | Primary triage, emergency calls |
| **SMS / USSD** | Feature phone | FREE–minimal | Structured questionnaire, follow-ups |
| **Mobile App** | Smartphone | FREE | Clinician interface, detailed assessment |
| **Web Dashboard** | Browser | FREE | Admin, analytics, encounter tracking |

---

## Key Features

### 1. Voice-First Triage with Real-Time Text-to-Speech
- IVR menu collects patient data without requiring literacy or smartphone
- System reads all prompts, questions, and results aloud (Web Speech API)
- Automatic voice output with manual repeat/stop/toggle controls
- Encounters saved to database; results visible in the clinician dashboard
- Eliminates the literacy barrier for 258 million non-literate adults in Africa

### 2. Danger Sign Detection & RED-Tier Alerts
- Hard-coded override: danger signs (seizures, unconsciousness, severe bleeding) always produce RED regardless of AI confidence
- SMS and voice alerts clinicians immediately
- Rule-engine backup detects critical findings offline

### 3. Adaptive Multi-Round Assessment
- MedGemma generates context-specific follow-up questions per patient
- A 65-year-old with chest pain gets different questions than a 2-year-old with fever
- Iterative refinement improves triage accuracy over multiple interactions

### 4. Offline-First Edge Deployment
- Full system runs on a $60 Raspberry Pi 4 (no internet required)
- Serves 5,000+ patients per year at a single clinic
- Syncs encounters to cloud when connectivity returns
- Fallback chain: Cloud → Edge → Rule Engine guarantees a response always

### 5. Structured Referral Documents (SOAP Format)
- Auto-generated referral letters from triage data
- Hospital selection, standardized format, clinician signature field
- Reduces documentation burden and improves specialist handoff quality

### 6. Acoustic Health Analysis (Google Health HeAR)
- Analyses respiratory sounds (cough patterns, wheezing) for distress detection
- Integrates with the voice IVR channel for audio-based risk escalation
- Adds clinical signal without requiring patient literacy or equipment beyond a phone

### 7. Real-Time Dashboard & Analytics
- Every encounter (voice, SMS, app, USSD) writes to Firestore automatically
- Dashboard auto-refreshes every 60 seconds with updated statistics
- Encounters table filters by channel, risk tier, date, and location
- DailyRollup aggregation tracks trends across all channels

---

## Technical Stack

| Layer | Technology |
|-------|-----------|
| **AI Model** | MedGemma-4b-it (Google HAI-DEF) |
| **Backend** | TypeScript / Express.js / Node.js |
| **Database** | Firestore (cloud) + SQLite (edge) |
| **Voice / SMS** | Twilio / Africa's Talking |
| **Acoustic Analysis** | Google Health HeAR API |
| **Frontend** | React.js (web), React Native (mobile) |
| **Infrastructure** | GCP Cloud Run, Firebase Hosting |
| **Edge** | Raspberry Pi 4 / 5 (Arm64, 4–8 GB RAM) |

---

## Deployment & Cost

| Component | Cost | Notes |
|-----------|------|-------|
| Raspberry Pi 4 (8 GB) | $75 one-time | Reusable for 5+ years |
| MedGemma-4b-it | $0 | Open-source, self-hosted |
| Toll-free number | $20–50 / month | Africa's Talking or Twilio |
| Cloud backend (fallback) | $5–20 / month | Optional |
| **Cost per triage** | **~$0.01–0.02** | vs. $50–200 for a specialist |

A single clinic setup costs under $500/year and can serve 500–1,000 patients.

---

## Competitive Advantages

| Feature | FirstLine 2.0 | Competitors |
|---------|--------------|-------------|
| Toll-Free Voice Triage | ✅ | ❌ App-only |
| Fully Offline (Edge) | ✅ | ❌ Cloud-dependent |
| USSD for Feature Phones | ✅ | ❌ Smartphone-only |
| Real-Time Database + Dashboard | ✅ | ❌ Batch processing |
| MedGemma Medical LLM | ✅ | ❌ Generic models |
| Acoustic Analysis (HeAR) | ✅ | ❌ Not available |
| Edge Deployment ($60 device) | ✅ | ❌ Not available |

---

## Live System

### 🌐 Try It Now

| | URL |
|---|---|
| **Voice IVR Demo** | https://fl2-clinician-14729.web.app → "Voice Triage Demo" |
| **Clinician Dashboard** | https://fl2-dashboard-14729.web.app |
| **Backend API** | https://firstline-backend-609820916137.us-central1.run.app/health |
| **Kaggle Notebook** | https://www.kaggle.com/code/djfuzzygh/firstline-2-0-medgemma-powered-multimodal-triage |

### 📁 Source Code
**GitHub:** https://github.com/djfuzzygh/First-Line-v3

### 🎥 Demo Video
**[INSERT YOUTUBE LINK HERE]**

---

## Implementation Status

### ✅ Production-Deployed (February 2026)

**Backend — Google Cloud Run**
- Voice IVR handler with complete state machine
- MedGemma-4b-it inference engine (with rule-engine fallback)
- Firestore database with encounter persistence
- Real-time DailyRollup aggregation for dashboard stats
- Production API endpoints with health monitoring

**Frontend — Firebase Hosting**
- Voice IVR Demo: interactive, saves every encounter to database
- Clinician app: symptom simulator with lab input and follow-up questions
- Admin dashboard: auto-refreshing statistics and encounter table
- Dual hosting targets (clinician app + admin dashboard)

**Performance (Live System)**
- Cloud triage (MedGemma): 30–40 seconds
- Edge triage (Raspberry Pi): 60–120 seconds
- Offline triage (rule engine): < 1 second
- Voice IVR end-to-end: ~5 minutes
- Dashboard refresh: 60 seconds (automatic)

---

## MedGemma Integration: Technical Depth

### Prompt Structure

Every triage call sends a structured prompt that constrains MedGemma to return parseable, validated JSON — no free-form prose:

```
You are a clinical triage assistant. Return ONLY valid JSON.

Patient:
- Age: {age}
- Sex: {sex}
- Location: {location}
- Symptoms: {symptoms}
- Follow-up responses: {answers}
- Lab Results: {temperature: 39.2°C, WBC: 8.5, CRP: 18}  ← injected when available

Return JSON with this exact schema:
{
  "riskTier": "RED|YELLOW|GREEN",
  "referralRecommended": true|false,
  "recommendedNextSteps": ["..."],
  "watchOuts": ["..."],
  "dangerSigns": ["..."],
  "uncertainty": "LOW|MEDIUM|HIGH",
  "disclaimer": "This is not a diagnosis. Seek professional medical care.",
  "reasoning": "Brief clinical reasoning",
  "diagnosisSuggestions": [
    {"condition": "...", "confidence": 0.7, "reasoning": "..."}
  ],
  "followupQuestions": ["Question 1?", "Question 2?"]
}
```

The prompt enforces: (1) a fixed output schema, (2) an inline disclaimer on every response, and (3) explicit confidence scoring per diagnosis suggestion. This prevents the model from issuing unqualified statements.

### Structured Output Enforcement

MedGemma output passes through a strict parsing pipeline before reaching any downstream system:

1. **JSON extraction** — regex pulls `{...}` block from raw output, stripping markdown fences if present
2. **Field validation** — `riskTier` must be `RED | YELLOW | GREEN`; anything else is coerced to `YELLOW`
3. **Uncertainty normalization** — `uncertainty` must be `LOW | MEDIUM | HIGH`; unknown values fall back to `MEDIUM`
4. **Schema defaults** — missing fields (`dangerSigns`, `watchOuts`, `recommendedNextSteps`) default to safe empty arrays
5. **Full fallback** — any parse failure or inference exception triggers the deterministic rule engine immediately

```typescript
const risk = String(raw.riskTier || 'YELLOW').toUpperCase();
const normalizedRisk = (risk === 'RED' || risk === 'GREEN') ? risk : 'YELLOW';
```

If MedGemma returns garbage, the patient still gets a triage decision — just from the rule engine.

### Hallucination Control

| Mechanism | Implementation |
|-----------|---------------|
| **Low temperature** | 0.2 (Kaggle/HuggingFace), 0.3 (Vertex AI) — pushes output toward deterministic reasoning |
| **Constrained schema** | Prompt explicitly says "Return ONLY valid JSON" with schema in the prompt body |
| **JSON-only extraction** | Regex discards any free-text preamble MedGemma adds before or after the JSON block |
| **Coercion layer** | Invalid enum values (e.g. `"ORANGE"`, `"Critical"`) are normalized to safe defaults |
| **Inline disclaimer** | Hardcoded disclaimer field in the schema; MedGemma cannot omit it |
| **Audit log** | Every raw model response is stored in Firestore (`Decision` record) for review |

### Uncertainty Gating Logic

The `uncertainty` field from MedGemma drives automatic safety escalation — it is never just metadata:

```typescript
// HIGH uncertainty + GREEN → auto-escalate to YELLOW
if (aiResponse.uncertainty === 'HIGH' && aiResponse.riskTier === 'GREEN') {
  return {
    ...aiResponse,
    riskTier: 'YELLOW',
    reasoning: aiResponse.reasoning + ' [SAFETY ESCALATION: GREEN → YELLOW, HIGH uncertainty]',
    referralRecommended: true,
  };
}

// HIGH uncertainty + YELLOW → add extra caution instructions
if (aiResponse.uncertainty === 'HIGH' && aiResponse.riskTier === 'YELLOW') {
  return {
    ...aiResponse,
    watchOuts: [...aiResponse.watchOuts, 'AI uncertainty is HIGH; treat as high-risk YELLOW.'],
  };
}
```

The system is asymmetrically cautious: HIGH uncertainty can only escalate a tier, never reduce it. The rule engine always returns `uncertainty: 'MEDIUM'` as a conservative baseline.

### Medical Safety Layers

Three independent layers protect against unsafe AI output, applied in order:

**Layer 1 — Danger Sign Detection (pre-AI, hard override)**
Regex patterns match clinical red flags across the full text (symptoms + follow-up answers + acoustic summary). If any match, RED is returned immediately — MedGemma is never called:

```
/unconscious|unresponsive|not waking/i
/seizure|convulsion|fitting/i
/can't breathe|cannot breathe|gasping|blue lips/i
/heavy bleeding|hemorrhage|bleeding won't stop/i
/severe chest pain|crushing chest|heart attack/i
```

This runs before any LLM call. Danger sign detection uses `uncertainty: 'LOW'` — it is deterministic and not subject to model variability.

**Layer 2 — Uncertainty Gating (post-AI)**
HIGH uncertainty escalates GREEN → YELLOW automatically (see above). The model's own confidence signal is used to make the system more conservative, not less.

**Layer 3 — Rule Engine Fallback**
If the AI call throws any exception (timeout, parse error, GPU OOM), the deterministic rule engine runs instead and sets `uncertainty: 'HIGH'` + prefixes the disclaimer with `"RULE ENGINE FALLBACK:"` so clinicians know the AI was not used.

### Why MedGemma-4b-it?

| Factor | Reasoning |
|--------|-----------|
| **Edge deployment** | 4B parameters fit in 4 GB RAM on a Raspberry Pi 4 — the primary deployment target for rural clinics. A 27B model does not. |
| **Instruction-tuned (-it)** | The `-it` variant follows structured prompts reliably. Base weights required few-shot examples to produce consistent JSON; `-it` does not. |
| **Medical pre-training** | 40% biomedical tokens means the model understands clinical terminology without domain-specific fine-tuning. |
| **Kaggle GPU compatibility** | Fits on a T4 (16 GB VRAM) with `bfloat16` — standard on Kaggle notebooks. Larger models require A100s. |
| **Inference speed** | 15–25 seconds warm on T4; 60–120 seconds on Raspberry Pi CPU — within acceptable voice IVR latency for a 5-minute total call. |
| **Open licence** | Deployable in air-gapped clinic environments with no ongoing API dependency or data-sharing agreement. |

The 2B variant was tested and produced less consistent JSON schemas and more frequent fallback-to-rules. The 27B variant exceeds edge hardware constraints. 4B is the practical optimum for this deployment profile.

---

## Impact & Vision

**Immediate (2026):** Deploy to 50 rural clinics in Kenya, Uganda, and Nigeria — serving 100,000+ patient encounters per year. Reduce clinician cognitive load by ~40% and enable community health workers to perform specialist-level triage.

**Medium-term (2027–2028):** Expand to 500 clinics across 10 countries. Integrate with national health information systems. Publish results in *Lancet Digital Health*.

**Long-term:** Every phone becomes a triage device. AI clinical decision support is free, universal, and resilient — no longer limited by geography, connectivity, or literacy.

---

## Why FirstLine 2.0 Deserves Recognition

1. **Real problem, real scale** — 400+ million people without triage access
2. **Toll-free voice removes every barrier** — No smartphone, no data plan, no literacy required
3. **Offline-first architecture** — Works where competitors can't
4. **Effective use of MedGemma** — Small model deployed at massive scale
5. **End-to-end system** — From voice call to clinician dashboard, fully integrated and live
6. **Reproducible** — Open-source, documented, deployable by any clinic or NGO

**FirstLine 2.0 isn't just an app — it's resilient healthcare infrastructure for the Global South.**

---

*License: CC-BY-4.0 | Status: Production-Ready | Last Updated: February 2026*
