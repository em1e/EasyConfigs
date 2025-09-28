help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev:
	@docker-compose --profile dev up easyconfigs-dev

build:
	@./scripts/docker/build.sh easyconfigs

build-all:
	@./scripts/docker/build.sh all

run:
	@docker-compose up --build

run-bg:
	@docker-compose up -d

logs:
	@docker-compose logs -f

db: ## Start Prisma Studio to view database (if Prisma is working)
	@echo "Starting Prisma Studio on http://localhost:5555"
	@docker-compose exec easyconfigs-dev sh -c "cd apps/easyconfigs && npx prisma studio --hostname 0.0.0.0"

db-view: ## View temporary database files (current setup)
	@echo "=== Current Users ==="
	@docker-compose exec easyconfigs-dev sh -c "cd apps/easyconfigs && if [ -f temp-users.json ]; then cat temp-users.json; else echo '[]'; fi"
	@echo ""
	@echo "=== Current Tokens ==="
	@docker-compose exec easyconfigs-dev sh -c "cd apps/easyconfigs && if [ -f temp-tokens.json ]; then cat temp-tokens.json; else echo '[]'; fi"

db-clear: ## Clear all users and tokens from database
	@echo "Clearing all users and tokens..."
	@docker-compose exec easyconfigs-dev sh -c "cd apps/easyconfigs && rm -f temp-users.json temp-tokens.json"
	@echo "✅ Database cleared! All users and tokens have been removed."

clean:
	@docker-compose down

fclean:
	@./scripts/docker/cleanup.sh all

deploy: build
	@docker-compose up -d

.PHONY: help dev build run clean