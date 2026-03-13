# FirstLine AIdeas 2026 - Quick Start Guide

## ⏰ URGENT: Deadline TODAY - March 13, 2026, 8:00 PM UTC

---

## 🚀 5-Step Quick Start (2-3 hours)

### Step 1: Deploy AWS Infrastructure (30 min)

```bash
# 1. Redeem AWS credits
# Code: PCOYZN97BLZAD4
# URL: https://aws.amazon.com/premiumsupport/knowledge-center/redeem-aws-promotional-credit/

# 2. Configure AWS CLI
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Region: us-east-1
# Output format: json

# 3. Run deployment script
chmod +x AWS_DEPLOYMENT_SCRIPT.sh
./AWS_DEPLOYMENT_SCRIPT.sh

# 4. Note the API URL from output
# Example: https://abc123.execute-api.us-east-1.amazonaws.com/v1/
```

**Expected Output:**
- ✅ CDK stack deployed
- ✅ API Gateway URL
- ✅ DynamoDB table created
- ✅ Lambda functions deployed
- ✅ Health check passes

---

### Step 2: Test Deployment (15 min)

```bash
# Set your API URL
export API_URL="https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1"

# Test health endpoint
curl $API_URL/health

# Create test user
curl -X POST $API_URL/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@firstline.health",
    "password": "Test123!",
    "name": "Test User",
    "role": "clinician"
  }'

# Login
curl -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@firstline.health",
    "password": "Test123!"
  }'

# Save the token from response
export TOKEN="your-jwt-token-here"

# Create encounter
curl -X POST $API_URL/encounters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "demographics": {
      "age": 35,
      "sex": "F",
      "location": "Accra, Ghana"
    },
    "symptoms": "Fever, cough, difficulty breathing",
    "channel": "app"
  }'
```

**Expected Results:**
- ✅ Health returns 200
- ✅ User created successfully
- ✅ Login returns JWT token
- ✅ Encounter created with ID

---

### Step 3: Record Demo Video (45 min)

**Script:** See DEMO_VIDEO_GUIDE.md

**Quick Recording Steps:**
1. Open screen recording software (QuickTime/OBS)
2. Open clinician app in browser
3. Follow script from DEMO_VIDEO_GUIDE.md
4. Record 4-5 minute demo
5. Upload to YouTube
6. Set title: "FirstLine Healthcare Triage Platform - AIdeas 2026 Demo"
7. Copy YouTube URL

**Key Scenes to Capture:**
- Patient intake form
- AI triage in action
- Results display
- Referral generation
- Dashboard statistics
- Voice IVR demo

---

### Step 4: Capture Screenshots (20 min)

**Required Screenshots (1920x1080, PNG):**

1. **Patient Intake:** New encounter form filled out
2. **Triage Results:** AI assessment with risk tier
3. **Dashboard:** Statistics and charts
4. **Voice IVR:** Phone interface with results
5. **Referral:** Generated PDF document
6. **Admin:** Configuration interface

**Quick Capture:**
```bash
# Mac
Cmd + Shift + 4 (select area)

# Windows
Windows + Shift + S

# Linux
gnome-screenshot -a
```

---

### Step 5: Publish Article (30 min)

**Steps:**
1. Go to https://community.aws/builderideas
2. Click "Create Article" or "New Post"
3. Copy content from AIDEAS_ARTICLE.md
4. Update placeholders:
   - Replace [Your CloudFront URL] with actual URLs
   - Replace [Your API Gateway URL] with actual URL
   - Add YouTube embed code
5. Upload cover image (1200x630px)
6. Upload all 6 screenshots
7. Add tags: #aideas-2025 #social-impact #NAMER
8. Preview article
9. Click "Publish"

---

## 📋 Pre-Flight Checklist

Before publishing, verify:

- [ ] AWS deployed and tested
- [ ] Demo video uploaded to YouTube
- [ ] All 6 screenshots captured
- [ ] Cover image created
- [ ] Article placeholders replaced
- [ ] Tags added correctly
- [ ] Profile updated
- [ ] Links tested

---

## 🆘 Emergency Troubleshooting

### AWS Deployment Fails

```bash
# Check credentials
aws sts get-caller-identity

# Check Bedrock access
aws bedrock list-foundation-models --region us-east-1

# Re-bootstrap CDK
cd infrastructure
npx cdk bootstrap aws://ACCOUNT_ID/us-east-1

# Try manual deploy
npx cdk deploy FirstLineStack-dev --require-approval never
```

### Can't Access Bedrock

**Solution:** Request model access in AWS Console
1. Go to AWS Console → Bedrock
2. Click "Model access"
3. Request access to Claude models
4. Wait 5-10 minutes for approval

### Video Won't Upload

**Alternative:** Use Vimeo or Loom
- Upload to alternative platform
- Get embed code
- Use in article

---

## 💰 Credits to Redeem

### AWS Credits
- **Code:** PCOYZN97BLZAD4
- **Value:** $200
- **URL:** https://aws.amazon.com/premiumsupport/knowledge-center/redeem-aws-promotional-credit/

### Kiro Credits
- **URL:** https://kiro.dev/redeem/aideas2026-8e92be46ef0b
- **Value:** Kiro Pro+ subscription
- **Use:** AI-assisted development

---

## 📞 Support Contacts

- **AWS Support:** https://support.aws.amazon.com/
- **Kiro Support:** https://support.aws.amazon.com/#/contacts/kiro
- **Competition:** https://community.aws/builderideas

---

## ⏱️ Time Estimate

| Task | Time | Priority |
|------|------|----------|
| Deploy AWS | 30 min | CRITICAL |
| Test deployment | 15 min | CRITICAL |
| Record video | 45 min | CRITICAL |
| Capture screenshots | 20 min | HIGH |
| Publish article | 30 min | CRITICAL |
| **TOTAL** | **2h 20min** | |

---

## 🎯 Success Criteria

**Minimum Viable Submission:**
- ✅ AWS infrastructure deployed
- ✅ Article published with all required sections
- ✅ Demo video embedded
- ✅ At least 3 screenshots
- ✅ Tags added correctly

**Ideal Submission:**
- ✅ All of above
- ✅ All 6 screenshots
- ✅ Professional cover image
- ✅ Polished demo video
- ✅ Updated profile
- ✅ Shared on social media

---

## 🚀 Ready to Launch!

**Current Status:**
- [ ] AWS deployed
- [ ] Video recorded
- [ ] Screenshots captured
- [ ] Article ready
- [ ] Published

**Next Action:** Run `./AWS_DEPLOYMENT_SCRIPT.sh`

**Deadline:** March 13, 2026, 8:00 PM UTC

**You've got this! Let's save lives with AI-powered healthcare! 🏥💙**
