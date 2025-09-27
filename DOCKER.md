# 🐳 Docker Setup for EasyConfigs

Docker setup for running EasyConfigs locally or in production.

## 🚀 Quick Start

**Production:**
```bash
docker-compose up --build
```

**Development (with hot reload):**
```bash
docker-compose --profile dev up
```

**EasyConfigs runs on:** http://localhost:4000

## Helper Scripts

**Build:**
```bash
# Build production image
./scripts/docker/build.sh easyconfigs

# Build production + dev images
./scripts/docker/build.sh all
```

**Run:**
```bash
# Run single container
./scripts/docker/run.sh easyconfigs

# Run with docker-compose
./scripts/docker/run.sh all

# Run development mode
./scripts/docker/run.sh dev
```

**View logs:**
```bash
docker-compose logs -f
```

## 🧹 Cleanup

```bash
# Stop services
docker-compose down

# Remove containers
./scripts/docker/cleanup.sh containers

# Remove images
./scripts/docker/cleanup.sh images

# Full cleanup
./scripts/docker/cleanup.sh all
```

## ⚙️ Environment Variables

Create `.env` file:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:4000
NODE_ENV=production
```

## 🚀 Production Deployment

```bash
# Start in background
docker-compose up -d
```

**Deploy to cloud:**
```bash
docker push your-username/easyconfigs:latest
```

## 🐛 Common Issues

**Port in use:**
```bash
# Check what's using port
lsof -i :4000
```

**Build fails:**
```bash
# Clear build cache
docker builder prune -a

# Rebuild from scratch
docker-compose build --no-cache
```

**Permission issues:**
```bash
# Fix script permissions
chmod +x scripts/docker/*.sh
```
