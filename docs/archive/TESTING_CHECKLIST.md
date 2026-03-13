# ✅ Testing Checklist - FirstLine 2.0 Deployment

## Server Status

✅ **Backend Server**
- Running at: `http://localhost:8080`
- Status: Healthy
- Provider: Hugging Face (HF_MODEL_ID=google/medgemma-4b-it)
- Database: In-memory Firestore mode

✅ **Clinician App**
- Running at: `http://localhost:3001`
- Framework: Vite + React
- Status: Responsive

---

## Testing Steps

### Step 1: Access the App
1. Open browser
2. Go to: **http://localhost:3001**
3. You should see login page

### Step 2: Login
- Email: `test@example.com`
- Password: `test123`
- Should redirect to home page

### Step 3: Find Voice IVR Demo
1. On home page, scroll down
2. Look for card with **phone icon** labeled "Voice IVR Demo"
3. Read description: "Try the interactive voice triage system..."
4. Button text: "Demo Voice Triage"

### Step 4: Test IVR Demo
1. Click "Demo Voice Triage" button
2. Should navigate to `/voice-ivr` page
3. You'll see:
   - "FirstLine Voice Triage Demo" title
   - "Call Active - 0:00" indicator
   - "Start Call" button (large, blue)

### Step 5: Interact with Voice Menu
1. Click "Start Call" button
2. You'll see IVR prompt: "📞 Welcome to FirstLine Clinical Triage..."
3. Menu options appear:
   - "Press 1 for New Triage Assessment"
   - etc.
4. Click buttons in sequence (press 1, 2, 3, etc.)
5. System progresses through flow:
   - Age group selection
   - Symptoms selection
   - Duration
   - Danger signs check
   - Processing...
   - Results display

### Step 6: Verify Results Display
When triage completes, you should see:
- ✓ Risk tier (RED/ORANGE/YELLOW/GREEN)
- ✓ Assessment summary (age, symptoms, duration)
- ✓ Recommended actions
- ✓ SMS notification alert
- ✓ Call stats (duration)

---

## What to Record

### Scene 1: Clinician App (1:00)
1. Go to home page
2. Click "New Patient" card
3. Fill in:
   - Age: 35
   - Sex: Female
   - Symptoms: "Fever and cough for 3 days"
4. Enter lab results:
   - Temperature: 38.5°C
   - WBC: 7.2
5. Click "Run Simulation"
6. Show triage results appearing inline
7. Pause and let results display fully

### Scene 2: Follow-up Questions (0:30)
1. Show follow-up questions section
2. Answer a few questions
3. Click "Resubmit with Follow-up Answers"
4. Show refined assessment

### Scene 3: Voice IVR Demo (1:00) ⭐ MAIN SCENE
1. Navigate to home page
2. Click "Demo Voice Triage" card
3. Click "Start Call"
4. **Interact with 3-4 menu options slowly:**
   - Press 1 (for triage)
   - Press 4 (for adult)
   - Press 1 (for fever)
   - Press 2 (for 1-3 days)
   - Press 5 (no danger signs)
5. Let it process and show results
6. Point out:
   - "No app needed"
   - "Works on any phone"
   - "SMS backup included"

### Scene 4: Summary (0:30)
1. Show feature highlights
2. Mention: "Toll-free number in production"
3. Mention: "Offline on Raspberry Pi"
4. End with impact statement

---

## Troubleshooting

### Issue: Can't connect to http://localhost:3001

**Solution:**
- Make sure app is running: check for "Local: http://localhost:3001" in terminal
- If not running, execute: `cd clinician-app && npm run dev`
- Wait 5-10 seconds for Vite to compile

### Issue: Login doesn't work

**Solution:**
- Backend might still be initializing
- Try refreshing page (F5)
- Check backend is running: http://localhost:8080/health
- Test credentials: `test@example.com` / `test123`

### Issue: IVR Demo button not showing

**Solution:**
- Make sure you're logged in
- Try navigating directly to: http://localhost:3001/voice-ivr
- Check browser console (F12) for errors

### Issue: IVR Menu options don't respond

**Solution:**
- The demo is client-side only (no backend call needed)
- Click buttons slowly and let animations complete
- Check that you can see "Question X of 5" progress bar

### Issue: Results not displaying

**Solution:**
- Let the processing animation complete (should show progress bar)
- Results appear after 1-2 seconds
- If stuck, try refreshing the page and starting over

---

## Performance Notes

✅ Backend Health: All systems healthy
✅ Firestore: Running in in-memory mode (for testing)
✅ AI Provider: Hugging Face (MedGemma-4b-it)
✅ Triage Engine: Ready
✅ Frontend: Responsive and fast

---

## Recording Tips

📹 **Before Recording:**
- [ ] Close all other browser tabs
- [ ] Close notifications
- [ ] Set zoom to 130% for visibility
- [ ] Test audio (use USB mic if possible)
- [ ] Do one full run-through first

📹 **While Recording:**
- [ ] Type slowly (30 WPM)
- [ ] Pause 2 seconds after each action
- [ ] Let animations/results display fully
- [ ] Speak clearly for voice-over
- [ ] Point out key features as you go

📹 **Recording Settings:**
- Resolution: 1280x800 or higher
- Frame rate: 30 fps
- Format: MP4
- Duration: Exactly 3 minutes

---

## Next: Upload & Submit

1. **Export video as MP4**
2. **Upload to YouTube (unlisted)**
3. **Get shareable link**
4. **Update KAGGLE_WRITEUP_CONDENSED.md with link**
5. **Commit and push to GitHub**
6. **Submit to Kaggle**

---

## Time Estimate

- Setup & testing: 10 min
- Full run-through (practice): 10 min
- Actual recording (with retakes): 30-45 min
- Upload & submit: 20 min
- **Total time: ~1.5-2 hours**

---

**Status:** ✅ All systems operational and ready for recording

**Next action:** Open http://localhost:3001 and start testing!
