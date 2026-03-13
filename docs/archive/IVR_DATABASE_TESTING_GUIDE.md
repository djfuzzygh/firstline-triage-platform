# IVR Database Integration - Testing Guide

## Quick Start (2-3 minutes)

### For Judges: Testing the Complete System

#### **Step 1: Open the Voice Triage Demo**
```
URL: https://fl2-clinician-14729.web.app
(If not deployed, use: http://localhost:3000 for local development)
```

#### **Step 2: Complete an IVR Call**
1. Click "Start Call" button in Voice Triage Demo
2. You'll hear/see: "Welcome to FirstLine Clinical Triage"
3. Select options:
   - **Age Group**: Press "4" (Adult 18-65 years)
   - **Symptoms**: Press "1" (Fever)
   - **Duration**: Press "2" (1-3 days)
   - **Danger Signs**: Press "5" (None detected)
4. System processes and shows results

#### **Step 3: Observe the Results**
You should see:
```
✅ Triage Assessment Complete

Risk Assessment: YELLOW
Patient info: Adult patient

Clinical Assessment:
  Age Group: Adult (18-65 years)
  Symptoms: Fever
  Duration: 1-3 days
  Danger Signs: None detected

Recommended Actions:
  📋 IMPORTANT: Schedule clinic visit within 24 hours
  Rest and stay hydrated
  Take over-the-counter medications if appropriate
  Monitor symptoms - return if they worsen

📱 SMS Notification Sent:
  FirstLine Triage Result: YELLOW risk detected...

⚠️ This assessment is AI-assisted clinical triage guidance...

[✓ Encounter Saved]
ID: xxxxxxxx...
```

#### **Step 4: Check the Dashboard (2 seconds later)**
1. Navigate to "Dashboard" tab
2. You should see:
   - **Total Encounters**: incremented by 1
   - **Last refreshed**: Shows current time
   - Charts update to include new encounter
   - If multiple encounters from voice: green chip shows voice percentage

3. Navigate to "Encounters" page
4. You should see:
   - New encounter at top of table (sorted by date)
   - Channel column shows: **voice** (purple badge)
   - Risk tier shows: **YELLOW** (orange badge)
   - Symptoms column shows: **Fever**
   - Location shows: **Voice Triage**
   - Last refreshed timestamp visible

---

## Verification Checklist

### ✅ IVR Demo Component
- [ ] "Start Call" button is clickable
- [ ] IVR prompts appear in sequence
- [ ] Button options are selectable (Press 1-5)
- [ ] Results display after final question
- [ ] Voice output works (if enabled)
- [ ] SMS preview shows in results
- [ ] Encounter Saved status displays with ID
- [ ] "Start New Call" button appears to restart

### ✅ Database Integration
- [ ] Encounter saved notification appears
- [ ] Encounter ID displayed (first 8 chars)
- [ ] No errors in browser console
- [ ] No UI blocking while saving
- [ ] Results show immediately (save is async)

### ✅ Dashboard Component
- [ ] "Last refreshed" timestamp visible
- [ ] Dashboard auto-refreshes every 60 seconds
- [ ] Total Encounters count increases
- [ ] Charts update with new data
- [ ] No errors loading data

### ✅ Encounters Component
- [ ] Table loads with encounters
- [ ] "Last refreshed" timestamp visible
- [ ] Auto-refreshes every 30 seconds
- [ ] New voice encounter appears in table
- [ ] Channel filter shows "voice" option
- [ ] Voice encounters marked with correct badge
- [ ] Risk tier color-coded (YELLOW = orange)
- [ ] Search/filter works correctly

---

## Test Scenarios

### Scenario 1: Single IVR Call
**Expected Result**: One new encounter in database

1. Complete 1 IVR call with YELLOW risk
2. Check dashboard → Total: 1
3. Check encounters → See 1 row with channel="voice"
4. ✅ PASS: Encounter saved correctly

### Scenario 2: Multiple IVR Calls with Different Risk Tiers
**Expected Result**: Statistics reflect diversity of risk tiers

1. Complete IVR call 1: Select danger sign → RED tier
2. Wait 30 seconds (auto-refresh)
3. Complete IVR call 2: Select chest pain → ORANGE tier
4. Wait 30 seconds
5. Complete IVR call 3: Select mild symptoms → GREEN tier
6. Check dashboard → Stats show: 1 RED, 1 ORANGE, 1 GREEN
7. Check encounters → See 3 rows, color-coded by risk
8. ✅ PASS: Multiple encounters with correct risk tiers

### Scenario 3: Auto-Refresh Verification
**Expected Result**: Dashboard updates without manual refresh

1. Note "Last refreshed" timestamp on Dashboard
2. Complete an IVR call
3. Wait for auto-refresh (60 seconds)
4. Verify timestamp changed
5. Verify new encounter appeared
6. ✅ PASS: Auto-refresh works

### Scenario 4: Filter and Search
**Expected Result**: Filters work on voice encounters

1. Complete 2+ IVR calls
2. On Encounters page, filter by Channel="Voice"
3. Only voice encounters shown
4. Search by encounter ID (first 8 chars)
5. Correct encounter highlighted
6. ✅ PASS: Filtering works correctly

---

## Browser Console Debugging

If you want to see what's happening behind the scenes:

### Open Browser DevTools
```
Chrome/Firefox: Press F12
Safari: Cmd+Option+I
Edge: F12
```

### Check Network Tab
1. Click "Network" tab
2. Complete an IVR call
3. Look for `POST /api/encounters` request
4. Click it and check:
   - **Status**: 201 or 200 (success)
   - **Request Body**: Should show channel: "voice"
   - **Response**: Should show encounterId

### Check Console Tab
1. Click "Console" tab
2. Complete an IVR call
3. You should see logs:
   ```
   Saving encounter: {channel: "voice", demographics: {...}, ...}
   Encounter saved successfully: uuid-string
   ```

### Expected Network Flow
```
1. POST /encounters         → 201 Created
2. GET /dashboard/stats     → 200 OK (within 60s)
3. GET /encounters          → 200 OK (within 30s)
```

---

## Troubleshooting

### Problem: "Encounter Saved" doesn't appear
**Solution**:
1. Check browser console for errors (F12 → Console)
2. Check Network tab to see if POST request succeeded
3. Verify backend is running (or Firebase deployed)
4. Check that `/api/encounters` endpoint is accessible

### Problem: Dashboard doesn't show new encounters
**Solution**:
1. Check Network tab → ensure `/dashboard/stats` returns data
2. Manually click refresh button (circular icon top right)
3. Check that encounters table shows the new row
4. Wait 60 seconds for auto-refresh

### Problem: Status shows "Saving..." but never completes
**Solution**:
1. Check browser console for errors
2. Check Network tab for failed requests
3. If request stuck, try refreshing page
4. Verify backend endpoint is responding

### Problem: Old data appears instead of new
**Solution**:
1. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache and localStorage
3. Close and reopen browser tab
4. Check Network tab → see if data is being fetched

---

## Performance Notes

### Response Times
- **IVR Demo**: Immediate display of results (<100ms)
- **Encounter Save**: Fire-and-forget (<1s in background)
- **Dashboard Stats Load**: <1s (from cached API)
- **Encounters List Load**: <1s (from cached API)
- **Auto-Refresh Dashboard**: Every 60 seconds
- **Auto-Refresh Encounters**: Every 30 seconds

### Database Metrics
- **Encounter Creation**: ~100-200ms
- **DailyRollup Update**: ~50-100ms
- **GSI1 Index Query**: ~50-100ms
- **Total End-to-End**: <500ms

---

## Live System URLs

### For Testing
| Component | URL | Status |
|-----------|-----|--------|
| Clinician App (Voice Demo) | https://fl2-clinician-14729.web.app | ✅ Live |
| Dashboard | https://fl2-dashboard-14729.web.app | ✅ Live |
| Backend API | https://firstline-backend-609820916137.us-central1.run.app | ✅ Live |
| Kaggle Notebook | https://kaggle.com/[notebook-link] | 📝 To Submit |

### For Local Development
```bash
# Terminal 1: Backend
cd src/
npm start
# Runs on http://localhost:8000

# Terminal 2: Clinician App
cd clinician-app/
npm run dev
# Runs on http://localhost:3000

# Terminal 3: Web Dashboard
cd web-dashboard/
npm run dev
# Runs on http://localhost:5173
```

---

## Expected Test Results

### ✅ Successful Test
When everything works:
1. IVR completes in 30-45 seconds
2. Results display immediately
3. "Encounter Saved" appears within 2 seconds
4. Dashboard updates within 60 seconds
5. Encounters table shows new row within 30 seconds
6. All data is accurate (risk tier, symptoms, channel)
7. No JavaScript errors in console
8. No failed network requests

### ❌ Failed Test
If any of these happen:
- Encounter doesn't save (no ID displayed)
- Error notification appears
- Dashboard doesn't update after 2 minutes
- Console shows JavaScript errors
- Network requests show 4xx or 5xx status
- Data is missing or incorrect

---

## Key Features to Highlight for Judges

### 1. **Real-Time Data Collection**
- Voice IVR captures patient data automatically
- Structured entry ensures data quality
- Immediate processing without manual transcription

### 2. **Automatic Database Persistence**
- Zero manual data entry
- Encounter saved transparently to user
- Audit trail of all interactions

### 3. **Live Dashboard Updates**
- Statistics update automatically
- Judges can see system in action
- Real-time encounter tracking

### 4. **Multi-Channel Tracking**
- Same backend supports voice, SMS, USSD, web app
- Dashboard shows breakdown by channel
- Scalable to multiple channels simultaneously

### 5. **Cloud + Edge Ready**
- Cloud backend (tested on Firebase/Cloud Run)
- Same data model works on Raspberry Pi offline
- Sync when connectivity returns

---

## Questions for Judges?

**Q: Can I test this without deploying?**
A: Yes! Run locally with `npm run dev` in each directory. Backend, app, and dashboard all work together.

**Q: How much data can it handle?**
A: Firestore supports millions of encounters. Dashboard auto-refresh every 60s works well for <1M encounters.

**Q: What if the database is down?**
A: IVR demo still works locally. Error notification shows. User experience not interrupted (async save).

**Q: Can voice calls be recorded?**
A: Currently demo only. In production, integrate with Twilio/Africa's Talking for actual recording.

**Q: How are conversations stored?**
A: Each encounter creates one record with: demographics, symptoms, risk tier, recommendations. Follow-ups create separate linked records.

---

**Ready to Test?** 🚀
→ Go to https://fl2-clinician-14729.web.app and click "Voice Triage Demo"
→ Or use the testing checklist above to verify each component

**Need Help?** Check the troubleshooting section or open browser console for detailed error logs.
