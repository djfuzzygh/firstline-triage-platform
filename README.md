# FirstLine Healthcare Triage Platform

> Multi-channel AI-powered clinical decision-support system for low-resource environments

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![AWS](https://img.shields.io/badge/AWS-Free%20Tier-orange)](https://aws.amazon.com/free/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)

## 🎯 Overview

FirstLine functions as a digital medical call center with one central AI brain accessible through multiple channels:
- **📱 Smartphone Application**: Full-featured app with offline capability
- **📞 Toll-free Voice Calls**: Natural language voice interaction via IVR
- **💬 USSD/SMS**: Feature phone support for maximum accessibility
- **🖥️ Web Dashboard**: Clinician and administrator interfaces

The platform collects patient symptoms, applies medical reasoning using AWS Bedrock and WHO-style guidance, assigns triage levels (RED/YELLOW/GREEN), and provides safe care instructions with referral documents.

## 🚀 Quick Start

### For AIdeas 2026 Competition
See **[docs/aideas-2026/](docs/aideas-2026/)** for complete submission materials.

**Quick Links:**
- [Quick Start Guide](docs/aideas-2026/QUICK_START_AIDEAS.md) - 2-hour deployment
- [AWS Migration Guide](docs/aideas-2026/AWS_MIGRATION_GUIDE.md) - GCP to AWS
- [Deployment Script](docs/aideas-2026/AWS_DEPLOYMENT_SCRIPT.sh) - Automated setup

### Standard Installation
```bash
# Install dependencies
npm install

# Build backend
npm run build

# Deploy to AWS
cd infrastructure
npx cdk deploy

# Or run locally
npm start
```

## 🏗️ Architecture

### AWS Deployment (Primary)
- **Backend**: TypeScript/Node.js Lambda functions
- **API**: API Gateway REST API
- **Database**: DynamoDB (single-table design)
- **Storage**: S3 for referral documents
- **AI Engine**: AWS Bedrock (Claude Haiku)
- **Monitoring**: CloudWatch logs and metrics
- **Infrastructure**: AWS CDK (TypeScript)

### GCP Deployment (Legacy)
- **Backend**: Cloud Run
- **Database**: Firestore
- **Storage**: Google Cloud Storage
- **AI Engine**: Vertex AI (MedGemma)

### Frontend
- **Web Apps**: React 18 + TypeScript + Vite
- **Mobile**: React Native
- **UI Library**: Material-UI

## 📁 Project Structure

```
.
├── src/                    # Backend source code
│   ├── handlers/          # Lambda function handlers
│   ├── services/          # Business logic services
│   ├── models/            # TypeScript interfaces
│   ├── utils/             # Utility functions
│   └── middleware/        # Express middleware
├── infrastructure/        # AWS CDK infrastructure code
│   ├── lib/              # CDK stack definitions
│   └── bin/              # CDK app entry point
├── clinician-app/        # React clinician web app
├── web-dashboard/        # React admin dashboard
├── mobile-app/           # React Native mobile app
├── docs/                 # Documentation
│   ├── aideas-2026/     # AIdeas competition materials
│   ├── archive/         # Historical documentation
│   └── *.md             # Technical guides
├── kaggle/              # Kaggle competition code
├── scripts/             # Deployment scripts
└── package.json         # Root dependencies
```

## 🔧 Development

### Prerequisites
- Node.js 20.x or later
- npm 10.x or later
- AWS CLI configured
- AWS account with Bedrock access

### Local Development
```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Start local server
npm start
```

### Frontend Development
```bash
# Clinician App
cd clinician-app
npm install
npm run dev  # http://localhost:3000

# Web Dashboard
cd web-dashboard
npm install
npm run dev  # http://localhost:5173
```

## 🚀 Deployment

### AWS Deployment (Recommended)

**Quick Deploy:**
```bash
./docs/aideas-2026/AWS_DEPLOYMENT_SCRIPT.sh
```

**Manual Deploy:**
```bash
# Install CDK dependencies
cd infrastructure
npm install

# Bootstrap CDK (first time only)
npx cdk bootstrap

# Deploy stack
npx cdk deploy FirstLineStack-dev

# Deploy frontends
cd ../clinician-app && npm run build
cd ../web-dashboard && npm run build
# Upload dist/ folders to S3/CloudFront
```

### Environment Variables

**AWS Configuration:**
```bash
AI_PROVIDER=bedrock
BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0
AWS_REGION=us-east-1
TABLE_NAME=FirstLineTable
REFERRAL_BUCKET=firstline-referral-bucket
```

**Frontend Configuration:**
```bash
# clinician-app/.env.production
VITE_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1

# web-dashboard/.env.production
VITE_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1
```

See [AWS Migration Guide](docs/aideas-2026/AWS_MIGRATION_GUIDE.md) for complete details.

## 💰 Cost Optimization

### AWS Free Tier Costs
Estimated monthly cost for 10,000 encounters: **~$255** ($0.024 per encounter)

**Breakdown:**
- AWS Bedrock (Claude Haiku): $240
- Lambda: $5
- API Gateway: $3.50
- DynamoDB: $2.50
- S3: $1
- CloudWatch: $3

**Key Optimizations:**
- Token limit enforcement (2000 input, 500 output)
- DynamoDB single-table design
- S3 lifecycle policies (90-day expiration)
- On-demand billing (no idle costs)
- CloudFront caching for static assets

## 🔒 Security

- All data encrypted at rest (AWS managed keys)
- All data encrypted in transit (TLS 1.2+)
- JWT authentication with role-based access control
- API Gateway throttling and rate limiting
- No personal names stored by default
- Audit logging enabled via CloudWatch
- Secrets stored in AWS Secrets Manager

## 🛡️ Safety Features

- **Hard-coded danger sign detection** (overrides AI)
- **High uncertainty safety constraint** (no GREEN if uncertain)
- **Rule-based fallback engine** (works without AI)
- **Clinician confirmation disclaimer** (always included)
- **Multi-layer validation** (input, AI, rules)

## 📚 Documentation

### Competition Materials
- [AIdeas 2026 Submission](docs/aideas-2026/) - Complete competition package
- [Quick Start Guide](docs/aideas-2026/QUICK_START_AIDEAS.md) - 2-hour deployment
- [AWS Migration Guide](docs/aideas-2026/AWS_MIGRATION_GUIDE.md) - GCP to AWS migration

### Technical Guides
- [System Overview](docs/SYSTEM_OVERVIEW.md) - Complete system architecture
- [Frontend Guide](docs/FRONTEND_README.md) - Frontend development
- [Voice Implementation](docs/VOICE_IMPLEMENTATION_GUIDE.md) - Voice system setup
- [3CX Setup](docs/3CX_SETUP_GUIDE.md) - 3CX integration

### Historical Documentation
- [Archive](docs/archive/) - Previous versions and submissions

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run property-based tests
npm run test:properties

# Watch mode
npm run test:watch
```

**Testing Approach:**
- Unit tests for specific cases
- Property-based tests for universal properties
- Integration tests for AWS services
- End-to-end tests for critical flows

## 📄 License

CC BY 4.0 (`CC-BY-4.0`). See [LICENSE](LICENSE).

## 🤝 Contributing

This project is part of the AIdeas 2026 competition. For contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

- **Technical Issues:** Open a GitHub issue
- **AWS Support:** https://support.aws.amazon.com/
- **Competition:** https://community.aws/builderideas

## 🏆 Competitions

- **AIdeas 2026:** AWS Builder Center competition (in progress)
- **Kaggle MedGemma Challenge:** See [docs/archive/](docs/archive/)

## 🙏 Acknowledgments

- AWS for Free Tier and competition support
- Kiro for AI-assisted development
- Anthropic for Claude models via Bedrock
- Open source community for tools and libraries

---

**Built with ❤️ to save lives through accessible AI-powered healthcare** 🏥💙

**Status:** Production-ready | **Version:** 2.0 | **Last Updated:** March 2026
