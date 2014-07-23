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
		grunt
		#echo Current Directory: $(CURDIR)
		#./node_modules/.bin/browserify ./lib/3rd/* ./index.js -i ./bin/joola.js -o ./bin/joola.js
		#node ./node_modules/.bin/uglifyjs $(CURDIR)/bin/joola.js --source-map $(CURDIR)/bin/joola.min.js.map --source-map-url /joola.min.js.map -p $$(grep -o "/" <<<"$(CURDIR)/" | wc -l) -c -m > ./bin/joola.min.js
    
watch:
		@NODE_ENV=test
		./node_modules/.bin/watchify ./lib/3rd/* ./index.js -i ./bin/joola.js -o ./bin/joola.js

lint:
		@./node_modules/.bin/jshint ./src/lib ./test

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

publish:
		npm shrinkwrap
		npm publish
		
.PHONY: test

