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

clean:
	@docker-compose down

fclean:
	@./scripts/docker/cleanup.sh all

deploy: build
	@docker-compose up -d

.PHONY: help dev build run clean