#!/bin/bash

# Usage: ./scripts/docker/cleanup.sh [option]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

CLEANUP_OPTION=${1:-"containers"}
echo -e "${BLUE}🧹 Cleaning up Docker resources...${NC}"
VALID_OPTIONS=("containers" "images" "all" "system")

validate_cleanup_option() {
	local option="$1"
	for valid_option in "${VALID_OPTIONS[@]}"; do
		if [[ "$option" == "$valid_option" ]]; then
			return 0
		fi
	done

	echo -e "${RED}❌ Invalid cleanup option: '${option}'${NC}"
	echo -e "${YELLOW}💡 Valid options are: ${VALID_OPTIONS[*]}${NC}"
	echo -e "${BLUE}📖 Usage examples:${NC}"
	echo -e "  ./scripts/docker/cleanup.sh containers"
	echo -e "  ./scripts/docker/cleanup.sh images"
	echo -e "  ./scripts/docker/cleanup.sh all"
	echo -e "  ./scripts/docker/cleanup.sh system"
	exit 1
}

cleanup_containers() {
	echo -e "${YELLOW}🛑 Stopping and removing EasyConfigs containers...${NC}"
	docker-compose down --remove-orphans
	docker ps -a --filter "name=easyconfigs" -q | xargs -r docker rm -f
	echo -e "${GREEN}✅ Containers cleaned up${NC}"
}

cleanup_images() {
	echo -e "${YELLOW}🗑️  Removing EasyConfigs images...${NC}"
	docker images "easyconfigs-*" -q | xargs -r docker rmi -f
	echo -e "${GREEN}✅ Images cleaned up${NC}"
}

cleanup_everything() {
	echo -e "${YELLOW}🧽 Full cleanup: containers, images, and volumes...${NC}"
	docker-compose down --remove-orphans --volumes
	docker ps -a --filter "name=easyconfigs" -q | xargs -r docker rm -f
	docker images "easyconfigs-*" -q | xargs -r docker rmi -f
	docker volume ls --filter "name=easyconfigs" -q | xargs -r docker volume rm
	docker network ls --filter "name=easyconfigs" -q | xargs -r docker network rm
	docker system prune -f --volumes
	echo -e "${GREEN}✅ Full cleanup completed${NC}"
}

cleanup_system_wide() {
	echo -e "${YELLOW}⚠️  System-wide Docker cleanup...${NC}"
	read -p "This will remove unused containers, images, and volumes. Continue? (y/N): " user_confirmation

	if [[ "$user_confirmation" == [yY] || "$user_confirmation" == [yY][eE][sS] ]]; then
		docker system prune -a --volumes -f
		echo -e "${GREEN}✅ System cleanup completed${NC}"
	else
		echo -e "${BLUE}ℹ️  Cleanup cancelled${NC}"
	fi
}

validate_cleanup_option "$CLEANUP_OPTION"

if [[ "$CLEANUP_OPTION" == "containers" ]]; then
	cleanup_containers
elif [[ "$CLEANUP_OPTION" == "images" ]]; then
	cleanup_images
elif [[ "$CLEANUP_OPTION" == "all" ]]; then
	cleanup_everything
elif [[ "$CLEANUP_OPTION" == "system" ]]; then
	cleanup_system_wide
fi

echo -e "${BLUE}📊 Current Docker usage:${NC}"
docker system df




