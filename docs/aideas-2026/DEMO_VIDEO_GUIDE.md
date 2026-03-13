# FirstLine Demo Video Script & Screenshot Guide

## Video Requirements
- **Duration:** Under 5 minutes
- **Format:** MP4, 1080p recommended
- **Platform:** YouTube (unlisted or public)
- **Embed:** Use YouTube embed in article

---

## Video Script (4:30 duration)

### Opening (0:00 - 0:30)

**[Screen: Title slide with FirstLine logo]**

"Hi, I'm Isaac Fuseini, and this is FirstLine—a multi-channel AI-powered healthcare triage platform designed for low-resource environments.

In Sub-Saharan Africa, over 400 million people lack timely access to medical triage. FirstLine solves this by providing AI-powered medical guidance through smartphones, voice calls, SMS, and even basic feature phones."

**[Transition to architecture diagram]**

---

### System Overview (0:30 - 1:00)

**[Screen: Architecture diagram]**

"FirstLine is built entirely on AWS Free Tier services:
- AWS Lambda for serverless compute
- DynamoDB for patient data
- Amazon Bedrock for AI-powered triage
- API Gateway for multi-channel access
- S3 for document storage

The system costs less than 3 cents per patient encounter, making it sustainable for resource-constrained settings."

**[Transition to live demo]**

---

### Demo Part 1: Web Application (1:00 - 2:30)

**[Screen: Open clinician app in browser]**

"Let me show you how it works. This is the clinician web application."

**[Click "New Patient Encounter"]**

"A healthcare worker creates a new patient encounter..."

**[Fill in form while narrating]**
- Age: 35
- Sex: Female
- Location: Accra, Ghana
- Symptoms: "Fever, cough, and difficulty breathing for 3 days"

**[Add vital signs]**
- Temperature: 39.2°C
- Heart Rate: 110 bpm
- Respiratory Rate: 24

**[Click "Run AI Triage Assessment"]**

"When we click 'Run AI Triage Assessment', the system sends this to AWS Bedrock..."

**[Wait for results - show loading state]**

"...and within 2-3 seconds, we get a comprehensive triage result."

**[Show results]**

"The AI has assigned a YELLOW tier—meaning this patient needs medical attention within hours, not days.

It provides:
- Differential diagnoses with confidence scores
- Danger signs to watch for
- Recommended next steps
- Follow-up questions for more information"

**[Scroll through results]**

---

### Demo Part 2: Referral Generation (2:30 - 3:00)

**[Click "Generate Referral"]**

"If this patient needs to be referred to a hospital, we can generate a professional SOAP note..."

**[Select hospital from dropdown]**
**[Click "Generate and Download"]**

"...which creates a PDF document with all the clinical information formatted for the receiving physician."

**[Show PDF briefly]**

---

### Demo Part 3: Dashboard (3:00 - 3:30)

**[Navigate to Dashboard]**

"The admin dashboard shows real-time statistics:
- Total encounters across all channels
- Distribution by risk tier
- Top symptoms
- Channel usage"

**[Show statistics updating]**

"Healthcare administrators can monitor system usage and identify trends—like an uptick in respiratory symptoms that might indicate an outbreak."

---

### Demo Part 4: Voice IVR (3:30 - 4:00)

**[Open Voice IVR Demo]**

"But not everyone has a smartphone. FirstLine also works through voice calls."

**[Click through IVR demo]**
- Select age group
- Select symptoms
- Select duration
- Answer danger sign questions

**[Show triage result]**

"The same AI-powered triage, accessible through any phone—even a basic feature phone from 20 years ago."

---

### Closing (4:00 - 4:30)

**[Screen: Return to architecture or summary slide]**

"FirstLine demonstrates that AI-powered healthcare can be:
- Accessible to everyone, regardless of device
- Affordable at less than 3 cents per encounter
- Safe with multiple safety layers
- Scalable using AWS serverless architecture

Built entirely with AWS Free Tier and accelerated by Kiro AI assistance, FirstLine is ready to deploy in rural clinics across Africa.

Thank you for watching. The code is open source on GitHub, and I'm seeking partnerships to pilot this in 50 clinics across Ghana, Nigeria, and Kenya.

Let's democratize healthcare access together."

**[End screen with links]**
- GitHub: github.com/YOUR_USERNAME/firstline
- Demo: [Your CloudFront URL]
- Contact: [Your email]

---

## Screenshot Guide

### Required Screenshots for Article

#### 1. Mobile App - Patient Intake
**Filename:** `screenshot-1-patient-intake.png`

**What to capture:**
- New Patient Encounter form
- Fields filled in with sample data
- Clean, professional interface
- Mobile-responsive design visible

**How to capture:**
- Open clinician app
- Navigate to "New Patient Encounter"
- Fill in sample data (don't submit yet)
- Take screenshot (Cmd+Shift+4 on Mac)
- Crop to show just the form area

---

#### 2. Triage Results Display
**Filename:** `screenshot-2-triage-results.png`

**What to capture:**
- Complete triage results
- Risk tier badge (YELLOW or RED for impact)
- Diagnosis suggestions with confidence
- Danger signs section
- Recommended next steps

**How to capture:**
- Complete a triage assessment
- Wait for results to load
- Scroll to show all sections
- Take full-page screenshot
- Highlight key elements (risk tier, diagnoses)

---

#### 3. Clinician Dashboard
**Filename:** `screenshot-3-dashboard.png`

**What to capture:**
- Statistics cards (total encounters, by channel, by tier)
- Charts showing distribution
- Recent encounters table
- Clean, professional layout

**How to capture:**
- Navigate to Dashboard
- Ensure some test data exists
- Take screenshot of full dashboard
- Show real-time data

---

#### 4. Voice IVR Demo
**Filename:** `screenshot-4-voice-ivr.png`

**What to capture:**
- IVR interface with phone mockup
- Voice prompts visible
- Triage result displayed
- "Encounter Saved" confirmation

**How to capture:**
- Open Voice Triage Demo
- Complete a full flow
- Show final result screen
- Include phone mockup for context

---

#### 5. Referral Document
**Filename:** `screenshot-5-referral-pdf.png`

**What to capture:**
- Generated SOAP note PDF
- Professional medical document format
- Patient information
- Clinical assessment
- Recommendations

**How to capture:**
- Generate a referral document
- Open PDF in viewer
- Take screenshot of first page
- Show professional formatting

---

#### 6. Admin Configuration
**Filename:** `screenshot-6-admin-config.png`

**What to capture:**
- System configuration interface
- AI provider settings
- Health monitoring
- Professional admin UI

**How to capture:**
- Navigate to Admin section
- Show configuration options
- Demonstrate system control
- Clean, organized layout

---

## Screenshot Best Practices

### Technical Requirements
- **Resolution:** 1920x1080 or higher
- **Format:** PNG (for clarity)
- **File size:** Under 2MB each
- **Aspect ratio:** 16:9 preferred

### Visual Guidelines
- Use sample data (no real patient information)
- Ensure good contrast and readability
- Crop to remove unnecessary browser chrome
- Highlight key features with subtle annotations
- Use consistent styling across screenshots

### Sample Data to Use
- **Patient Name:** "Jane Doe" or "Test Patient"
- **Age:** 25-45 (adult range)
- **Symptoms:** Common, recognizable conditions
- **Location:** "Accra, Ghana" or "Lagos, Nigeria"
- **Dates:** Recent but not today (shows system has history)

---

## Video Recording Tips

### Software Recommendations
- **Mac:** QuickTime Screen Recording or ScreenFlow
- **Windows:** OBS Studio or Camtasia
- **Linux:** SimpleScreenRecorder or OBS Studio

### Recording Settings
- **Resolution:** 1920x1080
- **Frame rate:** 30fps
- **Audio:** Clear microphone, minimal background noise
- **Cursor:** Show cursor, enable click highlights

### Editing Tips
- Add subtle transitions between sections
- Include text overlays for key points
- Speed up loading/waiting times (1.5-2x)
- Add background music (low volume, non-distracting)
- Include captions for accessibility

### YouTube Upload
- **Title:** "FirstLine Healthcare Triage Platform - AIdeas 2026 Demo"
- **Description:** Include links to GitHub, article, and AWS Builder Center
- **Tags:** AWS, healthcare, AI, triage, social impact, AIdeas2026
- **Thumbnail:** Custom thumbnail with FirstLine logo and "AI Healthcare Triage"

---

## Post-Production Checklist

- [ ] Video is under 5 minutes
- [ ] Audio is clear and professional
- [ ] All key features demonstrated
- [ ] No sensitive/real patient data shown
- [ ] Transitions are smooth
- [ ] Text overlays are readable
- [ ] Uploaded to YouTube
- [ ] YouTube link tested in article embed
- [ ] All 6 screenshots captured
- [ ] Screenshots are high quality
- [ ] Screenshots uploaded to article
- [ ] Cover image created and uploaded
- [ ] Article preview looks professional

---

## Cover Image Specifications

**Requirements:**
- **Dimensions:** 1200x630px (optimal for social sharing)
- **Format:** PNG or JPG
- **File size:** Under 1MB
- **Content:** FirstLine logo + tagline + visual element

**Design Elements:**
- FirstLine logo (prominent)
- Tagline: "AI-Powered Healthcare for Everyone"
- Visual: Phone + stethoscope + AI icon
- Color scheme: Medical blue/green + AWS orange
- Professional, clean design

**Tools:**
- Canva (free templates)
- Figma (design from scratch)
- Adobe Photoshop (professional)

---

## Final Submission Checklist

### Article Content
- [ ] Title: "AIdeas: FirstLine Healthcare Triage Platform"
- [ ] All required sections included
- [ ] Cover image uploaded
- [ ] Screenshots embedded
- [ ] Video embedded
- [ ] Links tested
- [ ] Tags added: #aideas-2025 #social-impact #NAMER

### Technical Verification
- [ ] AWS deployment complete
- [ ] API endpoints accessible
- [ ] Frontends deployed
- [ ] Demo data populated
- [ ] All features working

### Submission
- [ ] Article published on AWS Builder Center
- [ ] Profile updated
- [ ] Shared on social media
- [ ] Monitoring likes/engagement
- [ ] Ready for community voting

---

**Good luck with your submission! 🚀**
