# GitHub Repository Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create New Repository on GitHub

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name:** `firstline-triage-platform`
   - **Description:** `Multi-channel AI-powered healthcare triage platform for low-resource environments`
   - **Visibility:** Public ✅
   - **DO NOT** check "Initialize with README"
   - **DO NOT** add .gitignore or license (we already have them)
3. Click **"Create repository"**

### Step 2: Push Your Code

Open terminal in your project directory and run:

```bash
# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "feat: Complete FirstLine platform with AWS integration

- Multi-channel support (USSD, SMS, Voice, Mobile, Web)
- AWS serverless architecture (Lambda, DynamoDB, Bedrock, S3)
- Feature phone support (2G/3G networks)
- Safety-first AI with hard-coded danger signs
- Cost-optimized (\$0.024 per encounter)
- AIdeas 2026 competition materials

Built with AWS Free Tier and Kiro for social impact."

# Remove old remote
git remote remove origin

# Add new remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/firstline-triage-platform.git

# Push to new repository
git push -u origin main
```

### Step 3: Update Repository Settings

On GitHub, go to your repository settings:

1. **About section** (top right):
   - Add description
   - Add website (if you have deployed URL)
   - Add topics: `healthcare`, `aws`, `ai`, `serverless`, `social-impact`, `bedrock`, `lambda`, `feature-phones`, `2g-networks`

2. **README** should display automatically

### Step 4: Update Article

Update `docs/aideas-2026/AIDEAS_ARTICLE.md`:

Replace:
```
**GitHub:** https://github.com/YOUR_USERNAME/firstline-triage-platform
```

With:
```
**GitHub:** https://github.com/YOUR_ACTUAL_USERNAME/firstline-triage-platform
```

Then commit and push:
```bash
git add docs/aideas-2026/AIDEAS_ARTICLE.md
git commit -m "docs: Update GitHub URL in article"
git push
```

---

## Alternative: Use the Automated Script

If you prefer automation:

```bash
./PUSH_TO_NEW_REPO.sh
```

The script will:
- Guide you through creating the repository
- Stage and commit all changes
- Update the remote
- Push to the new repository

---

## Verify Everything Worked

1. Visit: `https://github.com/YOUR_USERNAME/firstline-triage-platform`
2. Check that all files are there
3. Verify README displays correctly
4. Check that docs folder is organized

---

## Troubleshooting

### "Permission denied" error

You need to authenticate with GitHub. Options:

**Option 1: Personal Access Token**
```bash
# When prompted for password, use a Personal Access Token instead
# Create one at: https://github.com/settings/tokens
```

**Option 2: SSH**
```bash
# Use SSH URL instead
git remote set-url origin git@github.com:YOUR_USERNAME/firstline-triage-platform.git
```

### "Repository not found" error

Make sure:
1. Repository name is exactly: `firstline-triage-platform`
2. Repository is created on GitHub
3. You're using the correct username

### "Failed to push" error

```bash
# Force push (only if this is a new repository)
git push -u origin main --force
```

---

## Next Steps After Push

1. ✅ Repository is live on GitHub
2. Update article with correct GitHub URL
3. Add repository topics for discoverability
4. Consider adding:
   - GitHub Actions for CI/CD
   - Issue templates
   - Contributing guidelines
   - Code of conduct

---

## Quick Reference

**Your new repository URL:**
```
https://github.com/YOUR_USERNAME/firstline-triage-platform
```

**Clone command for others:**
```bash
git clone https://github.com/YOUR_USERNAME/firstline-triage-platform.git
```

**Repository topics to add:**
- healthcare
- aws
- ai
- serverless
- social-impact
- bedrock
- lambda
- dynamodb
- feature-phones
- 2g-networks
- ussd
- sms
- voice-calls
- aideas-2026

---

**Ready to submit to AIdeas 2026!** 🚀
