NAME := angular-pubsub
JS_FILES := $(shell find src/ -name *.js)
CONFIG_FILE := config/build.conf.js
OUTDIR := dist
JS_BUILD := $(OUTDIR)/$(NAME).js
BOWER_COMPONENTS_DIR := bower_components/

build: $(JS_BUILD)

$(JS_BUILD): $(JS_FILES) $(CONFIG_FILE) bower-install
	r.js -o $(CONFIG_FILE)

$(OUTDIR):
	mkdir --parents $(OUTDIR)

clean:
	rm --recursive --force ./$(OUTDIR)/*

bower-install: $(BOWER_COMPONENTS_DIR)

$(BOWER_COMPONENTS_DIR): bower.json
	rm -rf $(BOWER_COMPONENTS_DIR)
	bower install

test: bower-install
	env NOWINDOW=1 scripts/unit-tests.sh

.PHONY: bower-install build clean test
