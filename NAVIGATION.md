# 🧭 FirstLine Repository Navigation Guide

Quick reference for finding what you need in this repository.

## 🚀 I Want To...

### Deploy for AIdeas 2026 Competition
→ **[docs/aideas-2026/QUICK_START_AIDEAS.md](docs/aideas-2026/QUICK_START_AIDEAS.md)**

### Understand the System Architecture
→ **[docs/SYSTEM_OVERVIEW.md](docs/SYSTEM_OVERVIEW.md)**

### Deploy to AWS
→ **[docs/aideas-2026/AWS_DEPLOYMENT_SCRIPT.sh](docs/aideas-2026/AWS_DEPLOYMENT_SCRIPT.sh)**

### Migrate from GCP to AWS
→ **[docs/aideas-2026/AWS_MIGRATION_GUIDE.md](docs/aideas-2026/AWS_MIGRATION_GUIDE.md)**

### Set Up Voice/IVR System
→ **[docs/VOICE_IMPLEMENTATION_GUIDE.md](docs/VOICE_IMPLEMENTATION_GUIDE.md)**

### Configure 3CX Integration
→ **[docs/3CX_SETUP_GUIDE.md](docs/3CX_SETUP_GUIDE.md)**

### Develop Frontend Applications
→ **[docs/FRONTEND_README.md](docs/FRONTEND_README.md)**

### Find Historical Documentation
→ **[docs/archive/](docs/archive/)**

### See Kaggle Competition Materials
→ **[docs/archive/KAGGLE_WRITEUP_FINAL.md](docs/archive/KAGGLE_WRITEUP_FINAL.md)**

## 📁 Directory Structure

```
FirstLine/
│
├── 📄 README.md                    # Start here - main documentation
├── 📄 NAVIGATION.md                # This file - quick navigation
├── 📄 CLEANUP_SUMMARY.md           # Repository cleanup details
│
├── 📂 src/                         # Backend source code
│   ├── handlers/                   # Lambda function handlers
│   ├── services/                   # Business logic
│   ├── models/                     # TypeScript interfaces
│   └── utils/                      # Utility functions
│
├── 📂 infrastructure/              # AWS CDK infrastructure
│   ├── lib/                        # Stack definitions
│   └── bin/                        # CDK app entry
│
├── 📂 clinician-app/              # React clinician web app
├── 📂 web-dashboard/              # React admin dashboard
├── 📂 mobile-app/                 # React Native mobile app
│
├── 📂 docs/                        # Documentation hub
│   ├── 📂 aideas-2026/            # AIdeas competition materials
│   │   ├── README.md              # Competition quick start
│   │   ├── AIDEAS_ARTICLE.md      # Full article
│   │   ├── AWS_DEPLOYMENT_SCRIPT.sh
│   │   └── ...
│   │
│   ├── 📂 archive/                # Historical documentation
│   │   ├── README.md              # Archive guide
│   │   └── ...
│   │
│   └── 📄 *.md                    # Technical guides
│
├── 📂 kaggle/                     # Kaggle competition code
├── 📂 scripts/                    # Deployment scripts
└── 📂 simulators/                 # Demo simulators
```

## 🎯 Common Tasks

### Local Development
```bash
# Install dependencies
npm install

# Build backend
npm run build

# Run tests
npm test

# Start local server
npm start

# Start frontend (clinician app)
cd clinician-app && npm run dev

# Start frontend (dashboard)
cd web-dashboard && npm run dev
```

### AWS Deployment
```bash
# Quick deploy (automated)
./docs/aideas-2026/AWS_DEPLOYMENT_SCRIPT.sh

# Manual deploy
cd infrastructure
npx cdk deploy FirstLineStack-dev
```

### Testing
```bash
# All tests
npm test

# With coverage
npm run test:coverage

# Property-based tests
npm run test:properties

# Watch mode
npm run test:watch
```

## 📚 Documentation Categories

### Competition Materials
- **Location:** `docs/aideas-2026/`
- **Purpose:** AIdeas 2026 submission
- **Key Files:**
  - Article for AWS Builder Center
  - Deployment scripts
  - Demo video guide
  - Submission checklist

### Technical Guides
- **Location:** `docs/`
- **Purpose:** System setup and configuration
- **Topics:**
  - System architecture
  - Voice/IVR implementation
  - Frontend development
  - Deployment guides
  - Integration guides

### Historical Documentation
- **Location:** `docs/archive/`
- **Purpose:** Reference and history
- **Contents:**
  - Previous competition submissions
  - Old deployment guides
  - Implementation notes
  - Testing procedures

### Code Documentation
- **Location:** `src/`, `clinician-app/`, etc.
- **Purpose:** In-code documentation
- **Format:** JSDoc comments, TypeScript types

## 🔗 External Links

### Competition
- **AIdeas 2026:** https://community.aws/builderideas
- **AWS Builder Center:** https://community.aws/

### AWS Resources
- **AWS Free Tier:** https://aws.amazon.com/free/
- **AWS Bedrock:** https://aws.amazon.com/bedrock/
- **AWS CDK:** https://aws.amazon.com/cdk/

### Support
- **AWS Support:** https://support.aws.amazon.com/
- **Kiro Support:** https://support.aws.amazon.com/#/contacts/kiro

### Credits
- **AWS Credits:** Code `PCOYZN97BLZAD4`
- **Kiro Credits:** https://kiro.dev/redeem/aideas2026-8e92be46ef0b

## 🆘 Need Help?

### Can't Find Something?
1. Check this navigation guide
2. Look in `docs/` folder
3. Search repository (Cmd/Ctrl + P in VS Code)
4. Check `docs/archive/` for historical docs

### Technical Issues?
1. Check relevant guide in `docs/`
2. Review error messages
3. Check AWS CloudWatch logs
4. Open GitHub issue

### Competition Questions?
1. See `docs/aideas-2026/README.md`
2. Check submission checklist
3. Visit competition page
4. Contact AWS support

## ⚡ Quick Commands

```bash
# Find a file
find . -name "filename.md"

# Search content
grep -r "search term" docs/

# List all markdown files
find docs/ -name "*.md"

# Check git status
git status

# View recent commits
git log --oneline -10
```

## 📊 File Count Summary

- **Root markdown files:** 3 (README, NAVIGATION, CLEANUP_SUMMARY)
- **AIdeas docs:** 8 files in `docs/aideas-2026/`
- **Technical guides:** 19 files in `docs/`
- **Archived docs:** 17 files in `docs/archive/`
- **Source files:** 100+ TypeScript files
- **Total documentation:** 40+ markdown files (organized)

## ✅ Quick Checklist

**For New Contributors:**
- [ ] Read README.md
- [ ] Review SYSTEM_OVERVIEW.md
- [ ] Set up local development
- [ ] Run tests
- [ ] Review code structure

**For AIdeas Submission:**
- [ ] Navigate to docs/aideas-2026/
- [ ] Follow QUICK_START_AIDEAS.md
- [ ] Deploy AWS infrastructure
- [ ] Record demo video
- [ ] Publish article

**For Deployment:**
- [ ] Review AWS_MIGRATION_GUIDE.md
- [ ] Configure AWS credentials
- [ ] Run deployment script
- [ ] Test endpoints
- [ ] Monitor CloudWatch

---

**Last Updated:** March 13, 2026
**Repository Status:** ✅ Clean and organized
**Next Action:** Choose your task above and follow the link!

**Happy coding! 🚀**
