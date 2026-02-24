# FirstLine 2.0 - Demo Video Recording Script
## For Kaggle MedGemma Impact Challenge

**Total Runtime:** 3 minutes
**Format:** 1080p MP4
**Tools:** QuickTime (Mac) / OBS (Windows) / ScreenFlow / Loom

---

## Pre-Recording Checklist

- [ ] Open browser to: https://fl2-clinician-14729.web.app
- [ ] Clear browser cache/zoom at 100%
- [ ] Close other tabs and notifications
- [ ] Ensure stable internet connection
- [ ] Test audio (narration + system sounds)
- [ ] Set recording to 1080p resolution
- [ ] Have a script nearby to read from

---

## Scene 1: Introduction & Problem Statement (0:30)

**[NARRATION]**
"FirstLine 2.0 solves a critical problem: 400 million people in low-resource settings lack access to timely medical triage. In rural clinics across Africa and South Asia, patients wait hours without systematic severity assessment.

The barrier isn't clinical expertise—it's accessibility. Most people don't have smartphones or reliable internet.

FirstLine brings AI-powered triage to every phone: smartphones, feature phones, and basic voice calls."

**[SCREEN ACTIONS]**
- Start with a solid color slide or title card (optional)
- Show a 5-second pause with text overlay: "FirstLine 2.0: AI Triage for Every Phone"
- **Duration: 0:30**

---

## Scene 2: Voice IVR Demo Walkthrough (1:30)

### 2A: Open the App (0:10)
**[NARRATION]**
"Watch this live demo of our toll-free voice triage system. A patient calls a number and gets AI assessment instantly."

**[SCREEN ACTIONS]**
1. Navigate to: https://fl2-clinician-14729.web.app
2. Wait for page to load
3. Scroll down to find the "FirstLine Voice Triage Demo" card
4. **Duration: 0:10**

### 2B: Start a Call (0:15)
**[NARRATION]**
"The patient starts a call. The IVR system greets them with a menu of options."

**[SCREEN ACTIONS]**
1. Click the blue "Demo Voice Triage" button (or "Start Call" if already on page)
2. The call interface appears showing "Call Ready"
3. Click the green "Start Call" button
4. Call status changes to "Call Active - 0:XX"
5. Welcome message appears: "Welcome to FirstLine Clinical Triage. Press 1 for New Triage Assessment."
6. **Wait for 2 seconds to show the welcome screen**
7. **Duration: 0:15**

### 2C: Navigate Menu & Select Symptoms (1:05)
**[NARRATION]**
"The system asks a series of structured questions. First, patient age group."

**[SCREEN ACTIONS]**
1. **CLICK: "2 - Child (3-12 years)"** - Button should be visible below welcome message
2. Wait 1 second for transition
3. New prompt appears: "What are the main symptoms?"
4. **CLICK: "1 - Fever"**
5. Wait 1 second for transition
6. New prompt appears: "How long have you had these symptoms?"
7. **CLICK: "2 - 1-3 days"**
8. Wait 1 second for transition
9. New prompt appears: "Any danger signs?"
10. **CLICK: "5 - None of the above"** (this triggers the triage)
11. Progress bar fills to 100%
12. System shows "Analyzing triage data..." message
13. **Duration: 1:05**

### 2D: Show Results (0:10)
**[NARRATION]**
"The AI processes the symptoms and produces a triage decision: ORANGE risk level—moderate priority requiring a clinician visit within 2 hours."

**[SCREEN ACTIONS]**
1. Results appear on screen showing:
   - Risk tier: ORANGE (color-coded)
   - Patient summary (symptoms, duration)
   - Recommendations (bulleted list)
   - SMS notification alert: "SMS with results sent to caller's phone"
2. **Pause for 3 seconds to let user read**
3. Scroll down slightly to show full recommendations
4. **Duration: 0:10**

---

## Scene 3: Key Innovation Explanation (0:45)

### 3A: Cost & Impact (0:30)
**[NARRATION]**
"Here's what makes FirstLine transformative:

First, cost. A specialist consultation costs $50 to $200. FirstLine triage costs just two cents.

Second, accessibility. No internet required. Works on any phone—smartphone, feature phone, even old phones with just voice capability.

Third, speed. Assessment takes 5 minutes. In rural clinics, that's transformative.

And fourth, it's deployed right now on Google Cloud Platform and running MedGemma-4b-it. This isn't a prototype—it's production-ready."

**[SCREEN ACTIONS]**
1. Keep results screen visible (or navigate to Dashboard at https://fl2-dashboard-14729.web.app to show analytics)
2. Optional: Show the dashboard with encounter tracking and analytics
3. Or overlay text/graphics showing:
   - Cost comparison: $0.02 vs $50-200
   - "Works offline on Raspberry Pi"
   - "No internet required"
   - "Deployed on GCP"
4. **Duration: 0:30**

### 3B: Multi-Channel Design (0:15)
**[NARRATION]**
"FirstLine reaches patients through multiple channels:

- Voice for anyone with a phone
- SMS/USSD for feature phones
- Web app for clinicians to review detailed cases
- Offline mode on Raspberry Pi for complete resiliency"

**[SCREEN ACTIONS]**
1. Show the clinician app interface briefly
2. Optional: Show a diagram or text overlay of the four channels
3. **Duration: 0:15**

---

## Scene 4: Closing Statement (0:15)

**[NARRATION]**
"FirstLine 2.0 demonstrates that AI can be accessible, affordable, and effective in low-resource healthcare settings.

By bringing triage to toll-free phone calls, we remove the biggest barrier to healthcare: access itself.

Every phone becomes a triage device. Every patient gets expert-level assessment, instantly."

**[SCREEN ACTIONS]**
1. Return to home screen or show a closing slide
2. Optional: Display text:
   - "Try it live: https://fl2-clinician-14729.web.app"
   - "GitHub: https://github.com/djfuzzygh/First-Line-v3"
   - "Built with MedGemma-4b-it"
3. **Duration: 0:15**

---

## Recording Tips

### Audio & Narration
- **Speak clearly and slowly** (record in quiet room)
- **Avoid jargon** where possible
- **Use confident tone** — you're demonstrating innovation
- **Record separately** if narration over UI is difficult
  - Record narration separately, sync in post-production
  - Or speak live while demonstrating

### Screen Recording Settings
- **Resolution:** 1920x1080 (1080p)
- **Frame rate:** 30 fps (or 60 fps for smoother)
- **Browser zoom:** 100% (so UI is readable)
- **Sound:** Capture both system audio + microphone

### Demo Rhythm
- **Slow clicks:** Give viewers time to read
- **Pause on results:** Let the triage decision sink in
- **Point & explain:** Use cursor to highlight key elements

### If Something Goes Wrong
- **Reload page** if app doesn't respond
- **Restart call** if demo gets stuck
- **Edit clips together** — doesn't need to be one continuous take
- **Re-record scenes** that don't work

---

## Post-Recording: Editing Checklist

- [ ] Trim beginning/end silence
- [ ] Add opening title card (optional): "FirstLine 2.0 Voice Triage Demo"
- [ ] Check audio levels (clear, not too loud)
- [ ] Add captions/subtitles (optional but recommended)
- [ ] Add timestamps to narration (optional)
- [ ] Export as MP4 (H.264 codec)
- [ ] Keep file size <5MB (compress if needed)
- [ ] Final check: watch entire video

---

## Upload Instructions

1. **Export as MP4** (H.264, 1080p)
2. **Test file** in video player to ensure quality
3. **Upload to YouTube:**
   - Go to https://youtube.com/studio
   - Click "Create" → "Upload video"
   - Select your MP4 file
   - Title: "FirstLine 2.0 - Voice Triage Demo"
   - Description: [See section below]
   - Visibility: **UNLISTED** (not private, not public)
   - Copy the video URL (e.g., `https://youtu.be/xxxxxxxxxx`)

### YouTube Description Template
```
FirstLine 2.0: AI-Powered Clinical Triage for Low-Resource Settings

This demo shows our toll-free voice triage system in action. A patient calls
a number, answers structured questions about symptoms, and receives an
AI-powered triage assessment in 5 minutes.

Key Innovation:
- Works on any phone (no smartphone needed)
- Cost: $0.02 per patient vs $50-200 specialist
- Deployed on GCP with MedGemma-4b-it
- Offline-capable on Raspberry Pi

Try it live: https://fl2-clinician-14729.web.app
GitHub: https://github.com/djfuzzygh/First-Line-v3

Submitted to Kaggle MedGemma Impact Challenge
```

---

## Timeline

| Step | Duration | Total Time |
|------|----------|-----------|
| Scene 1: Intro | 0:30 | 0:30 |
| Scene 2A: Open app | 0:10 | 0:40 |
| Scene 2B: Start call | 0:15 | 0:55 |
| Scene 2C: Menu nav | 1:05 | 2:00 |
| Scene 2D: Results | 0:10 | 2:10 |
| Scene 3A: Cost | 0:30 | 2:40 |
| Scene 3B: Channels | 0:15 | 2:55 |
| Scene 4: Closing | 0:15 | 3:10 |
| **TOTAL** | | **~3:10** |

---

## Quick Reference Checklist

**Before Recording:**
- [ ] Test app is responsive
- [ ] Click through demo once to ensure flow
- [ ] Write down the script
- [ ] Set up recording tool
- [ ] Quiet environment, good lighting

**During Recording:**
- [ ] Narrate clearly
- [ ] Click slowly (give viewers time to read)
- [ ] Pause on important screens
- [ ] Keep cursor visible during clicks

**After Recording:**
- [ ] Watch entire video
- [ ] Check audio quality
- [ ] Verify click sounds are audible
- [ ] Trim excess silence

**Upload:**
- [ ] Export MP4, <5MB
- [ ] Upload to YouTube (Unlisted)
- [ ] Copy public link
- [ ] Add to Kaggle writeup
- [ ] Test the link works

---

## Expected System Behavior

During the demo, expect:
- ✅ Page loads in <2 seconds
- ✅ Buttons respond immediately to clicks
- ✅ Progress bar advances smoothly
- ✅ Results display within 1 second of final answer
- ✅ Call timer increments every second
- ✅ All text is readable at 1080p

If something seems slow or unresponsive:
- Refresh the page
- Check internet connection
- Try a different browser
- Record that scene again

---

**You've got this!** The system is live, tested, and ready. Just record and submit. 🎉
