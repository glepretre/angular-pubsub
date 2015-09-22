NAME := angular-pubsub
JS_FILES := $(shell find src/ -name *.js)
CONFIG_FILE := config/build.conf.js
OUTDIR := dist
JS_BUILD := $(OUTDIR)/$(NAME).js
BOWER_COMPONENTS_DIR := bower_components/

build: $(JS_BUILD)

$(JS_BUILD): $(JS_FILES) $(CONFIG_FILE)
	r.js -o $(CONFIG_FILE)

$(OUTDIR):
	mkdir --parents $(OUTDIR)

clean:
	rm --force --recursive ./$(OUTDIR)/*

bower-install: bower.json
	rm -rf $(BOWER_COMPONENTS_DIR)
	bower install

.PHONY: bower-install build clean
