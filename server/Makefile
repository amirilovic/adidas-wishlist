include .env

help:
	@echo ""
	@echo "usage: make COMMAND"
	@echo ""
	@echo "Commands:"
	@echo "  start         Start app with docker-compose"
	@echo "  stop          Stop app"
	@echo "  clean         Clean all containers"
	@echo "  logs          View container logs"
	@echo "  test          Runs all tests"
	@echo "  test-watch    Runs all tests in watch mode"
	
start:
	docker-compose up -d

stop:
	@docker-compose stop

clean: stop
	@docker-compose kill
	@docker-compose rm -f

logs:
	@docker-compose logs -f --tail 10

test:
	@docker-compose run --rm api npm test

test-watch:
	@docker-compose run --rm api npm run test-watch