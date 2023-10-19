.DEFAULT_GOAL := help

.PHONY: init
init:
	@exec bash bin/local-init.sh

.PHONY: npm-init
npm-init:
	LOCAL_NPM=true bash bin/local-init.sh

## Docker Environment

# Note: ${app} is an optional variable set like: make build app=web
# Note: ${opts} is an optional variable set like: make build opts="--no-cache"
# Without it - all containers are assumed

.PHONY: run
docker-run:
	docker-compose run --rm web $(cmd)

.SILENT: build
.PHONY: build
build:
	docker-compose build ${app} ${opts}

.SILENT: start
.PHONY: start
start:
	docker-compose up -d ${app} ${opts}
	@echo "Containers started. Run make logs or docker-compose logs SERVICE to get container logs"

.PHONY: lint
lint:
	@make --no-print-directory docker-run cmd="npm run lint"

.PHONY: test
test:
	@make --no-print-directory docker-run cmd="npm run test:unit"

.PHONY: down
down:
	docker-compose down ${app} ${opts}

.PHONY: restart
restart: down build start

.PHONY: logs
logs:
	docker-compose logs -f ${app} ${opts}

## CI Commands

.PHONY: helm-check
helm-check:
	helm template k8s ./provisioning/k8s/ --debug

# Help Docs
.PHONY: help
help:
	@echo "  Commands"
	@echo "  |"
	@echo "  |_ help (default)          - Show this message."
	@echo " |"
	@echo "  npm Commands (non-docker):"
	@echo "  |_ npm-init                - Initializes the local env & installs dependencies."
	@echo "  |"
	@echo "  Docker Commands:"
	@echo "  |_ init                    - Initializes docker environment and starts container"
	@echo "  |_ lint                    - Lint code in docker environment."
	@echo "  |_ test                    - Run unit tests in docker environment."
	@echo "  |_ down                    - Runs docker-compose down."
	@echo "  |_ logs                    - Tail docker logs for running containers."
	@echo "  |_ restart                 - Restart the Docker environment."
	@echo "  |_ start                   - Start docker environment in the background."
	@echo "  |_ run:                    - Run an arbitrary command in a temporary container. Ex usage: make docker-run cmd=\"your command\""
	@echo "  |"
	@echo "  CI Commands:"
	@echo "  |_ helm-check              - Outputs result of Helm template interpolation for testing."
	@echo "  |____________________________________________________________________"
	@echo " "
