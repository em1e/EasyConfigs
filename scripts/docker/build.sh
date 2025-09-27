#!/bin/bash

# Usage: ./scripts/docker/build.sh [app-name]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# defaults
APP_NAME=${1:-"easyconfigs"}
ENVIRONMENT=${2:-"production"}
IMAGE_TAG=${3:-"latest"}

echo -e "${BLUE}🐳 Building Docker image for ${APP_NAME}...${NC}"
VALID_APPS=("easyconfigs" "all")

validate_app_name() {
	local app_name="$1"

	for valid_app in "${VALID_APPS[@]}"; do
		if [[ "$app_name" == "$valid_app" ]]; then
			return 0
		fi
	done

	echo -e "${RED}❌ Invalid app name: '${app_name}'${NC}"
	echo -e "${BLUE}📖 Usage examples:${NC}"
	echo -e "  ./scripts/docker/build.sh easyconfigs"
	exit 1
}

validate_app_name "$APP_NAME"

build_app() {
	local app_name="$1"
	local docker_target="$2"
	local image_tag="easyconfigs-${app_name}:${IMAGE_TAG}"
	
	echo -e "${YELLOW}📦 Building ${app_name} (Docker target: ${docker_target})...${NC}"
	docker build \
		--target "${docker_target}" \
		--tag "${image_tag}" \
		--build-arg NODE_VERSION=20 \
		--build-arg PNPM_VERSION=9.12.3 \
		.
	
	echo -e "${GREEN}✅ Successfully built ${image_tag}${NC}"
}

if [[ "$APP_NAME" == "all" ]]; then
	echo -e "${BLUE}🏗️  Building all images for EasyConfigs...${NC}"
	build_app "easyconfigs" "production"
	echo -e "${YELLOW}📦 Building development image...${NC}"
	docker build \
		--target development \
		--tag easyconfigs-dev:${IMAGE_TAG} \
		--build-arg NODE_VERSION=20 \
		--build-arg PNPM_VERSION=9.12.3 \
		.
	echo -e "${GREEN}✅ Successfully built easyconfigs-dev:${IMAGE_TAG}${NC}"
	
else
	echo -e "${BLUE}🏗️  Building ${APP_NAME} image...${NC}"
	build_app "${APP_NAME}" "production"
fi

echo -e "${GREEN}🎉 Build completed successfully!${NC}"
echo -e "${BLUE}📋 Built images:${NC}"
docker images | grep easyconfigs
