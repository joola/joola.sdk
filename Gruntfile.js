module.exports = function (grunt) {
  var browsers = [
    {
      browserName: 'firefox',
      version: '19',
      platform: 'XP'
    },
    {
      browserName: 'googlechrome',
      platform: 'XP'
    },
    {
      browserName: 'googlechrome',
      platform: 'linux'
    },
    {
      browserName: 'internet explorer',
      platform: 'WIN8',
      version: '10'
    },
    {
      browserName: 'internet explorer',
      platform: 'VISTA',
      version: '9'
    }
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      temp: ['build/temp/*.js', 'build/temp/*.css'],
      release: ['build/release/*.js', 'build/release/*.css', 'build/release/*.map']
    },

    browserify: {
      client: {
        src: ['src/lib/index.js'],
        dest: 'build/temp/joola.js',
        options: {
          external: []
        }
      }
    },
    watchify: {
      options: {
        keepalive: true,
        verbose: true,
        debug: true
      },
      all: {
        src: ['./build/temp/vendor.js', './src/lib/index.js'],

        dest: 'build/release/joola.js'
      }
    },

    http: {
      joola_meta: {
        options: {
          url: 'http://localhost:8080/meta',
          headers: {
            'content-type': 'application/json'
          },
          strictSSL: false
        },
        dest: 'build/temp/meta.json'
      }
    },

    jshint: {
      all: ['src/lib/**/*.js']
    },

    csslint: {
      base_theme: {
        src: 'src/css/**/*.css',
        rules: {
          "import": false,
          "overqualified-elements": 2
        }
      }
    },

    concat: {
      'build/temp/vendor.js': ['build/vendor/**/*.js'],
      'build/release/joola.js': ['build/temp/vendor.js', 'build/temp/joola.js'],
      'build/temp/joola.css': ['src/css/**/*.css']
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: true,
        compress: true,
        sourceMap: true,
        sourceMapName: 'build/release/joola.min.js.map'
      },
      build: {
        src: 'build/release/joola.js',
        dest: 'build/release/joola.min.js'
      }
    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        keepSpecialComments: 0
      },
      my_target: {
        options: {
          keepSpecialComments: 1
        },
        src: 'build/temp/joola.css',
        dest: 'build/release/joola.min.css'
      }
    },

    copy: {
      main: {
        src: 'build/temp/joola.css',
        dest: 'build/release/joola.css'
      }
    },

    connect: {
      server: {
        options: {
          protocol: 'http',
          base: '',
          port: 9999,
          debug: false,
          log: false
        }
      }
    },

    mocha: {
      all: {
        options: {
          urls: [
            'http://localhost:9999/test/browser/common.spec.html',
            'http://localhost:9999/test/browser/viz/datepicker.spec.html',
            'http://localhost:9999/test/browser/viz/pie.spec.html'
          ],
          run: false,
          log: false,
          debug: false,
          timeout: 5000,
          reporter: 'mocha-phantom-coverage-reporter'
        }
      }
    },

    'saucelabs-mocha': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:9999/test/browser/common.spec.html',
            'http://localhost:9999/test/browser/viz/datepicker.spec.html',
            'http://localhost:9999/test/browser/viz/pie.spec.html'
          ],
          tunnelTimeout: 5,
          identifier: process.env.TRAVIS_JOB_ID || Math.floor((new Date).getTime() / 1000 - 1230768000).toString(),
          build: process.env.TRAVIS_JOB_ID || Math.floor((new Date).getTime() / 1000 - 1230768000).toString(),
          browsers: browsers,
          'tunnel-identifier': process.env.TRAVIS_JOB_ID || Math.floor((new Date).getTime() / 1000 - 1230768000).toString(),
          testname: process.env.TRAVIS_COMMIT ? 'joola.sdk, commit: ' + process.env.TRAVIS_COMMIT : "joola.sdk tests",
          tags: [process.env.TRAVIS_BRANCH || 'local']
        }
      }
    }
  });

  for (var key in grunt.file.readJSON("package.json").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0)
      grunt.loadNpmTasks(key);
  }

  grunt.registerTask('default', [ 'clean', 'http', 'jshint', 'browserify', 'concat', 'uglify', 'cssmin', 'copy']); //'csslint',
  grunt.registerTask('dev', ['connect', 'watchify']);
  grunt.registerTask('css', ['concat', 'cssmin', 'copy']); //'csslint',
  grunt.registerTask('test', ['default', 'connect', 'mocha']);
  grunt.registerTask('test:bare', ['connect', 'mocha']);
  grunt.registerTask('sauce', ['default', 'connect', 'saucelabs-mocha']);
}
;