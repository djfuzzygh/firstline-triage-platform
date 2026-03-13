# FirstLine AWS Migration Guide

## Overview
This guide migrates FirstLine from GCP (Firestore/Cloud Run/Vertex AI) to AWS (DynamoDB/Lambda/Bedrock) for the AIdeas 2026 competition.

## Current Status
- ✅ AWS CDK infrastructure already exists in `infrastructure/`
- ✅ AWS SDK dependencies installed
- ✅ Bedrock AI provider support in code
- ⚠️ Currently configured for GCP (needs environment variable changes)

## Migration Steps

### 1. Environment Configuration

Create `.env.aws` file:

```bash
# AWS Configuration
AI_PROVIDER=bedrock
BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0
AWS_REGION=us-east-1

# DynamoDB
TABLE_NAME=FirstLineTable
DYNAMODB_TABLE=FirstLineTable

# S3
REFERRAL_BUCKET=firstline-referral-bucket

# SNS
SMS_TOPIC_ARN=arn:aws:sns:us-east-1:ACCOUNT_ID:FirstLineSMSTopic

# JWT Secret (will be in Secrets Manager)
JWT_SECRET=your-jwt-secret-here

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 2. Deploy AWS Infrastructure

```bash
# Install dependencies
cd infrastructure
npm install

# Bootstrap CDK (first time only)
cdk bootstrap aws://ACCOUNT_ID/us-east-1

# Deploy stack
cdk deploy FirstLineStack-dev

# Note the outputs:
# - ApiUrl
# - TableName
# - ReferralBucketName
# - SmsTopicArn
```

### 3. Update Frontend Environment Variables

**clinician-app/.env.production**
```bash
VITE_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1
```

**web-dashboard/.env.production**
```bash
VITE_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1
```

### 4. Test AWS Deployment

```bash
# Health check
curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1/health

# Create test user
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@firstline.health",
    "password": "Test123!",
    "name": "Test User",
    "role": "clinician"
  }'

# Login
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@firstline.health",
    "password": "Test123!"
  }'

# Save the token from response
export TOKEN="your-jwt-token-here"

# Create encounter
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1/encounters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "demographics": {
      "age": 35,
      "sex": "F",
      "location": "Accra, Ghana"
    },
    "symptoms": "Fever, cough, difficulty breathing for 3 days",
    "channel": "app"
  }'

# Save encounter ID
export ENCOUNTER_ID="returned-encounter-id"

# Run triage
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1/encounters/$ENCOUNTER_ID/triage \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Deploy Frontends to S3/CloudFront

```bash
# Build clinician app
cd clinician-app
VITE_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1 npm run build

# Build web dashboard
cd ../web-dashboard
VITE_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/v1 npm run build

# Deploy to S3 (manual for now)
# 1. Create S3 buckets: firstline-clinician-app, firstline-web-dashboard
# 2. Enable static website hosting
# 3. Upload dist/ folders
# 4. Create CloudFront distributions
# 5. Update CORS in API Gateway with CloudFront URLs
```

## AWS Services Used

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| Lambda | Serverless compute | 1M requests/month |
| API Gateway | REST API | 1M requests/month |
| DynamoDB | NoSQL database | 25GB storage, 25 WCU/RCU |
| S3 | Document storage | 5GB storage, 20K GET, 2K PUT |
| Bedrock | AI inference | Pay per use (~$0.024/1K tokens) |
| SNS | SMS notifications | 1K publishes/month |
| CloudWatch | Monitoring | 10 metrics, 5GB logs |
| Secrets Manager | Secret storage | 30-day free trial |

## Cost Estimate (AWS Free Tier)

### Per Encounter
- Lambda: $0.000016
- API Gateway: $0.0000035
- DynamoDB: $0.00025
- Bedrock: $0.024 (Claude Haiku)
- S3: $0.000001
- **Total: ~$0.024 per encounter**

### Monthly (10,000 encounters)
- Lambda: $5
- API Gateway: $3.50
- DynamoDB: $2.50
- Bedrock: $240
- S3: $1
- CloudWatch: $3
- **Total: ~$255/month**

## Verification Checklist

- [ ] CDK stack deployed successfully
- [ ] API Gateway URL accessible
- [ ] Health endpoint returns 200
- [ ] Auth endpoints work (signup/login)
- [ ] Can create encounters
- [ ] Triage returns results from Bedrock
- [ ] Referral generation works
- [ ] Dashboard shows statistics
- [ ] Frontends deployed and accessible
- [ ] CORS configured correctly
- [ ] CloudWatch logs visible
- [ ] DynamoDB tables populated

## Troubleshooting

### Issue: Bedrock Access Denied

**Solution**: Ensure your AWS account has Bedrock enabled:
```bash
aws bedrock list-foundation-models --region us-east-1
```

If not enabled, request access in AWS Console → Bedrock → Model access

### Issue: Lambda Timeout

**Solution**: Increase timeout in CDK:
```typescript
timeout: cdk.Duration.seconds(60), // Increase from 30
```

### Issue: CORS Errors

**Solution**: Update API Gateway CORS and add CloudFront URLs to ALLOWED_ORIGINS

### Issue: DynamoDB Throttling

**Solution**: Switch to on-demand billing (already configured in CDK)

## Next Steps

1. Complete AWS deployment
2. Test all endpoints
3. Deploy frontends
4. Create demo video
5. Write article
6. Submit to AWS Builder Center

## Support

- AWS Free Tier: https://aws.amazon.com/free/
- AWS Credits: Use code `PCOYZN97BLZAD4`
- Kiro Credits: https://kiro.dev/redeem/aideas2026-8e92be46ef0b
