#!/bin/bash

# FirstLine AWS Deployment Script
# For AIdeas 2026 Competition

set -e

echo "🚀 FirstLine AWS Deployment Script"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 20+${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm${NC}"
    exit 1
fi

if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not found. Please install AWS CLI${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites met${NC}"
echo ""

# Get AWS account info
echo "🔍 Checking AWS credentials..."
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "")
AWS_REGION=${AWS_REGION:-us-east-1}

if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo -e "${RED}❌ AWS credentials not configured${NC}"
    echo "Please run: aws configure"
    exit 1
fi

echo -e "${GREEN}✅ AWS Account: $AWS_ACCOUNT_ID${NC}"
echo -e "${GREEN}✅ AWS Region: $AWS_REGION${NC}"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
echo -e "${GREEN}✅ Root dependencies installed${NC}"
echo ""

# Build backend
echo "🔨 Building backend..."
npm run build
echo -e "${GREEN}✅ Backend built${NC}"
echo ""

# Deploy CDK stack
echo "☁️  Deploying AWS infrastructure..."
cd infrastructure

# Install CDK dependencies
echo "📦 Installing CDK dependencies..."
npm install

# Bootstrap CDK (if needed)
echo "🔧 Bootstrapping CDK..."
npx cdk bootstrap aws://$AWS_ACCOUNT_ID/$AWS_REGION --require-approval never || true

# Deploy stack
echo "🚀 Deploying CDK stack..."
npx cdk deploy FirstLineStack-dev --require-approval never

# Get outputs
echo ""
echo "📊 Retrieving stack outputs..."
API_URL=$(aws cloudformation describe-stacks \
    --stack-name FirstLineStack-dev \
    --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' \
    --output text \
    --region $AWS_REGION)

TABLE_NAME=$(aws cloudformation describe-stacks \
    --stack-name FirstLineStack-dev \
    --query 'Stacks[0].Outputs[?OutputKey==`TableName`].OutputValue' \
    --output text \
    --region $AWS_REGION)

BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name FirstLineStack-dev \
    --query 'Stacks[0].Outputs[?OutputKey==`ReferralBucketName`].OutputValue' \
    --output text \
    --region $AWS_REGION)

cd ..

echo -e "${GREEN}✅ Infrastructure deployed${NC}"
echo ""
echo "📝 Stack Outputs:"
echo "  API URL: $API_URL"
echo "  Table Name: $TABLE_NAME"
echo "  Bucket Name: $BUCKET_NAME"
echo ""

# Update frontend environment files
echo "🔧 Updating frontend environment files..."

# Clinician App
cat > clinician-app/.env.production << EOF
VITE_API_URL=$API_URL
EOF
echo -e "${GREEN}✅ clinician-app/.env.production updated${NC}"

# Web Dashboard
cat > web-dashboard/.env.production << EOF
VITE_API_URL=$API_URL
EOF
echo -e "${GREEN}✅ web-dashboard/.env.production updated${NC}"
echo ""

# Build frontends
echo "🔨 Building frontends..."

# Clinician App
echo "  Building clinician app..."
cd clinician-app
npm install
npm run build
cd ..
echo -e "${GREEN}✅ Clinician app built${NC}"

# Web Dashboard
echo "  Building web dashboard..."
cd web-dashboard
npm install
npm run build
cd ..
echo -e "${GREEN}✅ Web dashboard built${NC}"
echo ""

# Test deployment
echo "🧪 Testing deployment..."

# Health check
echo "  Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" ${API_URL}health)

if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${YELLOW}⚠️  Health check returned: $HEALTH_RESPONSE${NC}"
fi
echo ""

# Summary
echo "🎉 Deployment Complete!"
echo "======================="
echo ""
echo "📍 API Endpoint: $API_URL"
echo "📊 DynamoDB Table: $TABLE_NAME"
echo "📦 S3 Bucket: $BUCKET_NAME"
echo ""
echo "🔗 Next Steps:"
echo "  1. Test API: curl ${API_URL}health"
echo "  2. Create test user: curl -X POST ${API_URL}auth/signup -H 'Content-Type: application/json' -d '{\"email\":\"test@test.com\",\"password\":\"Test123!\",\"name\":\"Test User\",\"role\":\"clinician\"}'"
echo "  3. Deploy frontends to S3/CloudFront (manual step)"
echo "  4. Update CORS with frontend URLs"
echo "  5. Create demo video"
echo "  6. Write article for AWS Builder Center"
echo ""
echo "💰 AWS Credits:"
echo "  - Redeem: PCOYZN97BLZAD4"
echo "  - Instructions: https://aws.amazon.com/premiumsupport/knowledge-center/redeem-aws-promotional-credit/"
echo ""
echo "🆘 Support:"
echo "  - AWS Support: https://support.aws.amazon.com/"
echo "  - Kiro Support: https://support.aws.amazon.com/#/contacts/kiro"
echo ""
echo -e "${GREEN}✨ Ready for AIdeas 2026 submission!${NC}"
