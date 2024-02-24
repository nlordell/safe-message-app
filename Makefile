SRC    := $(wildcard src/*.js)
ASSETS := $(patsubst assets/%,dist/%,$(wildcard assets/*))

.PHONY: all
all: dist

.PHONY: dist
dist: dist/index.html $(ASSETS)

dist/index.html: src/index.html dist/index.js
	sed '\#<script data-src="index.js">#r dist/index.js' src/index.html > dist/index.html

dist/index.js: $(SRC)
	mkdir -p dist/
	deno bundle src/index.js dist/index.js

dist/%: assets/%
	mkdir -p dist/
	cp $^ $@

.PHONY: host
host: dist
	(cd dist; python3 ../src/server.py)

.PHONY: clean
clean:
	rm -rf dist/
