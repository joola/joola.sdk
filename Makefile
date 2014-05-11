REPORTER=spec

COVERALLS_GIT_COMMIT=HEAD
COVERALLS_REPO_TOKEN=Che5WhsI4mbjDKH9dnrrxoFJ06ivbNzxs

export COVERALLS_GIT_COMMIT
export COVERALLS_REPO_TOKEN

test:
		$(MAKE) lint
		@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER)

authors:
		node build/authors.js

compile:
		@NODE_ENV=test
		echo Current Directory: $(CURDIR)
		./node_modules/.bin/browserify ./lib/3rd/* ./index.js -i ./bin/joola.io.js -o ./bin/joola.io.js
		node ./node_modules/.bin/uglifyjs $(CURDIR)/bin/joola.io.js --source-map $(CURDIR)/bin/joola.io.min.js.map --source-map-url /joola.io.min.js.map -p $$(grep -o "/" <<<"$(CURDIR)/" | wc -l) -c -m > ./bin/joola.io.min.js
    
watch:
		@NODE_ENV=test
		./node_modules/.bin/watchify ./lib/3rd/* ./index.js -i ./bin/joola.io.js -o ./bin/joola.io.js

lint:
		@./node_modules/.bin/jshint ./lib ./test

doc:
		find ./wiki/* ! -iregex '(.git|.npm)' | xargs rm -fr
		node build/docs.js

test-cov:	
		$(MAKE) lint
		$(MAKE) istanbul

istanbul:
		./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- -R spec test

coveralls:
		cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

.PHONY: test

