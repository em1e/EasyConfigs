#!/bin/bash

# Usage: ./scripts/docker/run.sh [app-name] [mode]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# defaults
APP_NAME=${1:-"easyconfigs"}
MODE=${2:-"production"}
IMAGE_TAG=${3:-"latest"}

echo -e "${BLUE}🚀 Starting ${APP_NAME} in ${MODE} mode...${NC}"
VALID_RUN_OPTIONS=("easyconfigs" "all" "dev")

validate_run_option() {
	local app_name="$1"
	for valid_option in "${VALID_RUN_OPTIONS[@]}"; do
		if [[ "$app_name" == "$valid_option" ]]; then
			return 0
		fi
	done

	echo -e "${RED}❌ Invalid run option: '${app_name}'${NC}"
	echo -e "${YELLOW}💡 Valid options are: ${VALID_RUN_OPTIONS[*]}${NC}"
	echo -e "${BLUE}📖 Usage examples:${NC}"
	echo -e "  ./scripts/docker/run.sh easyconfigs"
	echo -e "  ./scripts/docker/run.sh all"
	echo -e "  ./scripts/docker/run.sh dev"
	exit 1
}

validate_run_option "$APP_NAME"

stop_existing_containers() {
	echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
	docker-compose down --remove-orphans 2>/dev/null || true
}

run_single_app_container() {
	local app_name="$1"
	local port_number="$2"
	local image_name="easyconfigs-${app_name}:${IMAGE_TAG}"

	echo -e "${YELLOW}🏃 Running ${app_name} on port ${port_number}...${NC}"

	docker run -d \
		--name "easyconfigs-${app_name}" \
		--port "${port_number}:${port_number}" \
		--rm \
		"${image_name}"

	echo -e "${GREEN}✅ ${app_name} is running at http://localhost:${port_number}${NC}"
}

run_easyconfigs_service() {
	stop_existing_containers
	run_single_app_container "easyconfigs" "4000"
}

run_all_services() {
	echo -e "${BLUE}🏗️  Starting EasyConfigs service with docker-compose...${NC}"
	stop_existing_containers
	docker-compose up -d easyconfigs
	echo -e "${GREEN}✅ EasyConfigs service started!${NC}"
	echo -e "${BLUE}📋 Service available at:${NC}"
	echo -e "  • EasyConfigs: http://localhost:4000"
}

run_development_environment() {
	echo -e "${BLUE}🔧 Starting development environment...${NC}"
	stop_existing_containers
	docker-compose --profile dev up -d
	echo -e "${GREEN}✅ Development environment started!${NC}"
	echo -e "${BLUE}📋 Service available at:${NC}"
	echo -e "  • EasyConfigs: http://localhost:4000"
}

if [[ "$APP_NAME" == "easyconfigs" ]]; then
	run_easyconfigs_service
elif [[ "$APP_NAME" == "all" ]]; then
	run_all_services
elif [[ "$APP_NAME" == "dev" ]]; then
	run_development_environment
fi

echo -e "${BLUE}📊 Running containers:${NC}"
docker ps --filter "name=easyconfigs" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"