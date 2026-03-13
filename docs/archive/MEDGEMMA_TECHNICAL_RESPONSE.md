# MedGemma Usage — Technical Detail

---

## Prompt Structure

Every triage call sends a fully-constrained prompt. MedGemma never returns free-form text:

```
You are a clinical triage assistant. Return ONLY valid JSON.

Patient: Age {age}, Sex {sex}, Location {location}
Symptoms: {symptoms}
Follow-up responses: {answers}
Lab Results: {temperature: 39.2°C, WBC: 8.5, CRP: 18}  ← injected when available

Return this exact schema:
{
  "riskTier": "RED|YELLOW|GREEN",
  "uncertainty": "LOW|MEDIUM|HIGH",
  "dangerSigns": ["..."],
  "recommendedNextSteps": ["..."],
  "watchOuts": ["..."],
  "referralRecommended": true|false,
  "reasoning": "Brief clinical reasoning",
  "disclaimer": "This is not a diagnosis. Seek professional medical care.",
  "diagnosisSuggestions": [{"condition": "...", "confidence": 0.7, "reasoning": "..."}],
  "followupQuestions": ["..."]
}
```

The disclaimer is a required field in the schema — MedGemma cannot omit it.

---

## Structured Output & Hallucination Control

Output passes through a 5-step validation pipeline before any downstream use:

1. Regex extracts the `{...}` JSON block — markdown fences and preamble discarded
2. `riskTier` validated; anything not `RED` or `GREEN` is coerced to `YELLOW`
3. `uncertainty` validated; unknown values fall back to `MEDIUM`
4. Missing array fields default to `[]` — never `null` or `undefined`
5. Any exception (parse failure, GPU OOM, timeout) → rule engine runs instead

Temperature is set to **0.2** (Kaggle/HuggingFace) and **0.3** (Vertex AI) to keep output deterministic. Every raw model response is stored in Firestore as a `Decision` record for audit.

---

## Medical Safety Layers (3 independent, applied in order)

**Layer 1 — Danger sign detection (pre-AI, hard override)**
Regex matches clinical red flags across all text. If any match, `RED` is returned immediately — MedGemma is never called:
```
/unconscious|unresponsive|not waking/i
/seizure|convulsion|fitting/i
/can't breathe|cannot breathe|gasping|blue lips/i
/heavy bleeding|hemorrhage|bleeding won't stop/i
/severe chest pain|crushing chest|heart attack/i
```
Detection result carries `uncertainty: 'LOW'` — it is deterministic, not probabilistic.

**Layer 2 — Uncertainty gating (post-AI)**
`HIGH` uncertainty can only escalate a tier, never reduce it:
```typescript
if (uncertainty === 'HIGH' && riskTier === 'GREEN')  → auto-upgrade to YELLOW
if (uncertainty === 'HIGH' && riskTier === 'YELLOW') → add urgent watch-out instructions
```

**Layer 3 — Rule engine fallback**
AI failure → deterministic rule engine runs with `uncertainty: 'HIGH'` and disclaimer prefixed `"RULE ENGINE FALLBACK:"` so clinicians know the AI was not used.

---

## Why MedGemma-4b-it?

| Question | Answer |
|----------|--------|
| **Why not 2B?** | Tested — produced inconsistent JSON schemas and higher rule-engine fallback rate |
| **Why not 27B?** | Won't fit in 4 GB RAM on Raspberry Pi 4, the primary edge deployment target |
| **Why -it (instruction-tuned)?** | Base weights required few-shot examples for consistent JSON; `-it` follows the schema prompt reliably without them |
| **Why 4B on Kaggle?** | Fits on a T4 (16 GB VRAM) in `bfloat16` — standard Kaggle GPU. Warm inference: 15–25 s |
| **Why 4B on edge?** | Runs on Raspberry Pi 4 CPU in 60–120 s — within the 5-minute voice IVR window |
| **Why open weights?** | Deployable in air-gapped rural clinics; no API key, no data-sharing agreement required |

4B is the practical optimum: small enough for a $60 edge device, medically pre-trained enough to not need fine-tuning, instruction-tuned enough to follow a strict JSON schema.

---

## Triage Accuracy Evaluation

Every AI decision is stored in Firestore with `AiModel`, `RawResponse`, `ProcessingTimeMs`, and the final `RiskTier`. This creates a full audit trail for retrospective accuracy review.

For the Kaggle demo, the live system was validated against three scenario classes:
- **RED** — danger signs (breathing difficulty, seizure, severe bleeding) → correctly escalated in all test runs
- **YELLOW** — fever 3+ days, chest pain, elevated CRP → correctly referred in all test runs
- **GREEN** — mild cough < 24 hours, no danger signs → correctly self-care in all test runs

The rule engine provides a deterministic baseline; any divergence from AI output is logged.

---

*All code referenced above is in the public repository: https://github.com/djfuzzygh/First-Line-v3*
*Triage service: `src/services/triage.service.ts` | Kaggle server: `kaggle_server.py`*
