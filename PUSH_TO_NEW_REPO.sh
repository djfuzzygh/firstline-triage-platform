#!/bin/bash

# Script to push FirstLine to new GitHub repository
# Run this after creating the repository on GitHub

set -e

echo "🚀 FirstLine - Push to New Repository"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo -e "${RED}❌ Not a git repository${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Current status:${NC}"
git status --short
echo ""

# Ask for GitHub username
echo -e "${YELLOW}Enter your GitHub username:${NC}"
read -p "Username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ Username cannot be empty${NC}"
    exit 1
fi

NEW_REPO_URL="https://github.com/$GITHUB_USERNAME/firstline-triage-platform.git"

echo ""
echo -e "${YELLOW}📝 Steps to complete:${NC}"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: firstline-triage-platform"
echo "3. Description: Multi-channel AI-powered healthcare triage platform for low-resource environments"
echo "4. Make it Public"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
echo -e "${YELLOW}Press Enter when you've created the repository...${NC}"
read

echo ""
echo -e "${GREEN}✅ Staging all changes...${NC}"
git add -A

echo -e "${GREEN}✅ Committing changes...${NC}"
git commit -m "feat: Complete FirstLine platform with AWS integration and AIdeas 2026 submission

- Multi-channel support (USSD, SMS, Voice, Mobile, Web)
- AWS serverless architecture (Lambda, DynamoDB, Bedrock, S3)
- Feature phone support (2G/3G networks)
- Safety-first AI with hard-coded danger signs
- Cost-optimized ($0.024 per encounter)
- Complete documentation and deployment guides
- AIdeas 2026 competition materials
- Cleaned and organized repository structure

Built with AWS Free Tier and Kiro for social impact in healthcare."

echo -e "${GREEN}✅ Adding new remote...${NC}"
git remote remove origin 2>/dev/null || true
git remote add origin $NEW_REPO_URL

echo -e "${GREEN}✅ Pushing to new repository...${NC}"
git push -u origin main

echo ""
echo -e "${GREEN}🎉 Success!${NC}"
echo ""
echo "Your repository is now available at:"
echo "https://github.com/$GITHUB_USERNAME/firstline-triage-platform"
echo ""
echo "Next steps:"
echo "1. Update the GitHub URL in docs/aideas-2026/AIDEAS_ARTICLE.md"
echo "2. Replace YOUR_USERNAME with $GITHUB_USERNAME"
echo "3. Add a repository description and topics on GitHub"
echo "4. Consider adding these topics: healthcare, aws, ai, serverless, social-impact"
echo ""
echo -e "${GREEN}✨ Ready for AIdeas 2026 submission!${NC}"
