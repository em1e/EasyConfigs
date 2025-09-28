#!/bin/bash

echo "🔐 OAuth Setup Test"
echo "==================="
echo ""

# Check if OAuth credentials are set
if [ -z "$GOOGLE_CLIENT_ID" ] || [ -z "$GOOGLE_CLIENT_SECRET" ]; then
    echo "❌ Google OAuth credentials not set"
    echo "   Please follow the setup guide in OAUTH_SETUP.md"
    echo ""
else
    echo "✅ Google OAuth credentials configured"
    echo ""
fi

if [ -z "$GITHUB_ID" ] || [ -z "$GITHUB_SECRET" ]; then
    echo "❌ GitHub OAuth credentials not set"
    echo "   Please follow the setup guide in OAUTH_SETUP.md"
    echo ""
else
    echo "✅ GitHub OAuth credentials configured"
    echo ""
fi

echo "Next steps:"
echo "1. Follow OAUTH_SETUP.md to create OAuth applications"
echo "2. Add credentials to docker-compose.yml"
echo "3. Run 'make dev' to test OAuth"
echo ""
echo "Expected redirect URIs:"
echo "  Google:  http://localhost:4000/api/auth/callback/google"
echo "  GitHub:  http://localhost:4000/api/auth/callback/github"
