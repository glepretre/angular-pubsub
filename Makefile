NAME := angular-pubsub
JS_FILES := $(shell find src/ -iname *.js)
CONFIG_FILE := config/build.conf.js
OUTDIR := dist
JS_BUILD := $(OUTDIR)/$(NAME).js
BOWER_COMPONENTS_DIR := bower_components/
CONFIG_FILES := $(shell find config/ -iname '*.js')
LINTEDFILES := $(JS_FILES) $(CONFIG_FILES)

build: $(JS_BUILD)

$(JS_BUILD): $(JS_FILES) $(CONFIG_FILE) bower-install lint
	r.js -o $(CONFIG_FILE)

$(OUTDIR):
	mkdir --parents $(OUTDIR)

clean:
	rm --recursive --force ./$(OUTDIR)/*

bower-install: $(BOWER_COMPONENTS_DIR)

$(BOWER_COMPONENTS_DIR): bower.json
	rm -rf $(BOWER_COMPONENTS_DIR)
	bower install

test: bower-install lint
	env NOWINDOW=1 scripts/unit-tests.sh

lint: $(LINTEDFILES)
	jshint $(LINTEDFILES)
	jscs $(LINTEDFILES)

.PHONY: bower-install build clean lint test
