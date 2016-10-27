.PHONY: run build clean lint start

JSX_FILES := $(shell find . -name "*.jsx" -not -path "./node_modules/*")

run:
	npm run-script dev-server

build:
	npm run-script build

start:
	npm run-script start-server

clean:
	node_modules/rimraf/bin.js web/public/build

lint:
	./node_modules/.bin/eslint $(JSX_FILES)
